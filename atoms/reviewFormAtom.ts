import { atom } from 'recoil';

export const defaultCafeMenuReview: DReviewType = {
  id: '',
  menuName: '',
  images: [],

  type: '',

  // place:

  keywords: [],
  text: '',
  rating: 0,

  profile: {
    uid: '',
    displayName: '',
    photoURL: '',
    badgeIds: [],
  },
  // isPublic: false,
  // followerIds: [],
  // hasFollower: false,
  createdAt: new Date().toISOString(),
};

export const cafeMenuReviewState = atom<DReviewType>({
  key: 'cafeMenuReviewState', // unique ID (with respect to other atoms/selectors)
  default: defaultCafeMenuReview, // default value (aka initial value)
});

export const initCoffeeReview = () => {};
