import { Box, Container, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const O2OPage: NextPage = () => {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom align="center">
        제목~?
      </Typography>
      <Box onClick={() => router.push('/o2o/choice')}>
        <img
          src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="unsplash_map"
          width={'100%'}
          // srcSet=""
        />
      </Box>
    </Container>
  );
};

export default O2OPage;
