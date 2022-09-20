import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { auth, db } from './firebaseInit';

export const DB_CAFES = 'cafes';
export const DB_MENUS = 'menus';
export const DB_REVIEWS = 'reviews';

export function getDocData<T>(doc: DocumentSnapshot<DocumentData>) {
  if (doc.exists()) {
    return {
      id: doc.id,
      ...doc.data(),
      updatedAt: doc.data()?.updatedAt?.toDate().toISOString() || null,
      createdAt: doc.data()?.createdAt?.toDate().toISOString() || null,
    } as unknown as T;
  } else {
    return null;
  }
}

export function getDocsData<T>(query: QuerySnapshot<DocumentData>) {
  return query.docs.map((doc) => getDocData(doc) as T);
}

export const CREATE = (id?: string) => ({
  createdAt: new Date(),
  ...(id && { id }),
});
export const UPDATE = () => ({ updatedAt: new Date() });

//
// 재작성 중
//

export const fetchCafes = async () => {
  // const q = query(collection(db, DB_CAFES));
  // const querySnapshot = await getDocs(q);
  // const data = querySnapshot.docs.map(
  //   (doc) => ({ ...doc.data(), id: doc.id } as CafeType)
  // );
  // return data;
  return testCafes as CafeType[];
};

export const fetchCafe = async (cafeId: string) => {
  // const cafeRef = doc(db, DB_CAFES, cafeId);
  // const cafeDoc = await getDoc(cafeRef);

  // return getDocData<CafeType>(cafeDoc);
  return testCafes.find((cafe) => cafe.id === cafeId) as CafeType;
};

export const fetchCafeMenus = async (cafeId: string) => {
  // const q = query(collection(db, DB_CAFES, cafeId, DB_MENUS));
  // const querySnapshot = await getDocs(q);
  // const data = querySnapshot.docs.map(
  //   (doc) => ({ ...doc.data(), id: doc.id } as CafeMenuType)
  // );
  // return data;
  return allMenus.filter((menu) => menu.cafeId === cafeId) as CafeMenuType[];
};

export const fetchCafeMenu = async (cafeId: string, menuId: string) => {
  const menuRef = doc(db, DB_CAFES, cafeId, DB_MENUS, menuId);
  const menuDoc = await getDoc(menuRef);

  return getDocData<CafeMenuType>(menuDoc);
};

export const fetchAllMenus = async () => {
  // const q = query(collection(db, DB_CAFES, cafeId, DB_MENUS));
  // const querySnapshot = await getDocs(q);
  // const data = querySnapshot.docs.map(
  //   (doc) => ({ ...doc.data(), id: doc.id } as CafeMenuType)
  // );
  // return data;
  return allMenus as CafeMenuType[];
};

export const fetchCafeMenuReviews = async (cafeId: string, menuId: string) => {
  const q = query(
    collection(db, DB_CAFES, cafeId, DB_MENUS, menuId, DB_REVIEWS),
    limit(15),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as ReviewType)
  );
  return data;
};

export const addMenuReview = async ({
  cafeId,
  menuId,
  review,
}: {
  cafeId: string;
  menuId: string;
  review: string;
}) => {
  console.log(cafeId, menuId, review);

  const user = auth.currentUser!;
  console.log('user : ', user);
  const reviewsRef = collection(
    db,
    DB_CAFES,
    cafeId,
    DB_MENUS,
    menuId,
    DB_REVIEWS
  );
  const menuRef = doc(db, DB_CAFES, cafeId, DB_MENUS, menuId);
  const batch = writeBatch(db);

  const newReview: ReviewType = {
    text: review,
    displayName: user.displayName ?? '',
    photoURL: user.photoURL ?? '',
    uid: user.uid,
    createdAt: new Date(),
  };
  const newReviewRef = doc(reviewsRef);

  batch.set(newReviewRef, newReview);
  batch.update(menuRef, { reviewCount: increment(1) });
  await batch.commit();

  return {
    ...newReview,
    id: newReviewRef.id,
  };
};

