export const FETCH_FLAVOR_WHEELS_KEY = 'fetch_flavor_wheels_key';

export const FETCH_REVIEWS_KEY = 'fetch_reviews_key';
export const FETCH_REVIEW_COUNT_KEY = 'fetch_review_count_key';
export const FETCH_MY_REVIEW_COUNT_KEY = 'fetch_my_review_count_key';
export const FETCH_MY_REVIEWS_KEY = 'fetch_my_reviews_key';
export const FETCH_REVIEW_KEY = (reviewId: string) =>
  'fetch_review_key' + '_' + reviewId;

export const FETCH_PROFILE_KEY = (profileId: string) =>
  'fetch_profile_key' + '_' + profileId;

export const FETCH_MY_BADGES_KEY = (profileId: string) =>
  'fetch_my_badges_key' + '_' + profileId;
