import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import CafeMenu from './Menu';

function Cafe() {
  const router = useRouter();

  console.log('router.pathname : ', router.asPath);

  return (
    <>
      <Box>
        {/* <Typography variant="h6">성동구 핫한 카페</Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          슬로우디
        </Typography>
        <Typography variant="h6">여름맞이 메뉴</Typography> */}
      </Box>

      <Box
        sx={{
          width: '100%',
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            paddingBottom: '100%',
          },
          ' .img': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
      >
        <img
          className="img"
          src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="cafe_name"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <Typography>
          2002년 서울에서 시작한 나무사이로는 한 잔의 커피로 우리의 일상이
          풍요로워지기를 바랍니다. 지속적으로 산지를 방문하여 농부•생산업자와
          소통하며 좋은 재료와 논리적인 로스팅, 철저한 품질관리를 기반으로
          커피가 가진 다양한 매력을 소개합니다.
        </Typography>
      </Box>
      {/*
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',

          '.square': {
            width: '33%',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              paddingBottom: '100%',
            },
          },
          ' .img': {
            position: 'absolute',
            width: '100%',
            height: '100%',
          },
        }}
      >
        {cafeImages.map((cafeImage) => (
          <div key={cafeImage.id} className="square">
            <img
              className="img"
              src={cafeImage.imageURL}
              alt={cafeImage.caption}
            />
          </div>
        ))}
      </Box> */}

      <Box sx={{ textAlign: 'center' }}>
        {/* <Button
          variant="contained"
          size="large"
          sx={{ width: '50%', margin: '1rem', fontWeight: 'bold' }}
          onClick={() => router.push(`${router.asPath}/menu`)}
        >
          메뉴판 보기
        </Button> */}

        <Typography variant="h6" fontWeight="bold" sx={{ marginTop: '1rem' }}>
          메뉴
        </Typography>
        <CafeMenu />
      </Box>
    </>
  );
}
export default Cafe;

const cafeImages = [
  {
    id: 'a',
    caption: 'cafe_image_2',
    imageURL:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'b',
    caption: 'cafe_image_3',
    imageURL:
      'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhZmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'c',
    caption: 'cafe_image_4',
    imageURL:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
];
