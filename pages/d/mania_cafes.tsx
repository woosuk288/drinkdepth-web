import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { LinearProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import Meta from 'src/common/Meta';
import { useInfiniteQuery, useQuery } from 'react-query';
import ManiaCafe from 'src/d/ManiaCafe';
import FetchMoreButton from 'src/d/FetchMoreButton';
import { FETCH_MANIA_CAFES_KEY } from 'src/utils/queryKeys';

const metaData = {
  title: '카페 추천 - 드링크뎁스',
  description: '커피 매니아들이 꼭 가봐야 한다는 카페 리스트',
  image: '/images/logo_name_og.png',
  canonical: '/d/mania_cafes',
};

const ManiaCafesPage: NextPage = () => {
  return (
    <>
      <Meta data={metaData} />
      {/* <AuthContainer> */}
      <HeaderD
        centerComponent={
          <div css={{ display: 'flex' }}>
            <Typography fontSize={18} fontWeight={600}>
              추천 카페
            </Typography>
          </div>
        }
      />

      <Main>
        <ManiaCafesContainer />
      </Main>

      <Navbar />
      {/* </AuthContainer> */}
    </>
  );
};

export default ManiaCafesPage;

const MANIA_CAFES = 'mania_cafes';
const LIMIT_PER_PAGE = 15;
function ManiaCafesContainer() {
  const [pageCount, setPageCount] = React.useState(1);

  const {
    data: allCafes,
    isLoading: isLoadingAllCafes,
    error,
  } = useQuery<ManiaCafeType[]>(MANIA_CAFES, async () => {
    const result = await import('src/firebase/mania_cafes.json');
    return result.default;
  });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      FETCH_MANIA_CAFES_KEY,
      ({ pageParam = 1 }) => {
        const startIndex = (pageParam - 1) * LIMIT_PER_PAGE;
        const endIndex = pageParam * LIMIT_PER_PAGE;
        return allCafes!.slice(startIndex, endIndex);
        // return fetchMyReviews(db, uid, pageParam);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (allPages.flat().length < allCafes!.length) {
            return allPages.length + 1;
          }

          return;
        },

        enabled: Boolean(allCafes),
      }
    );

  if (isLoadingAllCafes || isLoading) return <LinearProgress />;
  if (error) return <div>오류가 발생했습니다.</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <>
      {data.pages.map((page) =>
        page.map((cafe) => <ManiaCafe key={cafe.address} cafe={cafe} />)
      )}
      {/* {data.map()} */}

      {/* 더 보기 */}
      <div css={{ margin: '0.5rem 0' }}>
        {hasNextPage && (
          <FetchMoreButton
            // isFetchingNextPage={isFetchingNextPage}
            isFetchingNextPage={isFetchingNextPage}
            // onClick={() => fetchNextPage()}
            onClick={() => fetchNextPage()}
          />
        )}
      </div>
    </>
  );
}
