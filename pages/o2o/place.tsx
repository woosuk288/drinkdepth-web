import {
  Box,
  Button,
  Container,
  IconButton,
  LinearProgress,
  SelectChangeEvent,
} from '@mui/material';

import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CoffeeResultList from '../../src/o2o/place/CoffeeResultList';
import Selectors from '../../src/o2o/place/Selectors';

import { useReactiveVar } from '@apollo/client';
import { ChoiceType, choiceVar } from '../../apollo/client';
import AlertDialogSlide from '../../src/o2o/place/coffeeDetailDialog';
import ImagesDialog from '../../src/o2o/place/ImagesDialog';
import { analytics } from '../../src/utils/firebase/firebaseInit';
import { logEvent } from 'firebase/analytics';
import useScript from '../../src/hooks/useScript';
import { labelFromOneToFive } from '../../src/utils/combos';
import { getAddressXY } from '../../src/utils/kakaoAPI';

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
  y: string;
  x: string;
};

export type SellerType = {
  name: string;
  introduce: string;
  address: string;
  logoURLs: any;
  placeImages: string[];
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

const PlacePage: NextPage = () => {
  const router = useRouter();

  const mapLoadedStatus = useScript(
    `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services,clusterer`
  );

  const [coffees, setSetCoffees] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingGPS, setLoadingGPS] = useState(false);

  // 서울 중심
  const [coordi, setCoordi] = useState<CoordiType>({
    y: '37.566826004661',
    x: '126.978652258309',
  });
  const [myLocation, setMyLocation] = useState<any>();

  const [mapObj, setMapObj] = useState<any>();

  const choice = useReactiveVar(choiceVar);

  const [filteredCoffees, setFilteredCoffees] = useState<CoffeeResultType[]>(
    []
  );

  const [coffeeDetail, setCoffeeDetail] = useState<CoffeeResultType>();
  const [openDetail, setOpenDetail] = useState(false);
  const [openImages, setOpenImages] = useState(false);

  useEffect(() => {
    if (mapLoadedStatus === 'ready') {
      const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
          const map = getKakaoMap('map', coordi.y, coordi.x);

          setMapObj(map);

          console.log('loaded kakao map');
        });
      };

      onLoadKakaoMap();
    }
  }, [coordi.x, coordi.y, mapLoadedStatus]);

  useEffect(() => {
    // const coffeesJSON = new Promise((resolve, reject) => {
    //   setTimeout(
    //     resolve,
    //     2000,
    //     import('../../firebase/productsDetailsWithCafes.json')
    //   );
    // });

    // coffeesJSON.then((data: any) => {
    //   const lazyMap = React.lazy(() => import('../../src/o2o/KakaoMap'));
    //   console.log('lazyMap : ', lazyMap);

    //   setLoading(false);
    //   setSetCoffees(data.default);
    //   showFilteredCoffeeList(choice, data.default);
    // });
    import('../../src/utils/firebase/productsDetailsWithCafes.json').then(
      (data) => {
        setSetCoffees(data.default);
        setLoadingData(false);
        // showFilteredCoffeeList(choice, data.default);
      }
    );
  }, []);

  const handleChange = async (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    const newChoice = {
      ...choice,
      [event.target.name]: typeof value === 'string' ? value.split(',') : value,
    };

    // const info = await getAddressXY('서울특별시');
    // console.log('info : ', info);

    choiceVar(newChoice);
    // setChoice(newChoice);

    showFilteredCoffeeList(newChoice, coffees);
  };

  const showFilteredCoffeeList = (
    newChoice: ChoiceType,
    previousCoffees: CoffeeType[]
  ) => {
    const map = getKakaoMap('map', coordi.y, coordi.x);

    // 마커 클러스터러를 생성합니다
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10, // 클러스터 할 최소 지도 레벨
    });

    // 추가된 모든 마커를 삭제한다.
    clusterer.clear();

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

    const markers = capitalCoffees.reduce((pre, cur) => {
      let next: any[] = pre;

      const cafesMarkers = cur.branches.map((branch) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            branch.addressY,
            branch.addressX
          ),
        });

        // 마커에 클릭이벤트를 등록합
        window.kakao.maps.event.addListener(marker, 'click', async function () {
          // 클릭시...
          const coffeeWithBranch = getCoffeeWithBranch(cur, branch);
          // handleTextClick(coffeeWithBranch);

          setCoffeeDetail(coffeeWithBranch);
          setOpenDetail(true);

          const ga = await analytics;
          logEvent(ga!, 'custom_click_marker_main', {
            name: coffeeWithBranch.name,
            branchName: coffeeWithBranch.branch.name,
          });
        });

        return marker;
      });

      next = pre.concat(...cafesMarkers);
      return next;
    }, [] as any[]);

    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);

    if (myLocation) {
      displayCustomOverlay(map, myLocation);
    }

    // redraw??

    // set
    setMapObj(map);

    const coffeesWithBranch = capitalCoffees.reduce((pre, cur) => {
      let result: CoffeeResultType[] = pre;
      cur.branches.map((branch) => {
        const coffeeWithBranch = getCoffeeWithBranch(cur, branch);

        result.push(coffeeWithBranch);
      });

      return result;
    }, [] as CoffeeResultType[]);

    setFilteredCoffees(coffeesWithBranch);
  };

  const handleCloseDetail = () => {
    setCoffeeDetail(undefined);
    setOpenDetail(false);
  };

  const handleCloseImages = () => {
    setCoffeeDetail(undefined);
    setOpenImages(false);
  };

  const handleImageClick = async (coffeeResult: CoffeeResultType) => {
    // open Dialog? image slide
    setCoffeeDetail(coffeeResult);
    setOpenImages(true);

    const ga = await analytics;
    logEvent(ga!, 'select_content', {
      content_type: 'image',
      content_id: coffeeResult.name,
      items: [
        { branchName: coffeeResult.branch.name, drinkName: coffeeResult.name },
      ],
    });
  };

  const handleTextClick = async (coffeeResult: CoffeeResultType) => {
    // const info = await getAddressXY(
    //   // 한글 주소
    //   '서울 강남구 테헤란로 142 아크플레이스 1층'
    // );
    // console.log(info.address_name);
    // console.log(`     "addressY" : "${info.y}", "addressX" : "${info.x}",`);
    setCoffeeDetail(coffeeResult);
    setOpenDetail(true);

    const ga = await analytics;

    logEvent(ga!, 'select_content', {
      content_type: 'content',
      item_id: coffeeResult.name,
    });
  };

  const handleGPSClick = () => {
    // 이미 위치 정보 받아왔으면
    if (myLocation) {
      mapObj.setCenter(myLocation);
      return;
    }

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      setLoadingGPS(true);

      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          var locPosition = new window.kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">나의 위치?!</div>'; // 인포윈도우에 표시될 내용입니다

          // 마커와 인포윈도우를 표시합니다
          // displayMarker(mapObj, locPosition, message);

          setMyLocation(locPosition);
          displayCustomOverlay(mapObj, locPosition, true);
          setLoadingGPS(false);
        },
        (error) => {
          console.log('error.message : ', error.message);
          setLoadingGPS(false);
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new window.kakao.maps.LatLng(coordi.y, coordi.x),
        message = 'geolocation을 사용할수 없어요..';

      displayMarker(mapObj, locPosition, message);
    }
  };

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

  if (mapLoadedStatus !== 'ready')
    return (
      <Container maxWidth="sm" disableGutters>
        Loading...
      </Container>
    );

  return (
    <Container maxWidth="sm" disableGutters>
      {/* <Button onClick={jsonFileTest}>jsontest</Button> */}
      <a
        href="https://pf.kakao.com/_ktxnJb/chat"
        target="_blank"
        style={{ position: 'fixed', right: 20, bottom: 10, zIndex: 100 }}
        rel="noreferrer"
      >
        <Button
          color="primary"
          size="large"
          variant="contained"
          sx={{
            position: 'fixed',
            right: 20,
            bottom: 10,
            zIndex: 100,
            fontWeight: 'bold',
          }}
        >
          피드백
        </Button>
      </a>

      <Box className="map-area" sx={{ position: 'relative' }}>
        <div style={{ aspectRatio: '1 / 1' }} id="map"></div>
        {/* <KaKaoMap latitude={coordi.y} longitude={coordi.x} /> */}
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

      {filteredCoffees.length > 0 && (
        <CoffeeResultList
          coffeeResults={filteredCoffees}
          handleImageClick={handleImageClick}
          handleTextClick={handleTextClick}
        />
      )}

      {coffeeDetail && (
        <AlertDialogSlide
          open={openDetail}
          handleClose={handleCloseDetail}
          coffeeDetail={coffeeDetail}
        />
      )}

      {coffeeDetail && (
        <ImagesDialog
          open={openImages}
          handleClose={handleCloseImages}
          branch={coffeeDetail.branch}
          sellerLogo={coffeeDetail.seller.logoURLs['origin']}
        />
      )}
    </Container>
  );
};

