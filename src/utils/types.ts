export type CafesPageProps = {
  cafes: CafeType[];
};

export type CafePageProps = {
  cafeIntro: CafeType;
  cafeMenus: CafeMenuType[];
};

export type CafeIntroProps = {
  cafeIntro: CafeType;
};

export type CafeProps = {
  cafe: CafeType;
};

export type CafeType = {
  id: string;
  name: string;
  introduce: string;
  address: string;
  addressY: string;
  addressX: string;
  addressETC: string;
};

export type CafeMenusProps = {
  cafeMenus: CafeMenuType[];
};

export type CafeMenuType = {
  id: string;
  name: string;
  description: string;
  labels: string[];
  imageURL: string;
  price: number;
  category: string;
};

export type CafeMenuCategoryType = {
  label: string;
  value: string;
};

export type MenuDetailProps = {
  item: CafeMenuType;
};