export const deleteMenuReview = async ({
  cafeId,
  menuId,
  reviewId,
}: {
  cafeId: string;
  menuId: string;
  reviewId: string;
}) => {
  const reviewRef = doc(
    db,
    DB_CAFES,
    cafeId,
    DB_MENUS,
    menuId,
    DB_REVIEWS,
    reviewId
  );
  const menuRef = doc(db, DB_CAFES, cafeId, DB_MENUS, menuId);
  const batch = writeBatch(db);

  batch.delete(reviewRef);
  batch.update(menuRef, { reviewCount: increment(-1) });
  await batch.commit();
};

const testCafes = [
  {
    id: 'babacarmel',
    name: '바바카멜',
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211021_259%2F1634788006349s8KvS_JPEG%2FKakaoTalk_20211020_181656262.jpg',
    introduce: `※ 카페 바바카멜은 안산 플라워&로스터리 카페입니다.
      엄선된 생두와 특별한 공법으로 로스팅한 바바카멜만의 싱글오리진 원두로 내린 필터커피와 제대로 된 에스프레소를 즐겨보세요.

      ※ 그동안 쉽게 맛보기 힘들었던 두종류의 게이샤 커피를 처음으로 선보입니다.

      ※ 애견동반은 테라스(도그파킹) 이용은 언제든 가능하며, 유모차나 케이지, 슬링백안에 있을 경우 매장 이용도 가능합니다. 단, 매장안에 내려놓으시면 안됩니다.

      ※꽃바구니나 꽃다발 예약 가능하며, 매장내에서 소량의 꽃 구입도 가능합니다. 손님이 많으실 경우 포장에 조금 시간이 걸릴 수 있으니 미리 예약하시기를 권장합니다.

      ※주차는 매장 건너편 무료 공원주차장을 이용하시거나, 매장 뒷편 이면도로와 공원옆 이면도로 주차장을 이용하시면 됩니다.

      ※매장 뿐 아니라 온라인에서도 꽃과 커피의 향미를 통해 지친 현대인에게 느려도 되는 순간들, 여유로운 순간들을 지켜주는 존재로 일상의 행복을 담아 보냅니다.`,
    address: '경기 안산시 상록구 충장로 8 1층',
    addressY: '37.2825273384935',
    addressX: '126.855799779277',
    addressETC: '',
    // addressETC: '3호선 경복궁역 7번 출구에서273m',
  },
];

