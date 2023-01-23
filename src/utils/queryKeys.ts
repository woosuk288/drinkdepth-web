export const FETCH_FLAVOR_WHEELS_KEY = 'fetch_flavor_wheels_key';

export const FETCH_MY_REVIEWS_KEY = 'fetch_my_reviews_key';
export const FETCH_THUMB_REVIEWS_KEY = 'fetch_thumb_reviews_key';

export const FETCH_REVIEWS_KEY = (searchAddress: string) =>
  'fetch_reviews_key' + '_' + searchAddress;
export const FETCH_REVIEW_KEY = (reviewId: string) =>
  'fetch_review_key' + '_' + reviewId;

export const FETCH_PROFILE_KEY = (profileId: string) =>
  'fetch_profile_key' + '_' + profileId;

export const FETCH_MY_BADGES_KEY = (profileId: string) =>
  'fetch_my_badges_key' + '_' + profileId;

export const FETCH_REVIEW_THUMB_KEY = (reviewId: string) =>
  'fetch_review_thumb_key' + '_' + reviewId;

export const FETCH_MANIA_CAFES_KEY = 'fetch_mania_cafes_key';
