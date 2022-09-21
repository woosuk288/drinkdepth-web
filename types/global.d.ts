type CafeType = {
  id: string;
  name: string;
  imageURL: string;
  introduce: string;
  address: string;
  addressY: string;
  addressX: string;
  addressETC?: string;
};

type ReviewType = {
  id?: string;
  text: string;
  createdAt: Date | string;
  displayName: string;
  photoURL: string;
  uid: string;
};

type CafeMenuType = {
  id: string;
  cafeId: string;
  name: string;
  description: string;
  labels: string[];
  imageURL: string;
  price: number;
  category: string;
  reviewCount: number;
};

type CafeMenuCategoryType = {
  label: string;
  value: string;
};

type CouponType = {
  id?: string;
  code: string;
  // itemId: string;
  cafeId: string;
  customerId: string;
  typeIssued: 'normal' | 'smart';
  typeUsed?: 'normal' | 'smart';
  isUsed: boolean;
  createdAt: Date | string;
};
type CouponCounterType = {
  total: number;
  normal: number;
  smart: number;
};
