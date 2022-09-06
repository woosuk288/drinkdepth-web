import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import { BranchType, SellerType } from '../../../../pages/o2o/place';

import styled from '@emotion/styled';
import proj4 from 'proj4';
import { makeNaverMapURL } from '.';
import LazyImage from '../../../common/LazyImage';
import { gaClickNaverMap } from '../../../utils/firebase/analytics';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type SellerAndBranchProps = {
  coffeeName: string;
  seller: SellerType;
  branch: BranchType;
  handleOpenNaverMap: () => void;
};

function SellerAndBranch({
  coffeeName,
  seller,
  branch,
  handleOpenNaverMap,
}: SellerAndBranchProps) {
  const lat = parseFloat(branch.addressY);
  const lng = parseFloat(branch.addressX);

  const ClickMapMarker = () => {
    handleOpenNaverMap();
    gaClickNaverMap('click_text_navermap', coffeeName, branch.name);
  };

  return (
    <Box sx={{ my: '2rem' }}>
      <Box display="flex" justifyContent="center">
        <Chip
          // label="로스터리"
          label="카페"
          color="secondary"
          sx={{ fontWeight: 700, fontSize: 16 }}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt="0.75rem">
        <Typography fontSize={20} fontWeight={600} sx={{ px: '0.5rem' }}>
          {branch.name}
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
          <Typography>{branch.address}</Typography>
        </Box>
        {/* <Button
          onClick={handleOpenNaverMap}
          fullWidth
          variant="contained"
          size="small"
          startIcon={<LocationOnIcon />}
        >
          길찾기
        </Button> */}

        <Map
          id="map-cafe"
          center={{ lat, lng }}
          style={{ aspectRatio: '1 / 1' }}
        >
          <MapMarker position={{ lat, lng }} onClick={ClickMapMarker}>
            <div
              style={{ width: '150px', textAlign: 'center', cursor: 'pointer' }}
              onClick={ClickMapMarker}
            >
              길찾기
            </div>
          </MapMarker>
        </Map>
      </Box>

      <Box
        margin="1.5rem auto"
        maxWidth={(theme) => theme.breakpoints.values.md}
      >
        <RoasteryImagesWrapper>
          {branch.images.map((img, key) => (
            <LazyImage src={img} key={key} />
          ))}
        </RoasteryImagesWrapper>
      </Box>
    </Box>
  );
}

export default SellerAndBranch;

const RoasteryImagesWrapper = styled.div`
  position: relative;
  margin: 48px 0;
  display: grid;
  grid-auto-columns: 200px; /* 반드시! */
  grid-auto-flow: column; /* row 를 가지지않을거라면 반드시! */
  grid-template-rows: 200px;
  grid-gap: 20px;
  justify-content: center;

  & > img {
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
