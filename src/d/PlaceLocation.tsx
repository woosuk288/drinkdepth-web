import * as React from 'react';

import { IconButton, Typography } from '@mui/material';

import { Map, MapMarker, useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import {
  createAnchorAndClick,
  makeGoogleMapURL,
  makeNaverMapURL,
} from 'src/utils/etc';

type Props = {
  place: PlacesSearchResultItem;
};

/**
 * 위치에서 내 위치 눌렀을 때, 목적지와 내 위치의 중간 지점 zoom, 차, 대중교통, 걸어서의 거리를 보여주면 좋을듯
 */

function PlaceLocation({ place }: Props) {
  const { loading, error } = useInjectKakaoMapApi({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!, // 발급 받은 APPKEY
    libraries: ['services', 'clusterer'],
  });

  const x = parseFloat(place.x);
  const y = parseFloat(place.y);

  const handleNaverMap = () => {
    const url = makeNaverMapURL(place.place_name, place.x, place.y);

    createAnchorAndClick(url);
  };

  const handleKakaoMap = () => {
    createAnchorAndClick(place.place_url);
  };

  const handleGoogleMap = () => {
    // 범주형 검색 (이름+주소)
    const parameter = encodeURI(
      place.place_name + '+' + place.road_address_name
    );
    const url = makeGoogleMapURL(parameter);

    createAnchorAndClick(url);
  };

  if (loading) return null;

  return (
    <>
      <Map
        id="map-cafe-location"
        center={{ lat: y, lng: x }}
        style={{ aspectRatio: '1 / 1' }}
      >
        <MapMarker position={{ lat: y, lng: x }}>
          <div
            style={{
              width: '150px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            // onClick={handleOpenNaverMap}
            // className="gtm-navigation-text"
          >
            {place.place_name}
          </div>
        </MapMarker>
      </Map>

      <div css={{ padding: '1rem', marginTop: '1rem' }}>
        <Typography fontSize={18} align="center">
          {place.road_address_name}
        </Typography>
      </div>

      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          '> button + button': { marginLeft: '0.5rem' },
        }}
      >
        <IconButton onClick={handleNaverMap}>
          <img src="/images/naver_map.png" alt="카카오맵" width={64} />
        </IconButton>
        <IconButton onClick={handleKakaoMap}>
          <img src="/images/kakao_map.png" alt="카카오맵" width={64} />
        </IconButton>
        <IconButton onClick={handleGoogleMap}>
          <img src="/images/google_map.png" alt="카카오맵" width={64} />
        </IconButton>
        {/* TODO: T map - https://sir.kr/g5_tip/13235 */}
      </div>
    </>
  );
}
export default PlaceLocation;
