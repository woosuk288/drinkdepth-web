export type CafesPageProps = {
  cafes: CafeIntroType[];
};

export type CafePageProps = {
  cafeIntro: CafeIntroType;
  cafeMenus: CafeMenuType[];
};

export type CafeIntroProps = {
  cafeIntro: CafeIntroType;
};

export type CafeIntroType = {
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
