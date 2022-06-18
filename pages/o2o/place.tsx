import { Box, Container, SelectChangeEvent } from '@mui/material';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import KaKaoMap from '../../src/o2o/KakaoMap';
import CoffeeResultList from '../../src/o2o/place/CoffeeResultList';
import Selectors from '../../src/o2o/place/Selectors';

import { useReactiveVar } from '@apollo/client';
import { choiceVar } from '../../apollo/client';
import AlertDialogSlide from '../../src/o2o/place/coffeeDetailDialog';
import ImagesDialog from '../../src/o2o/place/ImagesDialog';

export type CoffeeType = {
  id: string;
  name: string;
  note: string;
  tags: string[];
  packageImage: any;
  branches: BranchType[];
  seller: any;
  coffeeDesc: any;
  beans: BeanType[];
};

export type CoordiType = {
  y: string;
  x: string;
};
export type ChoiceType = {
  hasCaffein: string;
  roasting: string;
  acidity: string;
};

export type SellerType = {
  name: string;
  introduce: string;
  address: string;
  address_y: string;
  address_x: string;
  logoURLs: any;
  placeImages: string[];
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
  packageImageURLs: any;
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

  const [coffees, setSetCoffees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 서울 중심
  const [coordi, setCoordi] = useState<CoordiType>({
    y: '37.566826004661',
    x: '126.978652258309',
  });

  const choice = useReactiveVar(choiceVar);

  const [filteredCoffees, setFilteredCoffees] = useState<CoffeeResultType[]>(
    []
  );

  const [coffeeDetail, setCoffeeDetail] = useState<CoffeeResultType>();
  const [openDetail, setOpenDetail] = useState(false);
  const [openImages, setOpenImages] = useState(false);

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
    import('../../firebase/productsDetailsWithCafes.json').then((data) => {
      setSetCoffees(data.default);
      setLoading(false);
      // showFilteredCoffeeList(choice, data.default);
    });
  }, []);

  const handleChange = async (event: SelectChangeEvent) => {
    const newChoice = {
      ...choice,
      [event.target.name]: event.target.value,
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
    var map = new window.kakao.maps.Map(document.getElementById('map'), {
      // 지도를 표시할 div
      center: new window.kakao.maps.LatLng(coordi.y, coordi.x), // 지도의 중심좌표
      level: 11, // 지도의 확대 레벨
    });

    // 마커 클러스터러를 생성합니다
    var clusterer = new window.kakao.maps.MarkerClusterer({
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

      return hasCafes && isCaffein && isRoasting && isAcidity;
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
        window.kakao.maps.event.addListener(marker, 'click', function () {
          // 클릭시...
          const coffeeWithBranch = getCoffeeWithBranch(cur, branch);
          handleTextClick(coffeeWithBranch);
          // alert('무잇어 필요하까?');
        });

        return marker;
      });

      next = pre.concat(...cafesMarkers);
      return next;
    }, [] as any[]);

    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);

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

  return (
    <Container maxWidth="sm" disableGutters>
      <Box>
        <KaKaoMap latitude={coordi.y} longitude={coordi.x} />
      </Box>

      <Selectors choice={choice} handleChange={handleChange} />

      <CoffeeResultList
        coffeeResults={filteredCoffees}
        handleImageClick={handleImageClick}
        handleTextClick={handleTextClick}
      />

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
    packageImageURLs: coffee.packageImage.urls,
    tags: coffee.tags,
    acidity: coffee.coffeeDesc.acidity,
    characters: coffee.coffeeDesc.characters,
    flavors: coffee.coffeeDesc.flavors,
    seller: {
      name: coffee.seller.name,
      introduce: coffee.seller.introduce,
      address: coffee.seller.address,
      address_y: coffee.seller.address_y,
      address_x: coffee.seller.address_x,
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
