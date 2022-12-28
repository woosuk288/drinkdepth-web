import { Button, Container, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import RedirectPage from 'src/common/RedirectPage';
import {
  // batchUpdate,
  createMenu,
  getImageURLs,
  updateImages,
} from 'src/firebase/services';
import { NOT_FOUND_PATH } from 'src/utils/routes';

import CafeHeader from '../../../src/cafe/B2BHeader';
import { useFirestore, useSigninCheck, useStorage, useUser } from 'reactfire';
import { User } from 'firebase/auth';

function ManagePage() {
  const { status, data: signInCheckResult } = useSigninCheck({
    requiredClaims: { admin: true },
  });

  if (status === 'loading') return <LinearProgress />;

  if (!signInCheckResult.signedIn)
    return <RedirectPage path={NOT_FOUND_PATH} />;

  return (
    <Container maxWidth="sm" disableGutters>
      <CafeHeader title="관리" />

      <Manage user={signInCheckResult.user} />
    </Container>
  );
}
export default ManagePage;

/**
 *
 */
type Props = {
  user: User;
};
function Manage({ user }: Props) {
  const db = useFirestore();
  const storage = useStorage();

  const handleMenuCreate = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const token = await user?.getIdTokenResult();
    if (token?.claims.admin !== true) return;

    const images = await getImageURLs(storage, prefix, filename, suffix);

    const result = await createMenu(db, data, images);
    console.log('data : ', { ...data, images });
    alert(result);
  };

  const handleUdpateMenuImages = () => {
    // const path = `cafes/${data.cafeId}/menus/${data.id}`;
    // const prefix = 'images/menus/babacarmel/';
    // const filename = '';
    // const suffix = '.jpg';
    updateImages(db, storage, path, prefix, filename, suffix);
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
      <Button onClick={() => batchUpdate(db, batchdata)}>일괄 수정</Button> */}
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
  createdAt: new Date().toISOString(),
};

const path = `cafes/${cafeId}/menus/${menuId}`;
const prefix = `images/menus/${data.cafeId}/`;
const filename = '디저트 - 바바 크로플 흑임자';
const suffix = '.jpg';
