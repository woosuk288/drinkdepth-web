import {
  Box,
  Button,
  Container,
  IconButton,
  LinearProgress,
  SelectChangeEvent,
} from '@mui/material';

import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import CoffeeResultList from '../../src/o2o/place/CoffeeResultList';
import Selectors from '../../src/o2o/place/Selectors';

import AlertDialogSlide from '../../src/o2o/place/coffeeDetailDialog';
import ImagesDialog from '../../src/o2o/place/ImagesDialog';
import { labelFromOneToFive } from '../../src/utils/combos';
import { getAddressXY } from '../../src/utils/kakaoAPI';
import {
  Map,
  MapMarker,
  useInjectKakaoMapApi,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import Meta from '../../src/common/Meta';
import KakaoChat from '../../src/common/KakaoChat';
import TagManager from 'react-gtm-module';
// import ReviewFilters from 'src/d/ReviewFilters';

export type ChoiceType = {
  caffein: string[];
  roasting: string[];
  acidity: string[];
};

export type CoffeeType = {
  id: string;
  name: string;
  note: string;
  tags: string[];
  branches: BranchType[];
  seller: any;
  coffeeDesc: CoffeeDesc;
  beans: BeanType[];
};

export type CoordiType = {
  y: number;
  x: number;
};

export type SellerType = {
  name: string;
  introduce: string;
  address: string;
  logoURLs: {
    origin: string;
    '100x100': string;
  };
};

export type CoffeeDesc = {
  acidity: number;
  characters: string[];
  flavors: string[];
};

export type BeanType = {
  name: string | null;
  variety: string | null;
  country: string | null;
  region: string | null;
  subregion: string | null;
  farm: string | null;
  grade: string | null;
  elevations: string[] | null;
  process: string | null;
  processLabel: string | null;
  processDetail: string | null;
};

export type BranchType = {
  coffeeId?: string;
  name: string;
  address: string;
  addressY: string;
  addressX: string;
  images: string[];
};

export type CoffeeResultType = {
  id: string;
  name: string;
  note: string;
  tags: string[];
  acidity: number;
  characters: string[];
  flavors: string[];

  seller: SellerType;
  beans: BeanType[];
  branch: BranchType;
};

const metaData = {
  title: '깊이를 마시다 | 스페셜티 커피 지도',
  description: '유명 국내 로스터리 카페들의 커피 데이터를 분석했습니다.',
  image: '/images/o2o/o2o_coffee_map.png',
  canonical: '/o2o/place',
};

const PlacePage: NextPage = () => {
  const router = useRouter();
  const mapRef = useRef<kakao.maps.Map>(null);
  const clustererRef = useRef<kakao.maps.MarkerClusterer>(null);

  // const mapLoadedStatus = useScript(
  //   `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services,clusterer`
  // );

  const { loading, error } = useInjectKakaoMapApi({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!, // 발급 받은 APPKEY
    libraries: ['services', 'clusterer'],
  });

  const [coffees, setSetCoffees] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingGPS, setLoadingGPS] = useState(false);

  // 서울 중심
  const [coordi, setCoordi] = useState<CoordiType>({
    y: 37.566826004661,
    x: 126.978652258309,
  });
  const [myCoordi, setMyCoordi] = useState<CoordiType>();
  const [choice, setChoice] = useState<ChoiceType>({
    acidity: [],
    caffein: [],
    roasting: [],
  });

  const [filteredCoffees, setFilteredCoffees] = useState<CoffeeResultType[]>(
    []
  );

  const [coffeeDetail, setCoffeeDetail] = useState<CoffeeResultType>();
  const [openDetail, setOpenDetail] = useState(false);
  const [openImages, setOpenImages] = useState(false);

  useEffect(() => {
    import('../../src/firebase/productsDetailsWithCafes.json').then((data) => {
      setSetCoffees(data.default);
      setLoadingData(false);
    });
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    // const info = await getAddressXY('서울특별시');
    // console.log('info : ', info);

    clustererRef.current?.clear();

    const newChoice = {
      ...choice,
      [event.target.name]: typeof value === 'string' ? value.split(',') : value,
    };

    setChoice(newChoice);

    const newCoffees = getCoffees(newChoice, coffees);
    setFilteredCoffees(newCoffees);

    displayMarkerClusterer(newCoffees);
  };

  /**
   * 클러스터 마커들을 표시한다
   */
  const displayMarkerClusterer = (newCoffees: CoffeeResultType[]) => {
    const markers = newCoffees.map((coffee) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          parseFloat(coffee.branch.addressY),
          parseFloat(coffee.branch.addressX)
        ),
      });

      // 마커에 클릭이벤트를 등록합
      window.kakao.maps.event.addListener(marker, 'click', function () {
        setCoffeeDetail(coffee);
        setOpenDetail(true);

        TagManager.dataLayer({
          dataLayer: {
            event: 'mapMarkerClick',
            cafeName: coffee.branch.name,
            drinkName: coffee.name,
            addressCity: coffee.branch.address.split(' ', 2).join(' '),
          },
        });
      });
      return marker;
    });

    // 클러스터러에 마커들을 추가합니다
    clustererRef.current?.addMarkers(markers);

    // clustererRef.current.
  };

  const handleCloseDetail = () => {
    setCoffeeDetail(undefined);
    setOpenDetail(false);
  };

  const handleCloseImages = () => {
    setCoffeeDetail(undefined);
    setOpenImages(false);
  };

  const handleImageClick = (coffeeResult: CoffeeResultType) => {
    // open Dialog? image slide
    setCoffeeDetail(coffeeResult);
    setOpenImages(true);
  };

  const handleTextClick = (coffeeResult: CoffeeResultType) => {
    // const info = await getAddressXY(
    //   // 한글 주소
    //   '서울 강남구 테헤란로 142 아크플레이스 1층'
    // );
    // console.log(info.address_name);
    // console.log(`     "addressY" : "${info.y}", "addressX" : "${info.x}",`);
    setCoffeeDetail(coffeeResult);
    setOpenDetail(true);
  };

  const handleGPSClick = () => {
    // 이미 위치 정보 받아왔으면
    if (myCoordi) {
      mapRef.current?.setCenter(new kakao.maps.LatLng(myCoordi.y, myCoordi.x));
      return;
    }

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      setLoadingGPS(true);

      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude, // 위도
            lng = position.coords.longitude; // 경도

          setMyCoordi({ y: lat, x: lng });
          setLoadingGPS(false);
          mapRef.current?.setCenter(new kakao.maps.LatLng(lat, lng));
        },
        (error) => {
          console.log('error.message : ', error.message);
          setLoadingGPS(false);
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      displayErrorMarker(mapRef.current!, coordi);
    }
  };

  if (loading)
    return (
      <Container maxWidth="sm" disableGutters>
        <Meta data={metaData} />
        Loading...
      </Container>
    );

  return (
    <Container maxWidth="sm" disableGutters>
      {/* <Button onClick={jsonFileTest}>jsontest</Button> */}

      <Box className="map-area" sx={{ position: 'relative' }}>
        <Map
          ref={mapRef}
          key={'d'}
          center={{ lat: coordi.y, lng: coordi.x }}
          style={{ aspectRatio: '1 / 1' }}
          level={12}
        >
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            ref={clustererRef}
          >
            {/* 대량의 마커 표시 및 삭제 마다 렉이 크게 발생하여 함수에서 따로 처리 */}
          </MarkerClusterer>

          {/* 내 위치 표시 */}
          {myCoordi && (
            <MapMarker // 마커를 생성합니다
              position={{ lat: myCoordi.y, lng: myCoordi.x }}
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
                size: {
                  width: 48,
                  height: 51.75,
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 27,
                    y: 69,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }}
            />
          )}
        </Map>

        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            left: 12,
            bottom: 32,
            zIndex: 100,
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: 2,
          }}
          onClick={handleGPSClick}
        >
          <GpsFixedIcon />
        </IconButton>
      </Box>
      {loadingGPS && <LinearProgress />}

      <Selectors
        choice={choice}
        handleChange={handleChange}
        disabled={loadingData}
      />
      {/* <ReviewFilters /> */}

      {filteredCoffees.length > 0 && (
        <CoffeeResultList
          coffeeResults={filteredCoffees}
          handleImageClick={handleImageClick}
          handleTextClick={handleTextClick}
        />
      )}

      {openDetail && coffeeDetail && (
        <AlertDialogSlide
          open={openDetail}
          handleClose={handleCloseDetail}
          coffeeDetail={coffeeDetail}
        />
      )}

      {openImages && coffeeDetail && (
        <ImagesDialog
          open={openImages}
          handleClose={handleCloseImages}
          branch={coffeeDetail.branch}
          sellerLogo={coffeeDetail.seller.logoURLs['origin']}
        />
      )}

      <KakaoChat />
    </Container>
  );
};

