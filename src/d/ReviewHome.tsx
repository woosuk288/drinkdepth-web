import { useInfiniteQuery, useQuery } from 'react-query';
import { FETCH_REVIEWS_KEY, FETCH_REVIEW_COUNT_KEY } from 'src/utils/queryKeys';
import { fetchReviewCount, fetchReviews } from 'src/firebase/services';

import {
  Button,
  Card,
  Fab,
  LinearProgress,
  Slide,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Review from './Review';
import { useFirestore } from 'reactfire';
import FetchMoreButton from './FetchMoreButton';
import { useEffect, useState } from 'react';
import SearchRegionDialog from './SearchRegionDialog';
import { useRouter } from 'next/router';
import { D_MANIA_CAFES_PATH } from 'src/utils/routes';
import Link, { NextLinkComposed } from 'src/common/Link';

function ReviewHome() {
  const [addressOpen, setAddressOpen] = useState(false);
  const [testReview, setTestReview] = useState<any>();

  const router = useRouter();
  const db = useFirestore();

  const trigger = useScrollTrigger({ threshold: 4000 });

  // 위치 검색 Dialog 뒤로가기 처리용
  useEffect(() => {
    if (router.asPath.includes('?q=')) {
      router.beforePopState((state) => {
        // console.log('router : ', router);
        // console.log('state : ', state);
        if (state.url.includes('?q=')) {
          setAddressOpen(true);
        } else {
          setAddressOpen(false);
        }
        return true;
      });
    }
  }, [router]);

  const handleOpen = () => {
    console.log('router: ', router);
    router.push(router.pathname + '?q=', undefined, { shallow: true });
    setAddressOpen(true);
  };
  const handleClose = () => {
    router.back();
    setAddressOpen(false);
  };

  const { data: reviewCount = 0, isLoading: isLoadingCount } = useQuery(
    FETCH_REVIEW_COUNT_KEY,
    () => fetchReviewCount(db)
  );
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      FETCH_REVIEWS_KEY,
      ({ pageParam = new Date().toISOString() }) => {
        return fetchReviews(db, pageParam);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return (
            allPages.flat().length < reviewCount &&
            new Date(lastPage[lastPage.length - 1].createdAt).toISOString()
          );
        },
        enabled: reviewCount > 0,
      }
    );

  if (isLoadingCount || isLoading) return <LinearProgress />;

  // console.log('testReview : ', testReview);

  return (
    <>
      <div
        css={{
          display: 'flex',
          marginTop: '0.5rem',
          '> div': { padding: '1rem', flex: 1, textAlign: 'center' },
        }}
      >
        <Card>
          <Link href={D_MANIA_CAFES_PATH} underline="none" color={'inherit'}>
            <Typography variant="h6">
              커피 매니아 <br /> 추천 카페
            </Typography>
          </Link>
        </Card>
        <Card>
          <Typography variant="h6">
            0월 0주차 <br /> 핫 원두 5+5
          </Typography>
        </Card>
      </div>

      <div>
        <div css={{ marginTop: '1rem', textAlign: 'center' }}>
          {/* <IconButton>
            <SearchIcon />
            <Typography fontWeight={600}>위치</Typography>
          </IconButton> */}

          {/* <Chip label="서울 종로구 인사동" /> */}

          <Button
            color="inherit"
            startIcon={<PlaceIcon style={{ fontSize: '1.5rem' }} />}
            sx={{ fontSize: '1rem', marginRight: '1.5rem' }}
            onClick={handleOpen}
          >
            {/* 전체 */}
            {testReview?.address?.address_name ?? '전체'}
          </Button>
        </div>
        <div css={{ '& > div': { marginBottom: '0.125rem' } }}>
          {/* <div css={{ padding: '1rem' }}>
        필터 영역
        <span> - 카페이름</span>
        <span> - 메뉴이름</span>
      </div> */}

          {data?.pages.map((reviews) =>
            reviews.map((review) => <Review key={review.id} review={review} />)
          )}
        </div>
        <div css={{ margin: '0.5rem 0' }}>
          {hasNextPage && (
            <FetchMoreButton
              isFetchingNextPage={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            />
          )}
        </div>
      </div>

      <Slide in={trigger} direction={'up'}>
        <Fab
          size="small"
          color="secondary"
          aria-label="filter"
          sx={{
            position: 'fixed',
            right: '16px',
            bottom: { xs: '64px', md: '32px' },
            width: { md: '56px' },
            height: { md: '56px' },
          }}
          onClick={() => {
            // console.log(' window.pageYOffset : ', window.pageYOffset);

            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Slide>
      {/* {typeof window !== undefined && window.pageYOffset > 4000 && ( */}
      {/* )} */}
      {addressOpen && (
        <SearchRegionDialog
          open={addressOpen}
          handleClose={handleClose}
          setter={setTestReview}
          hasHeader={true}
          headerCenterComponent="관심지역을 설정해 주세요"
        />
      )}
      {/* 카페 이름... 도시군구동면 까지는 가능(도로명). 모각코 등 */}
      {/* 지하철역정보, 와이파이, 주차 등은 따로 저장된 카페 정보이므로 리뷰 작성시 카카오 조회로 불러올수없으므로 연계불가 */}
    </>
  );
}
export default ReviewHome;
