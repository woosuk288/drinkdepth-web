import { Box, Button, CardMedia, Chip, Typography } from '@mui/material';
import React from 'react';
import { SellerType } from '../../../../pages/o2o/place';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import styled from '@emotion/styled';

type SellerProps = {
  seller: SellerType;
};

function Seller({ seller }: SellerProps) {
  const handleFindPath = () => {};

  return (
    <Box sx={{ my: '2rem' }}>
      <Box display="flex" justifyContent="center">
        <Chip
          label="로스터리"
          color="secondary"
          sx={{ fontWeight: 700, fontSize: 16 }}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt="0.75rem">
        <Typography fontSize={20} fontWeight={600} sx={{ px: '0.5rem' }}>
          {seller.name}
        </Typography>
      </Box>
      <Box
        margin="1.5rem auto 0"
        maxWidth={(theme) => theme.breakpoints.values.sm}
      >
        <Typography mb="1.5rem" whiteSpace="pre-line">
          {seller.introduce}
        </Typography>

        <Box sx={{ display: 'flex', mb: '0.5rem' }}>
          <Typography fontWeight="bold" marginRight={'1rem'} width="48px">
            주소
          </Typography>
          <Typography>{seller.address}</Typography>
        </Box>
        <Button
          onClick={handleFindPath}
          fullWidth
          variant="contained"
          size="small"
          startIcon={<LocationOnIcon />}
        >
          길찾기
        </Button>
      </Box>
      <Box
        margin="1.5rem auto"
        maxWidth={(theme) => theme.breakpoints.values.md}
      >
        <RoasteryImagesWrapper>
          {mfrImages.map((img, key) => (
            <CardMedia image={img} key={key} />
          ))}
        </RoasteryImagesWrapper>
      </Box>
    </Box>
  );
}

export default Seller;

const RoasteryImagesWrapper = styled.div`
  position: relative;
  margin: 48px 0;
  display: grid;
  grid-auto-columns: 200px; /* 반드시! */
  grid-auto-flow: column; /* row 를 가지지않을거라면 반드시! */
  grid-template-rows: 200px;
  grid-gap: 20px;
  justify-content: center;

  .MuiCardMedia-root {
    border-radius: 0.5rem;
  }

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(168px, 300px));
    grid-auto-flow: unset;
    grid-template-rows: repeat(2, minmax(168px, 1fr));
    grid-gap: 8px;
  }
`;
const mfrImages = [
  'https://images.unsplash.com/photo-1585435247026-1d8560423d52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9hc3Rlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1556027654-a05ec60d5a4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvYXN0ZXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://media.istockphoto.com/photos/coffee-beans-in-a-coffee-roastery-at-work-picture-id1371315210?b=1&k=20&m=1371315210&s=170667a&w=0&h=AH9uHU1GSf8Lf8DvRoQUVZJfQ23ASegXEdn76u6mtYA=',
  'https://media.istockphoto.com/photos/man-opening-roasters-hatch-and-coffee-beans-falling-out-of-roastery-picture-id1364184493?b=1&k=20&m=1364184493&s=170667a&w=0&h=1hdjJirxBezoeuHSCqeYUAKxjMT60_qF26Zx3jhMxeM=',
];