export default PlacePage;

function getCoffeeWithBranch(coffee: CoffeeType, branch: BranchType) {
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
      // placeImages: coffee.seller.wallImages.map(
      //   (wallImage: any) => wallImage.urls.origin
      // ),
      placeImages:
        branch.images.length > 0
          ? branch.images
          : [coffee.seller.logo.urls.origin],
    },
    beans: coffee.beans,
    branch: branch,
  };
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(map: any, locPosition: any, message: string) {
  // 마커를 생성합니다
  var marker = new window.kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  var iwContent = message; // 인포윈도우에 표시할 내용
  // iwRemoveable = true;

  // 인포윈도우를 생성합니다
  var infowindow = new window.kakao.maps.InfoWindow({
    content: iwContent,
    // removable: iwRemoveable,
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

function displayCustomOverlay(
  map: any,
  locPosition: any,
  goCenter: boolean = false
) {
  var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
    imageSize = new window.kakao.maps.Size(42, 46), // 마커이미지의 크기입니다
    imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new window.kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  // 마커를 생성합니다
  var marker = new window.kakao.maps.Marker({
    position: locPosition,
    image: markerImage, // 마커이미지 설정
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 지도 중심좌표를 접속위치로 변경합니다
  if (goCenter) {
    map.setCenter(locPosition);
  }
}

function getKakaoMap(id: string, y: string, x: string, level: number = 11) {
  const container = document.getElementById(id)!;
  const options = {
    center: new window.kakao.maps.LatLng(y, x),
    level, // 지도의 확대 레벨
  };
  const map = new window.kakao.maps.Map(container, options);

  return map;
}
