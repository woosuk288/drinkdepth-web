export type CafePageProps = {
  cafeIntro: CafeIntroType;
  cafeMenus: CafeMenuType[];
};

export type CafeIntroProps = {
  cafeIntro: CafeIntroType;
};

export type CafeIntroType = {
  name: string;
  address: string;
  addressY: string;
  addressX: string;
  addressWithSubway: string;
  addressLink: string;
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
