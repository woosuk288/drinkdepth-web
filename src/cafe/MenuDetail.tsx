import { Box, Button, Typography } from '@mui/material';
import { MenuDetailProps } from '../util/types';

function MenuDetail({ item }: MenuDetailProps) {
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            paddingBottom: '75%',
          },
          ' .img': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
      >
        <img className="img" src={item.imageURL} alt={item.description} />
      </Box>

      <Box sx={{ padding: '2rem' }}>
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
          variant="subtitle2"
          gutterBottom
        >
          {item.description}
        </Typography>

        <Typography
          sx={{ display: 'block' }}
          component="span"
          variant="body2"
          // color="text.primary"
          color={'primary'}
          fontWeight="bold"
          gutterBottom
        >
          {item.labels.map((label) => label + ' ')}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: 'red' }}>
          {item.price.toLocaleString()}
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          sx={{
            width: '50%',
            height: 64,
            margin: '1rem',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 16,
          }}
          onClick={() => {}}
        >
          쿠폰 발행
        </Button>
      </Box>
    </div>
  );
}
export default MenuDetail;
