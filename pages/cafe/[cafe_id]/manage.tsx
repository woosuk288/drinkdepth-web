import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import RedirectPage from 'src/common/RedirectPage';
import { AuthUserProvider, useAuth } from 'src/context/AuthUserContext';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import {
  createMenu,
  getImageURLs,
  updateImages,
} from 'src/utils/firebase/services';
import { NOT_FOUND_PATH } from 'src/utils/routes';

import CafeHeader from '../../../src/cafe/Header';

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
      <div style={{ whiteSpace: 'pre' }}>{JSON.stringify(data, null, 4)}</div>
      <Button variant="contained" onClick={handleMenuCreate}>
        메뉴 추가
      </Button>

      {/* <div>
        docPath: {path} <br />
        {prefix}
        {filename}
        {suffix}
      </div> */}
      {/* <Button variant="contained" onClick={handleUdpateMenuImages}>사진 업데이트</Button> */}
    </>
  );
}

const cafeId = 'babacarmel';
const menuId = 'babacarmel-416';

const data = {
  id: menuId,
  cafeId,
  name: '악마의 로투스 르뱅 쿠키',
  description: '',
  labels: [],
  imageURL: '/images/logo_icon.png',
  images: {} as ImagesType,
  price: 3800,
  category: '디저트',
  reviewCount: 0,
  createdAt: new Date(),
};

const path = `cafes/${cafeId}/menus/${menuId}`;
const prefix = `images/menus/${data.cafeId}/`;
const filename = '디저트 - 악마의 로투스 르뱅쿠키';
const suffix = '.jpg';

// const data = {
//   id: 'babacarmel-209',
//   cafeId: 'babacarmel',
//   name: '흑임자 라떼',
//   description: '',
//   labels: [],
//   imageURL: '/images/logo_icon.png',
//   images: {} as ImagesType,
//   price: 5500,
//   category: '음료',
//   reviewCount: 0,
//   createdAt: new Date(),
// };

// const filename = '음료 - 흑임자 라떼';
