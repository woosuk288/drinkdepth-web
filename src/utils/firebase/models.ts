export const COUPONS = 'coupons';
export type CouponType = {
  id: string;
  code: string;
  // itemId: string;
  cafeId: string;
  customerId: string;
  type: 'normal' | 'smart';
  isUsed: boolean;
  createdAt: Date;
};
export type CouponCounterType = {
  total: number;
  normal: number;
  smart: number;
};

export const COUPON_COUNTER = '###counter###';
