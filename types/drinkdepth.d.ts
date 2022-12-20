type CafeMenuReviewType = {
  id: string;
  menuName: string;
  images: ImageType[];
  type: string;

  place?: PlacesSearchResultItem;

  coffee?: {
    bean?: string; // TODO: 테스트 후 데이터 삭제시 같이 삭제
    beanType?: string;
    country?: string;
    acidity?: string;
    sweetness?: string;
    flavors?: string[];
  };
  // desert: {
  // 	pair?: boolean,
  // 	pairRating?: string,
  // 	flavors?: string[],
  // },

  keywords?: string[];
  text: string; // 한줄평?
  rating: number;

  uid: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
};

type ImageType = {
  name: string;
  url: string;
  objectFit: 'cover' | 'contain';
  rotate: number;
};

type PlacesSearchResult = PlacesSearchResultItem[];

type PlacesSearchResultItem = {
  /**
   * 장소 ID
   */
  id: string;

  /**
   * 장소명, 업체명
   */
  place_name: string;

  /**
   * 카테고리 이름
   * 예) 음식점 > 치킨
   */
  category_name: string;

  /**
   * 중요 카테고리만 그룹핑한 카테고리 그룹 코드
   * 예) FD6
   */
  category_group_code: CategoryGroupCode;

  /**
   * 중요 카테고리만 그룹핑한 카테고리 그룹명
   * 예) 음식점
   */
  category_group_name: string;

  /**
   * 전화번호
   */
  phone: string;

  /**
   * 전체 지번 주소
   */
  address_name: string;

  /**
   * 전체 도로명 주소
   */
  road_address_name: string;

  /**
   * X 좌표값 혹은 longitude
   */
  x: string;

  /**
   * Y 좌표값 혹은 latitude
   */
  y: string;

  /**
   * 장소 상세페이지 URL
   */
  place_url: string;

  /**
   * 중심좌표까지의 거리(x,y 파라미터를 준 경우에만 존재). 단위 meter
   */
  distance: string;
};

type ProfileType = {
  id: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  biography?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  provider: 'KAKAO';
};
