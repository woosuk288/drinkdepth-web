import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import RedirectPage from 'src/common/RedirectPage';
import { AuthUserProvider, useAuth } from 'src/context/AuthUserContext';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import {
  // batchUpdate,
  createMenu,
  getImageURLs,
  updateImages,
} from 'src/firebase/services';
import { NOT_FOUND_PATH } from 'src/utils/routes';

import CafeHeader from '../../../src/cafe/B2BHeader';

function ManagePage() {
  const { user, loading } = useFirebaseAuth();
  const [isChecking, setIsChecking] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsChecking(true);
      user
        .getIdTokenResult()
        .then((token) => {
          setAdmin(token.claims.admin);
        })
        .finally(() => {
          setIsChecking(false);
        });
    }
  }, [user]);

  if (loading) return null;

  if (!user) return <RedirectPage path={NOT_FOUND_PATH} />;

  if (isChecking) return null;

  if (!admin) return <RedirectPage path={NOT_FOUND_PATH} />;

  return (
    <Container maxWidth="sm" disableGutters>
      <AuthUserProvider>
        <CafeHeader title="관리" />

        <Manage />
      </AuthUserProvider>
    </Container>
  );
}
export default ManagePage;

/**
 *
 */
function Manage() {
  const { user } = useAuth();

  const handleMenuCreate = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const token = await user?.getIdTokenResult();
    if (token?.claims.admin !== true) return;

    const images = await getImageURLs(prefix, filename, suffix);

    const result = await createMenu(data, images);
    console.log('data : ', { ...data, images });
    alert(result);
  };

  const handleUdpateMenuImages = () => {
    // const path = `cafes/${data.cafeId}/menus/${data.id}`;
    // const prefix = 'images/menus/babacarmel/';
    // const filename = '';
    // const suffix = '.jpg';
    updateImages(path, prefix, filename, suffix);
  };

  return (
    <>
      {/* <div style={{ whiteSpace: 'pre' }}>{JSON.stringify(data, null, 4)}</div>
      <Button variant="contained" onClick={handleMenuCreate}>
        메뉴 추가
      </Button> */}

      <div>
        docPath: {path} <br />
        {prefix}
        {filename}
        {suffix}
      </div>
      <Button variant="contained" onClick={handleUdpateMenuImages}>
        사진 업데이트
      </Button>

      {/* <div style={{ whiteSpace: 'pre' }}>
        {JSON.stringify(batchdata, null, 4)}
      </div>
      <Button onClick={() => batchUpdate(batchdata)}>일괄 수정</Button> */}
    </>
  );
}

const cafeId = 'babacarmel';
const menuId = 'babacarmel-4630';

const data = {
  id: menuId,
  cafeId,
  name: '에스프레소 콘빠냐',
  description: '',
  labels: [],
  images: {} as ImagesType,
  price: 4800,
  categorySeqs: [],
  categories: [],
  reviewCount: 0,
  createdAt: new Date(),
};

const path = `cafes/${cafeId}/menus/${menuId}`;
const prefix = `images/menus/${data.cafeId}/`;
const filename = '디저트 - 바바 크로플 흑임자';
const suffix = '.jpg';
