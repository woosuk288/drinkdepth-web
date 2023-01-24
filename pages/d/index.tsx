import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

// import { Typography } from '@mui/material';
// import { useRouter } from 'next/router';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import ReviewHome from 'src/d/ReviewHome';
import Image from 'next/image';
import Meta from 'src/common/Meta';

import { D_PATH } from 'src/utils/routes';

const metaData = {
  title: '어떤 카페 - 드링크뎁스',
  description:
    '커피를 위한 전용 템플릿, 기록에 따른 재미있는 보상, 다양한 리뷰들을 담아보세요. 최고의 카페 경험을 공유해 보세요!',
  image: '/images/logo_name_og.png',
  canonical: D_PATH,
};

const MainPage: NextPage = () => {
  return (
    <>
      <Meta data={metaData} />
      <HeaderD
        centerComponent={
          <div css={{ display: 'flex' }}>
            {/* <Typography fontSize={18} fontWeight={600}>
              전체
            </Typography> */}
            <Image
              src="/images/logo_name.png"
              alt="drinkdepth-logo"
              width={160}
              height={34}
              // width={200}
              // height={43}
            />
          </div>
        }
      />

      <Main>
        <ReviewHome />
      </Main>

      <Navbar />
    </>
  );
};

export default MainPage;
