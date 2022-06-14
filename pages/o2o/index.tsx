import { Box, Container, Typography } from '@mui/material';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const O2OPage: NextPage = () => {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ overflow: 'hidden' }}>
      {/* <Typography variant="h3" gutterBottom align="center">
        제목~?
      </Typography> */}
      <Box
        onClick={() => router.push('/o2o/place')}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
          transform: 'scale(1.5)',
        }}
      >
        <Image
          src="/images/o2o/O2O PMF 메인.gif"
          alt="main image"
          width={960}
          height={1300}
        />
      </Box>
    </Container>
  );
};

export default O2OPage;
