import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import RedirectPage from 'src/common/RedirectPage';
import { AuthUserProvider, useAuth } from 'src/context/AuthUserContext';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import {
  // batchUpdate,
  createMenu,
  getImageURLs,
  updateImages,
} from 'src/utils/firebase/services';
import { NOT_FOUND_PATH } from 'src/utils/routes';

import CafeHeader from '../../../src/cafe/Header';

function ManagePage() {
  const { user, loading } = useFirebaseAuth();
  const [isChecking, setIsChecking] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsChecking(true);
      user
        .getIdTokenResult()
        .then((token) => {
          setAdmin(token.claims.admin);
        })
        .finally(() => {
          setIsChecking(false);
        });
    }
  }, [user]);

  if (loading) return null;

  if (!user) return <RedirectPage path={NOT_FOUND_PATH} />;

  if (isChecking) return null;

  if (!admin) return <RedirectPage path={NOT_FOUND_PATH} />;

  return (
    <Container maxWidth="sm" disableGutters>
      <AuthUserProvider>
        <CafeHeader title="관리" />

        <Manage />
      </AuthUserProvider>
    </Container>
  );
}
export default ManagePage;

/**
 *
 */
function Manage() {
  const { user } = useAuth();

  const handleMenuCreate = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const token = await user?.getIdTokenResult();
    if (token?.claims.admin !== true) return;

    const images = await getImageURLs(prefix, filename, suffix);

    const result = await createMenu(data, images);
    console.log('data : ', { ...data, images });
    alert(result);
  };

  const handleUdpateMenuImages = () => {
    // const path = `cafes/${data.cafeId}/menus/${data.id}`;
    // const prefix = 'images/menus/babacarmel/';
    // const filename = '';
    // const suffix = '.jpg';
    updateImages(path, prefix, filename, suffix);
  };

  return (
    <>
      <div style={{ whiteSpace: 'pre' }}>{JSON.stringify(data, null, 4)}</div>
      <Button variant="contained" onClick={handleMenuCreate}>
        메뉴 추가
      </Button>

      {/* <div>
        docPath: {path} <br />
        {prefix}
        {filename}
        {suffix}
      </div> */}
      {/* <Button variant="contained" onClick={handleUdpateMenuImages}>사진 업데이트</Button> */}

      {/* <div style={{ whiteSpace: 'pre' }}>
        {JSON.stringify(batchdata, null, 4)}
      </div>
      <Button onClick={() => batchUpdate(batchdata)}>일괄 수정</Button> */}
    </>
  );
}

const cafeId = 'babacarmel';
const menuId = 'babacarmel-416';

const data = {
  id: menuId,
  cafeId,
  name: '악마의 로투스 르뱅 쿠키',
  description: '',
  labels: [],
  imageURL: '/images/logo_icon.png',
  images: {} as ImagesType,
  price: 3800,
  category: '디저트',
  reviewCount: 0,
  createdAt: new Date(),
};

const path = `cafes/${cafeId}/menus/${menuId}`;
const prefix = `images/menus/${data.cafeId}/`;
const filename = '디저트 - 악마의 로투스 르뱅쿠키';
const suffix = '.jpg';

// const data = {
//   id: 'babacarmel-209',
//   cafeId: 'babacarmel',
//   name: '흑임자 라떼',
//   description: '',
//   labels: [],
//   imageURL: '/images/logo_icon.png',
//   images: {} as ImagesType,
//   price: 5500,
//   category: '음료',
//   reviewCount: 0,
//   createdAt: new Date(),
// };

// const filename = '음료 - 흑임자 라떼';

