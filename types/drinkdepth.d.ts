type CafeMenuReviewType = {
  id: string;
  name: string;
  images: [];
  caption: '';
  flavors: string[];

  // cafe: {
  // 	address: string, // 주소
  // 	도, 시, 구, 동
  // 	x: number, // 위도 lat
  // 	y: number, // 경도 lng
  // 	cafeName: string,
  // 	// cafeId: '나중에 생기고 정리되어질 때 넣기',
  // 	tags?: string[]
  // },

  coffee?: {
    acidity?: string;
    sweetness?: string;
    tastingNote?: string[];
    rating?: number | null;
  };
  // desert: {
  // 	pair?: boolean,
  // 	pairRating?: string,
  // 	flavors?: string[],
  // },

  // comment: string, // 한줄평?

  uid: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
  updatedAt?: Date;
};
