import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Badge, IconButton, LinearProgress, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import Meta from 'src/common/Meta';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import ManiaCafe from 'src/d/ManiaCafe';
import FetchMoreButton from 'src/d/FetchMoreButton';
import { FETCH_MANIA_CAFES_KEY } from 'src/utils/queryKeys';
import { D_MANIA_CAFES_PATH } from 'src/utils/routes';
import { useRouter } from 'next/router';
import ManiaCafeDialog from 'src/d/ManiaCafeDialog';

const metaData = {
  title: '카페 추천 - 드링크뎁스',
  description: '커피 매니아들이 꼭 가봐야 한다는 카페 리스트',
  image: '/images/logo_name_og.png',
  canonical: D_MANIA_CAFES_PATH,
};

export type FilterType = {
  sido: string;
  gungu: string;
  subway: string;
  parking: boolean;
  wifi: boolean;
  pet: boolean;
};
const initialFilter = {
  sido: '',
  gungu: '',
  subway: '',
  parking: false,
  wifi: false,
  pet: false,
};

const ManiaCafesPage: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [realFilter, setRealFilter] = React.useState<FilterType>(initialFilter);
  const [fakeFilter, setFakeFilter] = React.useState<FilterType>(realFilter);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [filteredCafes, setFilteredCafes] = React.useState<
    ManiaCafeType[] | undefined
  >();

  // 위치 검색 Dialog 뒤로가기 처리용
  React.useEffect(() => {
    if (router.asPath.includes('?filter=')) {
      // router.beforePopState((state) => {
      //   // console.log('router : ', router);
      //   // console.log('state : ', state);
      //   // 홈 -> 필터 Dialog로 앞으로가기
      //   if (state.url.includes('?filter=')) {
      //     setFilterOpen(true);
      //   }
      //   // 필터 Dialog => 홈으로 뒤로가기
      //   else {
      //     setFilterOpen(false);
      //   }
      //   setFakeFilter(realFilter); // 변경사항 초기화
      //   return true;
      // });
      setFilterOpen(true);
    } else {
      setFilterOpen(false);
    }
    setFakeFilter(realFilter); // 변경사항 초기화
  }, [realFilter, router]);

  const handleOpen = () => {
    router.push(router.pathname + '?filter=', undefined, { shallow: true });
    setFilterOpen(true);
    setFakeFilter(realFilter); // 변경사항 초기화
  };
  const handleClose = () => {
    router.back();
  };
  const handleConfirm = async (newFilter: FilterType) => {
    handleClose();
    setRealFilter(newFilter); // 변경사항 적용

    const allCafes = queryClient.getQueryData<ManiaCafeType[]>(MANIA_CAFES);
    const nextCafes = allCafes
      ?.filter((cafe) =>
        newFilter.sido
          ? cafe.sido === newFilter.sido && cafe.gungu === newFilter.gungu
          : true
      )
      .filter((cafe) =>
        newFilter.subway ? newFilter.subway === cafe.subway : true
      )
      .filter((cafe) => (newFilter.wifi ? !!cafe.wifi : true))
      .filter((cafe) => (newFilter.parking ? !!cafe.parking : true))
      .filter((cafe) => (newFilter.pet ? !!cafe.pet : true));

    setFilteredCafes(nextCafes);
  };

  // const handleRealFilter = (newRealFilter: FilterType) =>
  //   setRealFilter(newRealFilter);
  const handleFakeFilter = (newFakeFilter: FilterType) =>
    setFakeFilter(newFakeFilter);

  const badgeInvisible = Object.keys(realFilter).every(
    (v) => !realFilter[v as keyof typeof realFilter]
  );

  return (
    <>
      <Meta data={metaData} />

      <HeaderD
        centerComponent={
          <div css={{ display: 'flex' }}>
            <Typography fontSize={18} fontWeight={600}>
              추천 카페
            </Typography>
          </div>
        }
        rightIcon={
          <IconButton onClick={handleOpen}>
            <Badge color="secondary" variant="dot" invisible={badgeInvisible}>
              <SearchIcon />
            </Badge>
          </IconButton>
        }
      />

      <Main>
        <ManiaCafesContainer filteredCafes={filteredCafes} />
        <ManiaCafeDialog
          open={filterOpen}
          handleClose={handleClose}
          headerCenterComponent={'필터'}
          realFilter={realFilter}
          handleConfirm={handleConfirm}
          fakeFilter={fakeFilter}
          handleFakeFilter={handleFakeFilter}
        />
      </Main>

      <Navbar />
    </>
  );
};

export default ManiaCafesPage;

const MANIA_CAFES = 'mania_cafes';
const LIMIT_PER_PAGE = 15;
function ManiaCafesContainer({
  filteredCafes,
}: {
  filteredCafes?: ManiaCafeType[];
}) {
  const {
    data: allCafes,
    isLoading: isLoadingAllCafes,
    error,
  } = useQuery<ManiaCafeType[]>(MANIA_CAFES, async () => {
    const result = await import('src/firebase/mania_cafes');
    // let mySet = new Set();
    // result.default.map((cafe) => mySet.add(cafe.subway));
    // console.log(
    //   'mySet : ',
    //   Array.from(mySet)
    //     .sort()
    //     .map((subway) => ({ label: subway }))
    // );
    return result.default;
  });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    FETCH_MANIA_CAFES_KEY,
    ({ pageParam = 1 }) => {
      const startIndex = (pageParam - 1) * LIMIT_PER_PAGE;
      const endIndex = pageParam * LIMIT_PER_PAGE;
      const cafes = filteredCafes ?? allCafes;
      return cafes?.slice(startIndex, endIndex);
      // return fetchMyReviews(db, uid, pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const cafes = filteredCafes ?? allCafes;
        if (allPages && allPages.flat().length < (cafes?.length ?? 0)) {
          return allPages.length + 1;
        }

        return;
      },

      enabled: Boolean(allCafes),
    }
  );

  React.useEffect(() => {
    if (filteredCafes) {
      // console.log('refetch go!');
      refetch();
    }
  }, [filteredCafes, refetch]);

  if (isLoadingAllCafes || isLoading) return <LinearProgress />;
  if (error) return <div>오류가 발생했습니다.</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <>
      <div css={{ textAlign: 'center', margin: '1rem' }}>
        <a
          href="https://pf.kakao.com/_ktxnJb/chat"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: '#000' }}
        >
          드링크뎁스 채팅방 참여하기
        </a>
      </div>

      {data.pages.map((page) =>
        page?.map((cafe) => <ManiaCafe key={cafe.address} cafe={cafe} />)
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
