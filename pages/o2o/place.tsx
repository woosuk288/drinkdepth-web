import { Box, Container, SelectChangeEvent, Typography } from '@mui/material';
import { readFileSync } from 'fs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import KaKaoMap from '../../src/o2o/KakaoMap';
import PlaceList from '../../src/o2o/place/PlaceList';
import Selectors from '../../src/o2o/place/Selectors';

import coffees from '../../firebase/productsDetailsWithXY.json';
import { getAddressXY } from '../../src/util/kakaoAPI';

export type CoordiType = {
  y: string;
  x: string;
};
export type ChoiceType = {
  hasCaffein: string;
  roasting: string;
  acidity: string;
};

const O2OPage: NextPage = () => {
  const router = useRouter();

  // 서울 중심
  const [coordi, setCoordi] = useState<CoordiType>({
    y: '37.566826004661',
    x: '126.978652258309',
  });
  const [choice, setChoice] = useState<ChoiceType>({
    hasCaffein: '',
    roasting: '',
    acidity: '',
  });

  const handleChange = async (event: SelectChangeEvent) => {
    console.log(event.target.name);
    console.log(event.target.value);

    const newChoice = {
      ...choice,
      [event.target.name]: event.target.value,
    };

    console.log('newChoice : ', newChoice);

    var map = new window.kakao.maps.Map(document.getElementById('map'), {
      // 지도를 표시할 div
      center: new window.kakao.maps.LatLng(coordi.y, coordi.x), // 지도의 중심좌표
      level: 11, // 지도의 확대 레벨
    });

    // 마커 클러스터러를 생성합니다
    var clusterer = new window.kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 8, // 클러스터 할 최소 지도 레벨
    });

    // const capitalCoffees = coffees.filter(
    //   (coffee) =>
    //     (coffee.seller.address.startsWith('경기') ||
    //       coffee.seller.address.startsWith('서울')) &&
    //     // 카페인여부
    //     (newChoice.hasCaffein === '디카페인'
    //       ? coffee.tags[1] === '디카페인'
    //       : newChoice.hasCaffein === '카페인'
    //       ? coffee.tags[1] !== '디카페인'
    //       : true) &&
    //     // 로스팅정도
    //     (newChoice.roasting === ''
    //       ? true
    //       : coffee.tags[0] === newChoice.roasting)
    // );

    const capitalCoffees = coffees.filter((coffee) => {
      const isCapital =
        coffee.seller.address.startsWith('경기') ||
        coffee.seller.address.startsWith('서울');

      const isCaffein =
        newChoice.hasCaffein === '디카페인'
          ? coffee.tags[1] === '디카페인'
          : newChoice.hasCaffein === '카페인'
          ? coffee.tags[1] !== '디카페인'
          : true;

      const isRoasting =
        newChoice.roasting === ''
          ? true
          : coffee.tags[0] === newChoice.roasting;

      const isAcidity =
        newChoice.acidity === ''
          ? true
          : coffee.coffeeDesc.acidity?.toString() === newChoice.acidity;

      return isCapital && isCaffein && isRoasting && isAcidity;
    });

    console.log('capitalCoffees : ', capitalCoffees);

    var markers = capitalCoffees.map((gCoffee) => {
      return new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          gCoffee.seller.address_y,
          gCoffee.seller.address_x
        ),
      });
    });

    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);

    // const info = await getAddressXY('서울특별시');
    // console.log('info : ', info);

    setChoice(newChoice);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Box>
        <KaKaoMap latitude={coordi.y} longitude={coordi.x} />
      </Box>

      <Selectors choice={choice} handleChange={handleChange} />

      {/* <Typography
        variant="subtitle2"
        sx={{
          display: 'flex',
          marginLeft: '1.25rem',
          '& > *': { marginRight: '1rem' },
        }}
      >
        <div>장소 2개</div>

      </Typography> */}

      <PlaceList />
    </Container>
  );
};

export default O2OPage;
