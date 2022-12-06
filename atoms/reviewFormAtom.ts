import { atom } from 'recoil';

export const defaultCafeMenuReview: CafeMenuReviewType = {
  id: '',
  menuName: '',
  images: [],

  type: '',

  // place:

  keywords: [],
  text: '',
  rating: 0,

  uid: '',
  displayName: '',
  photoURL: '',
  // isPublic: false,
  // followerIds: [],
  // hasFollower: false,
  createdAt: new Date(),
};

export const cafeMenuReviewState = atom<CafeMenuReviewType>({
  key: 'cafeMenuReviewState', // unique ID (with respect to other atoms/selectors)
  default: defaultCafeMenuReview, // default value (aka initial value)
});

export const initCoffeeReview = () => {};
