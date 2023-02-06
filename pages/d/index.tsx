import * as React from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import HeaderD from 'src/d/HeaderD';

// import { Typography } from '@mui/material';
// import { useRouter } from 'next/router';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import ReviewHome from 'src/d/ReviewHome';
import Image from 'next/image';
import Meta from 'src/common/Meta';

import { D_PATH } from 'src/utils/routes';
import { fetchData } from 'src/firebase/api';

const metaData = {
  title: '어떤 카페 - 드링크뎁스',
  description:
    '커피를 위한 전용 템플릿, 기록에 따른 재미있는 보상, 다양한 리뷰들을 담아보세요. 최고의 카페 경험을 공유해 보세요!',
  image: '/images/logo_name_og.png',
  canonical: D_PATH,
};

type Props = {
  data: DReviewType[];
};

const CafeReviewHomePage: NextPage<Props> = ({ data }) => {
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
        <ReviewHome initialReviews={data} />
      </Main>

      <Navbar />
    </>
  );
};

export default CafeReviewHomePage;

// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
export const getServerSideProps: GetServerSideProps<Props> = async ({
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const url = process.env.NEXT_PUBLIC_SERVER_URL + '/reviews' + '/ssr';
  const data = await fetchData<DReviewType[]>(url);
  return { props: { data } };
};
