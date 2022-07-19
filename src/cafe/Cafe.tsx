import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { CafeProps } from '../utils/types';

function Cafe({ cafe }: CafeProps) {
  const router = useRouter();

  const handleClick = () => {
    console.log('router.pathname : ', router.pathname);
    router.push(`${router.pathname}/${cafe.id}`);
  };

  return (
    <Box sx={{ padding: '1rem', cursor: 'pointer' }} onClick={handleClick}>
      <Typography variant="h6" color="HighlightText">
        {cafe.name}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {cafe.address}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          '> img': { width: '33%' },
        }}
      >
        <img
          src="https://source.unsplash.com/random/300x300/?cafe"
          alt="cafe_image"
          // width={'100%'}
        />
        <img
          src="https://source.unsplash.com/random/300x300/?coffee"
          alt="cafe_image"
          // width={'100%'}
        />
        <img
          src="https://source.unsplash.com/random/300x300/?cake"
          alt="cafe_image"
          // width={'100%'}
        />
      </Box>
    </Box>
  );
}
export default Cafe;