export const allMenus = [
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-001',
    name: '에티오피아 하로 게이샤',
    description:
      '열대 과일과 베리류의 향미와 단맛, 후미에 느껴지는 산뜻한 산미',
    labels: ['열대 과일', '베리류', '단맛', '산미'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 6000,
    category: '필터 커피',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-002',
    name: '에티오피아 베케 게이샤',
    description: '구운 견과류와 과일의 산미의 어우러짐, 균형잡힌 밸런스.',
    labels: ['구운 견과류', '과일', '산미', '밸런스'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 6000,
    category: '필터 커피',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-003',
    name: '케냐 AA 칭가 퀸',
    description: '포도주와 같은 산미와 깔끔함, 부드러운 목넘김과 풍부한 질감',
    labels: ['포도주', '산미', '깔끔', '부드러움'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 6000,
    category: '필터 커피',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-004',
    name: '파푸아뉴기니 마라와카 블루마운틴',
    description: '카라멜, 초콜릿의 단맛과 열대과일이 더해진 풍부한 아로마',
    labels: ['카라멜', '초콜릿', '단맛', '열대과일'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 6000,
    category: '필터 커피',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-005',
    name: '에티오피아 아리차 G1',
    description: '농익은 열대과일의 단향, 새콤한 산미',
    labels: ['열대과일', '단맛', '산미'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-006',
    name: '에티오피아 코케 허니',
    description: '레드와인의 산미와 감칠맛, 복합적인 아로마와 꽃향',
    labels: ['레드와인', '산미', '꽃향'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-007',
    name: '에티오피아 코케 허니',
    description: '레드와인의 산미와 감칠맛, 복합적인 아로마와 꽃향',
    labels: ['레드와인', '산미', '꽃향'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-008',
    name: '콜롬비아 수프리모 디카페인',
    description: '살구의 아로마와 감칠맛, 에이드의 청량함과 카라멜의 단맛',
    labels: ['살구', '청량함', '카라멜', '단맛'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-009',
    name: '바바카멜 하우스 블렌드',
    description: '묵직한 바디감과 구운 견과류의 후미',
    labels: ['묵직한', '바디감', '구운 견과류'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-010',
    name: '필터커피 서버 세트',
    description: '600ml 서버에 한 종류의 필터커피를 담아드립니다.',
    labels: ['세트'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 10000,
    category: '필터 커피',
    reviewCount: 0,
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-011',
    name: '자몽커피토닉',
    description: '상큼, 달달한 자몽청과 칭가퀸 커피가 어우러진 깔끔한 티',
    labels: ['자몽', '상큼', '단맛', '깔끔'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_46%2F1658476265855uy1sw_JPEG%2FKakaoTalk_20211113_130427102.jpg',
    price: 7500,
    category: '시그니처',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-012',
    name: '청귤커피토닉(시즌)',
    description: '시원한 청귤과 코케허니 커피가 어우리전 리프레쉬 티',
    labels: ['청귤', '코케허니'],
    imageURL: 'https://picsum.photos/480/480',
    price: 7500,
    category: '시그니처',
    reviewCount: 0,
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-101',
    name: '에스프레소',
    description:
      '바바카멜만의 스페셜한 블랜딩 원두, 묵직한 바디감과 구운 견과류의 후미',
    labels: ['블랜딩', '묵직한', '구운 견과류'],
    imageURL: 'https://picsum.photos/480/480',
    price: 4500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-102',
    name: '아메리카노(HOT/ICE)',
    description: '',
    labels: [],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_67%2F1658476150874DzrQ0_JPEG%2F%25BE%25C6%25B8%25DE%25B8%25AE%25C4%25AB%25B3%25EB.jpg',
    price: 4500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-103',
    name: '카페라떼(HOT)',
    description: '',
    labels: [],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_52%2F1658476211679TOw1s_JPEG%2FKakaoTalk_20211109_205006166.jpg',
    price: 5000,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-104',
    name: '바바라떼(ICE)',
    description: '오로지 라떼만을 위한 바바카멜의 스페셜 블랜딩 원두',
    labels: [],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_52%2F1658476211679TOw1s_JPEG%2FKakaoTalk_20211109_205006166.jpg',
    price: 5000,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-105',
    name: '아이스크림 카페라떼(ONLY ICE)',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 6900,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-106',
    name: '크림모카(HOT)',
    description: '진한 라떼와 초코, 바바카멜의 수제크림이 올라간 커피',
    labels: ['초코', '크림'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-107',
    name: '피넛스카치라떼(ICE)',
    description: '스카치캔디맛 달달한 라떼에 수제크림이 올라간 커피',
    labels: ['달콤'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-108',
    name: '카푸치노(HOT/ICE)',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-109',
    name: '바닐라 라떼(HOT/ICE)',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-110',
    name: '카페모카(HOT/ICE)',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-111',
    name: '카라멜 마끼아또(HOT/ICE)',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-112',
    name: '아포카토',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 6500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-113',
    name: '아몬드 크림 쿠키 라떼 (ICE)',
    description: '고소하고 달달한 아몬드 라떼와 수제크림 & 귀여운 통밀 쿠키',
    labels: ['고소', '달콤', '아몬드'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6500,
    category: '에스프레소',
    reviewCount: 0,
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-115',
    name: '밀크 아인슈페너 (ICE)',
    description: '진한 아이스라떼와 수제크림의 조화로운 아인슈페너',
    labels: ['우유', '크림'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_234%2F1658476751275AHVyG_JPEG%2F%25B9%25D0%25C5%25A9_%25BE%25C6%25C0%25CE%25BD%25B4%25C6%25E4%25B3%25CA.jpg',
    price: 6500,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-116',
    name: '솔티 아인슈페너 (ICE)',
    description: '깔끔한 커피 + 수제크림의 단짠 조화',
    labels: ['우유', '크림', '단짠'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_227%2F1658476795138X2ISd_JPEG%2F%25BC%25D6%25C6%25BC_%25BE%25C6%25C0%25CE%25BD%25B4%25C6%25E4%25B3%25CA.jpg',
    price: 6000,
    category: '에스프레소',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-117',
    name: '얼그레이 아인슈페너 (ICE)',
    description: '진한 아이스라떼와 수제크림의 조화로운 아인슈페너',
    labels: ['얼그레이', '크림'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_85%2F1658476833390x89Sj_JPEG%2F%25BE%25F3%25B1%25D7%25B7%25B9%25C0%25CC%25BE%25C6%25C0%25CE%25BD%25B4%25C6%25E4%25B3%25CA.jpg',
    price: 6000,
    category: '에스프레소',
    reviewCount: 0,
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-201',
    name: '자몽 에이드 & 티 (HOT/ICE)',
    description: '바바카멜이 정성껏 만든 수제청을 사용합니다.',
    labels: ['자몽'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-202',
    name: '레몬 에이드 & 티 (HOT/ICE)',
    description: '바바카멜이 정성껏 만든 수제청을 사용합니다.',
    labels: ['레몬'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-203',
    name: '딸기레몬 에이드 & 티 (HOT/ICE)',
    description: '바바카멜이 정성껏 만든 수제청을 사용합니다.',
    labels: ['딸기레몬'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-204',
    name: '백향과 에이드 & 티 (HOT/ICE)',
    description: '바바카멜이 정성껏 만든 수제청을 사용합니다.',
    labels: ['백향과'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-205',
    name: '애플망고레몬 에이드 & 티 (HOT/ICE)',
    description: '바바카멜이 정성껏 만든 수제청을 사용합니다.',
    labels: ['애플망고레몬'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-206',
    name: '딸기라떼 (ICE ONLY)',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-207',
    name: '애플망고라떼 (ICE ONLY)',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-208',
    name: '초코라뗴(HOT/ICE)',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 5000,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-211',
    name: '플레인 요거트 스무디',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 6000,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-212',
    name: '딸기 요거트 스무디',
    description: '',
    labels: ['딸기'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6000,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-213',
    name: '블루베리 요거트 스무디',
    description: '',
    labels: ['블루베리'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6000,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-214',
    name: '망고 요거트 스무디',
    description: '',
    labels: ['망고'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6000,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-221',
    name: '자몽 생과일 착즙 쥬스',
    description: '',
    labels: ['자몽'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6000,
    category: '음료',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-222',
    name: '오렌지 생과일 착즙 쥬스',
    description: '',
    labels: ['오렌지'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6000,
    category: '음료',
    reviewCount: 0,
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-301',
    name: '나비티백 메리골드',
    description: '특유의 향과 달달한 맛',
    labels: ['달콤'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5000,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-302',
    name: '나비티백 목련',
    description: '알싸한 향과 달콤한 맛',
    labels: ['달콤', '알싸한'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5000,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-303',
    name: '나비티백 맨드라미',
    description: '부드러운 향과 고소한 맛',
    labels: ['부드러운', '고소한'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5000,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-304',
    name: '나비티백 아카시아',
    description: '싱그러운 향과 달콤한 꿀맛',
    labels: ['싱그러운', '달콤한'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5000,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-311',
    name: '리프레시 레몬',
    description: '레몬 & 국화 & 타임',
    labels: ['레몬', '국화', '타임'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6500,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-312',
    name: '리프레시 오렌지',
    description: '오렌지 & 메리골드 & 로즈마리',
    labels: ['오렌지', '메리골드', '로즈마리'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6500,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-313',
    name: '리프레시 자몽',
    description: '자몽 & 맨드라미 & 애플민트',
    labels: ['자몽', '맨드라미', '애플민트'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6500,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-321',
    name: '국화 티스틱',
    description: '산뜻한 향과 깔끔한 맛',
    labels: ['국화', '산뜻', '깔끔'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-322',
    name: '구절초 티스틱',
    description: '야생화의 향과 은은한 맛',
    labels: ['은은한'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-323',
    name: '방아꽃 티스틱',
    description: '상큼한 향과 부드러운 맛',
    labels: ['상큼한', '부드러운'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '플라워 티',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-324',
    name: '쑥꽃 티스틱',
    description: '시원한 향과 깔끔담백한 맛',
    labels: ['깔끔', '담백'],
    imageURL: 'https://picsum.photos/480/480',
    price: 5500,
    category: '플라워 티',
    reviewCount: 0,
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-401',
    name: '말렌카 허니 케이크',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 6500,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-402',
    name: '흑임자 쑥 쌀 케이크',
    description: '덜달고 건강한, No 밀가루, 식이섬유, 흑임자와 쑥',
    labels: ['흑임자', '쑥'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6900,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-403',
    name: '멜로디 케이크',
    description:
      '생크림 29.31(독일산), 초콜릿13.82(베트남, 이탈리아), 우유(국내)',
    labels: ['생크림', '초콜릿', '우유'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6900,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-404',
    name: '당근 케이크',
    description:
      '생크림 23(독일산), 백설탕 19,98, 세척당근, 크림치즈 6.3(미국산)',
    labels: ['생크림', '세척당근', '크림치즈'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6900,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-405',
    name: '시카고 치즈 케이크',
    description:
      '크림치즈 43.64(미국산), 희소당시럽 1.45, 휘핑크림(프랑스산), 계란(국산)',
    labels: ['크림치즈', '계란'],
    imageURL: 'https://picsum.photos/480/480',
    price: 6500,
    category: '디저트',
    reviewCount: 0,
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-411',
    name: '리얼뉴욕초코칩 수제 르뱅쿠키',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 3500,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-412',
    name: '화이트스트로베리 수제 르뱅쿠키',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-413',
    name: '트리플 초코 스모어 수제 르뱅쿠키',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-414',
    name: '초코나무숲 수제 르뱅쿠키',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-415',
    name: '오레오 스모어 수제 르뱅쿠키',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-421',
    name: '무화과 크랜베리 수제 스콘',
    description: '',
    labels: ['무화과', '크랜베리'],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-422',
    name: '대파치즈 수제 스콘',
    description: '',
    labels: ['대파', '치즈'],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-423',
    name: '생크림 수제 스콘',
    description: '',
    labels: ['생크림'],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-424',
    name: '라즈베리 수제 스콘',
    description: '',
    labels: ['라즈베리'],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-425',
    name: '초코칩 크랜베리 수제 스콘',
    description: '',
    labels: ['초코칩', '크랜베리'],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-431',
    name: '바닐라 쿠키 (한컵)',
    description: '',
    labels: ['바닐라'],
    imageURL: 'https://picsum.photos/480/480',
    price: 3000,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-432',
    name: '프레첼 머랭 (한봉지)',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 3000,
    category: '디저트',
    reviewCount: 0,
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-441',
    name: '로스티드 바게트 샌드위치',
    description:
      '오랜시간 직접 훈연한 등심(국내산), 풍미 가득 프랑스 물레버터, 프랑스 하드 바게트, 직접 키운 로메인(때로는 양상추)',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 7000,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-442',
    name: '크로와상 샌드위치',
    description:
      '프랑스 이즈니버터 크로와상, 직접 키운 로메인(떄로는 양상추), 햄(국내산), 치즈, 토마토, 바바 소스',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 6000,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-443',
    name: '바바 샌드위치',
    description:
      '구운 식빵, 직접 키운 로메인, 바바소스, 계란, 토마토, 치즈, 햄(국내산)',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 6000,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-444',
    name: '바질 머쉬룸 그릴 샌드위치',
    description: '호밀빵, 바질페스토, 구운 버섯과 모짜렐라',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 7000,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-451',
    name: '이즈니버터 크로와상',
    description: '프랑스 정부 AOP 인증의 최고급 버터',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 3500,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-452',
    name: '앙버터 크로와상',
    description: '프랑스 크로와상, 맛있는 통단팥, 풍미가득 고메버터',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 5000,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-453',
    name: '소금빵',
    description: '',
    labels: [],
    imageURL: 'https://picsum.photos/480/480',
    price: 3800,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-461',
    name: '바바 크로플 (브라운 치즈)',
    description: '겉바속촉 크로플과 아이스크림, 브라운 치즈의 치명적 단짠 조화',
    labels: ['겉바속촉', '아이스크림', '치즈', '단짠'],
    imageURL: 'https://picsum.photos/480/480',
    price: 8000,
    category: '디저트',
    reviewCount: 0,
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-462',
    name: '바바 크로플 (티라미수)',
    description: '겉바속촉 크로플, 젤라또, 발로나 다크초코',
    labels: ['겉바속촉', '초코'],
    imageURL: 'https://picsum.photos/480/480',
    price: 9000,
    category: '디저트',
    reviewCount: 0,
  },
];