export default PlacePage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

function getCoffeeWithBranch(
  coffee: CoffeeType,
  branch: BranchType
): CoffeeResultType {
  return {
    id: coffee.id,
    name: coffee.name,
    note: coffee.note,
    tags: coffee.tags,
    acidity: coffee.coffeeDesc.acidity,
    characters: coffee.coffeeDesc.characters,
    flavors: coffee.coffeeDesc.flavors,
    seller: {
      name: coffee.seller.name,
      introduce: coffee.seller.introduce,
      address: coffee.seller.address,
      logoURLs: coffee.seller.logo.urls,
    },
    beans: coffee.beans,
    branch: branch,
  };
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayErrorMarker(map: kakao.maps.Map, coordi: CoordiType) {
  const locPosition = new window.kakao.maps.LatLng(coordi.y, coordi.x);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map,
    position: locPosition,
  });

  var iwContent = '기기에서 GPS을 지원하지 않음.'; // 인포윈도우에 표시할 내용
  // iwRemoveable = true;

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    position: locPosition,
    // removable: iwRemoveable,
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);

  setTimeout(() => {
    infowindow.close();
    marker.setMap(null);
  }, 3000);
}

function getCoffees(newChoice: ChoiceType, previousCoffees: CoffeeType[]) {
  /**
   * 서울, 경기 데이터만 추출한다.
   */
  const capitalCoffees = previousCoffees.filter((coffee: CoffeeType) => {
    // const isCapital =
    //   coffee.seller.address.startsWith('경기') ||
    //   coffee.seller.address.startsWith('서울');

    const hasCafes = !!coffee.branches && !coffee.name.startsWith('['); // 카페가 있고, 대용량 아닌거

    const caffeinChoices =
      newChoice.caffein.length === 1 && newChoice.caffein[0] === '디카페인'
        ? coffee.tags[1] === '디카페인'
        : newChoice.caffein.length === 1 && newChoice.caffein[0] === '카페인'
        ? coffee.tags[1] !== '디카페인'
        : true;
    // include 카페인

    // include 디카페인

    const roastingChoices =
      newChoice.roasting.length > 0
        ? newChoice.roasting.includes(coffee.tags[0])
        : true;

    const acidityChoices =
      newChoice.acidity.length > 0
        ? newChoice.acidity.includes(
            labelFromOneToFive(coffee.coffeeDesc.acidity)
          )
        : true;

    return hasCafes && caffeinChoices && roastingChoices && acidityChoices;
  });

  /**
   * coffees & branches 조합. (N * N)
   */
  const coffeesWithBranchs = capitalCoffees.flatMap((coffee) =>
    coffee.branches.map((branch) => getCoffeeWithBranch(coffee, branch))
  );

  return coffeesWithBranchs;
}

/**
 * 엑셀 데이터 추가 테스트
 */
// const jsonFileTest = async () => {
//   import('../../firebase/nutshell.json').then(async (data) => {
//     // data.default.map((coffee) => {
//     //   console.log(coffee.seller.name, ' / ', coffee.name);
//     //   console.log('coffee : ', coffee);
//     // });

//     const coffee = data.default[35];

//     const firstCoffee = await Promise.all(
//       coffee.branches
//         .filter((branch) => !!branch.address)
//         .map((filteredBranch) => {
//           console.log('filteredBranch : ', filteredBranch);
//           return getAddressXY(filteredBranch.address!);
//         })
//     );

//     console.log('firstCoffee :', firstCoffee);
//   });
// };

export const getFilePath = (imageUrl: string) => {
  const pathPrefix = `https://firebasestorage.googleapis.com/v0/b/drinkdepth.appspot.com/o/`;
  const pathSuffix = `?alt=media`;

  const rightIndex = imageUrl.indexOf(pathSuffix);
  const path = imageUrl.substring(pathPrefix.length, rightIndex);
  const decodedPath = decodeURIComponent(path);
  // const delimiter = "%2F";
  // return path.replace(delimiter, "/");
  return decodedPath;
};
