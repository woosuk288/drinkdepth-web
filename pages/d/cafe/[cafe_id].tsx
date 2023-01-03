import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import PlaceLocation from 'src/d/PlaceLocation';

/**
 * TODO: 일단 파라미터 받아와서만 보이도록 처리
 * 추후 우리들의 카페별 id 및 데이터들 생성시 다시 처리
 */

const CafePage: NextPage = () => {
  const router = useRouter();
  const place: PlacesSearchResultItem = router.query.place
    ? JSON.parse(router.query.place as string)
    : null;

  if (!place) return <NextSeo title="DrinkDepth | 카페 위치" />;

  return (
    <>
      <NextSeo title="DrinkDepth | 카페 위치" />
      {/* <AuthContainer> */}
      <HeaderD
        centerComponent={
          <div css={{ display: 'flex' }}>
            <Typography fontSize={18} fontWeight={600}>
              위치
            </Typography>
          </div>
        }
      />

      <Main>
        <PlaceLocation place={place} />
      </Main>

      <Navbar />
      {/* </AuthContainer> */}
    </>
  );
};

export default CafePage;
