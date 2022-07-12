export const COUPONS = 'coupons';
export type COUPON_TYPE = {
  id: string;
  code: string;
  // itemId: string;
  cafeId: string;
  customerId: string;
  type: 'normal' | 'smart';
  isUsed: boolean;
  createdAt: Date;
};
