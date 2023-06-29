type CafeType = {
  id: string;
  name: string;
  imageURL: string;
  imageURLs?: string[];
  imageOfflineURLs?: string[];
  introduce: string;
  address: string;
  addressY: string;
  addressX: string;
  addressETC?: string;

  menuCategories: CafeMenuCategoryType[];
};

type B2BReviewType = {
  cafeId: string;
  menuId: string;
  id?: string;
  text: string;
  createdAt: string;
  displayName: string;
  photoURL: string;
  uid: string;
};

type ImagesType = {
  '240x240': string;
  '480x480': string;
  '960x960': string;
};

type CafeMenuType = {
  id: string;
  cafeId: string;
  name: string;
  description: string;
  labels: string[];
  images?: ImagesType;
  price: number;
  categorySeqs: string[];
  categories: string[];
  reviewCount: number;
  ownerComment?: string;
  pairingMenus?: string[];
  disabled?: boolean;
};

type CafeMenuCategoryType = {
  label: string;
  value: string;
};

type CouponNameType =
  | 'normal'
  | 'smart'
  | 'offline_qr'
  | 'offline_qr_tablet'
  | 'etc';

type CouponType = {
  id?: string;
  code: string;
  // itemId: string;
  cafeId: string;
  customerId: string;
  typeIssued: CouponNameType;
  typeUsed?: CouponNameType;
  isUsed: boolean;
  createdAt: string;
};
type CouponCounterType = {
  total: number;
  normal: number;
  smart: number;
};

/**
 * global Window
 */

declare module globalThis {
  var __EMULATORS_STARTED__: boolean;

  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
    grecaptcha: any;
    fbq: any;
    Kakao: any;
    // kakao: any;
    gtag: any;

    ChannelIO?: IChannelIO;
    ChannelIOInitialized?: boolean;
  }
}