// const batchdata = [
//   {
//     id: 'babacarmel-001',
//     ownerComment:
//       '밝은날 상쾌하게 가볍게 마시기 좋은 커피입니다.과일 산미 좋아하시는분들께 추천 아이스로도 추천드립니다.',
//   },
//   {
//     id: 'babacarmel-002',
//     ownerComment:
//       '자스민 향으로 시작해서 초콜릿 향으로 끝나는 로스팅 포인트 , 호불호가 많이 안갈리는 커피입니다. 추운날 흐린날 더 잘어울립니다. 가장 잘 나가는 커피입니다.',
//   },
//   {
//     id: 'babacarmel-003',
//     ownerComment:
//       '스페셜티 등급이며 자몽커피토닉에 들어가는 커피가 바로 이 원두입니다. 기분이 다운됐을때 드셔보세요',
//   },
//   {
//     id: 'babacarmel-004',
//     ownerComment:
//       '블루마운틴 하면 마리와카죠. 열대과일 산미  밸런스 좋은커피 입니다.',
//   },
//   {
//     id: 'babacarmel-005',
//     ownerComment: '과일에서 나는 향미가 인상적입니다.',
//   },
//   {
//     id: 'babacarmel-006',
//     ownerComment:
//       '오후 시간때 어울립니다. 남녀노소 다 인기가 많은 원두입니다. 달콤한 무게감.',
//   },
//   {
//     id: 'babacarmel-008',
//     ownerComment:
//       '디카페인이 맛없다라는 편견을 깨주는 자신 있는 디카페인 원두입니다. 한번 드셔보셔요. 저녁에 카페인이 부담이 된다면 ?',
//   },
//   {
//     id: 'babacarmel-009',
//     ownerComment: '아로마 노트가 인상적인 힐링적인 커피입니다,',
//   },
//   {
//     id: 'babacarmel-010',
//     ownerComment: '600ML 대용량',
//   },
//   {
//     id: 'babacarmel-011',
//     ownerComment:
//       '바디감이 있는 색다른 시그니처음료 입니다. 커피의 맛이 부담되신다면?',
//   },
//   {
//     id: 'babacarmel-012',
//     ownerComment: '상쾌함이 있는 커피와 조합된 시그니처음료 입니다.',
//   },
//   {
//     id: 'babacarmel-102',
//     ownerComment: '탄맛나는 커피를 지양하며 깔끔한 스타일의 아메리카노 입니다.',
//   },
//   {
//     id: 'babacarmel-103',
//     ownerComment:
//       '유기농 원두가 들어간 오직 라떼만을 위한 블렌딩 원두를 쓴 라떼 입니다.',
//   },
//   {
//     id: 'babacarmel-104',
//     ownerComment:
//       '최고의 우유와 라떼만을 위한 블렌딩 원두가 만났습니다. 달지 않은 묵직한 카페라떼',
//   },
//   {
//     id: 'babacarmel-105',
//     ownerComment: '마시고 나서 테이크아웃까지 해가는 메뉴',
//   },
//   {
//     id: 'babacarmel-106',
//     ownerComment:
//       '섞지말고 마시세요.! 스트레스 받을때 찐한 감칠맛으로 해소하기 좋습니다.',
//   },
//   {
//     id: 'babacarmel-107',
//     ownerComment:
//       '버터 스카치 커피의 업그레이드 버전 입니다. 스카치 캔디맛 라떼 (+크림)',
//   },
//   {
//     id: 'babacarmel-108',
//     ownerComment: '시나몬파우더가 들어있습니다.',
//   },
//   {
//     id: 'babacarmel-109',
//     ownerComment:
//       '기존 프랜차이즈 바닐라 라떼 대비 커피맛이 진한 느낌을 받을 수 있습니다.',
//   },
//   {
//     id: 'babacarmel-110',
//     ownerComment: '커피와 달콤한 초코의만남',
//   },
//   {
//     id: 'babacarmel-112',
//     ownerComment: '수제 젤라또를 사용한 아포카토',
//   },
//   {
//     id: 'babacarmel-113',
//     ownerComment: '아몬드 우유, 진한 커피샷, 고소한 아몬드 크림 ,',
//   },
//   {
//     id: 'babacarmel-115',
//     ownerComment: '섞지않고 크림을 입에 묻고있을때 크림을 같이 드셔요',
//   },
//   {
//     id: 'babacarmel-116',
//     ownerComment:
//       '섞어서 드시면 안됩니다! 입술에 크림이 묻었을때 먹어서 솔티함의 조화가 정말 매력적인 메뉴입니다.',
//   },
//   {
//     id: 'babacarmel-118',
//     ownerComment:
//       '100% 국산 흑임자의 찐한 크림을 한번 맛보시고 섞어서 드셔보세요. 강추',
//   },
//   {
//     id: 'babacarmel-206',
//     ownerComment: '엄청 달달한 시럽느낌의 딸기라떼의 느낌은 아닙니다.',
//   },
//   {
//     id: 'babacarmel-301',
//     ownerComment:
//       '담백하고 깔끔한 맛과 향이며 폴리페놀이 풍부합니다. 항산화 효과가 있는것으로 알려져 있습니다.',
//   },
//   {
//     id: 'babacarmel-303',
//     ownerComment:
//       '맛은 담백하면서 단맛과 함께 잘 익은 풀향 여성질환 완화 면역력 증진으로 알려져 있습니다.',
//   },
//   {
//     id: 'babacarmel-304',
//     ownerComment: '감미로운 향과 소염작용으로 유명합니다',
//   },
//   {
//     id: 'babacarmel-311',
//     ownerComment: '휴식을 위한 블렌딩 티 시리즈 입니다. 아이스가 가능합니다',
//   },
//   {
//     id: 'babacarmel-312',
//     ownerComment: '휴식을 위한 블렌딩 티 시리즈 입니다. 아이스가 가능합니다',
//   },
//   {
//     id: 'babacarmel-313',
//     ownerComment: '휴식을 위한 블렌딩 티 시리즈 입니다. 아이스가 가능합니다',
//   },
//   {
//     id: 'babacarmel-321',
//     ownerComment:
//       '국화차는 숙취해소 효과가 있는걸로 알려져 있습니다. 은은하고 부드러운 꽃향은 덤 입니다. 2번 이상 우려드시는걸 추천합니다.',
//   },
//   {
//     id: 'babacarmel-322',
//     ownerComment: '혈액순환을 돕는 따뜻한 성질의 차 입니다.',
//   },
//   {
//     id: 'babacarmel-323',
//     ownerComment:
//       '코리안 허브로 불리우는 방아꽃 위장기능에 좋다고 알려져 있습니다.',
//   },
//   {
//     id: 'babacarmel-324',
//     ownerComment:
//       '따뜻한 성질의 쑥꽃입니다. 국화와 쑥이 조금 인 일반적인 쑥음료와는 다른 느낌을 받으실 겁니다.',
//   },
//   {
//     id: 'babacarmel-401',
//     ownerComment: '체코 전통꿀, 전통 방식의 달콤한 케이크',
//   },
//   {
//     id: 'babacarmel-402',
//     ownerComment: 'no밀가루 , 식이섬유 , 무설탕, 갸또 스타일의 쑥 케이크',
//   },
//   {
//     id: 'babacarmel-403',
//     ownerComment: '다크 화이트 리얼초콜릿이 진한 블랙 앤 화이트 무스',
//   },
//   {
//     id: 'babacarmel-404',
//     ownerComment: '아삭아삭 당근과 크림치즈의 풍미 가득한 케이크',
//   },
//   {
//     id: 'babacarmel-405',
//     ownerComment:
//       '상큼하면서 고소한 끝맛이 특징인 필라델피아 크림치즈를 사용한 오랜시간 구운 더욱 부드러운 케이크',
//   },
//   {
//     id: 'babacarmel-411',
//     ownerComment: '반죽반 초코반 촉촉한 진짜 초코칩쿠키',
//   },
//   {
//     id: 'babacarmel-412',
//     ownerComment: '동결건조 딸기가루가 들어간 새콤 달달 르뱅쿠키',
//   },
//   {
//     id: 'babacarmel-413',
//     ownerComment:
//       '진한 3가지 종류의 초코와 마시멜로가 함께 구어진 초코향가득한 쿠키',
//   },
//   {
//     id: 'babacarmel-414',
//     ownerComment: '명품 발로나 파우더와 초코칩 크랜베리의 조화',
//   },
//   {
//     id: 'babacarmel-415',
//     ownerComment: '오레오 반죽과 스모어로 바삭 쫀득 식감 달콤한 느낌의 쿠키',
//   },
//   {
//     id: 'babacarmel-416',
//     ownerComment: '쿠키 먹고 커피를 마시면 또 다른 커피맛을 느끼실수 있습니다.',
//   },
//   {
//     id: 'babacarmel-421',
//     ownerComment: '무화과 씹히는 느낌이 인상적인 달달한 밸런스의 스콘 ',
//   },
//   {
//     id: 'babacarmel-422',
//     ownerComment: '달달한 파향의 야채크래커 느낌의 중독성있는 단짠스콘',
//   },
//   {
//     id: 'babacarmel-423',
//     ownerComment: '반죽에 생크림이 들어가 고소하고 부드러움이 특징인 스콘',
//   },
//   {
//     id: 'babacarmel-424',
//     ownerComment: '부드럽고 담백한 스콘에 달콤한 라즈베리 스콘의 기본조합',
//   },
//   {
//     id: 'babacarmel-425',
//     ownerComment: '명품 발로나 파우더와 초코칩 크랜베리의 조화',
//   },
//   {
//     id: 'babacarmel-431',
//     ownerComment:
//       '건강한 재료로만 만든 부드러운 식감의 버터 바닐라 쿠키 (반려동물과도 나눠먹을수 있어요!)',
//   },
//   {
//     id: 'babacarmel-432',
//     ownerComment: '바삭하고 짭조름한 프레첼 사이의 샌드된 달콤한 단짠머랭',
//   },
//   {
//     id: 'babacarmel-441',
//     ownerComment: '직접 훈연한 고기와 신선한 재료의 샌드위치',
//   },
//   {
//     id: 'babacarmel-453',
//     ownerComment: '음료 어디에나 어울리는 SNS에 화제인 빵',
//   },
// ];
