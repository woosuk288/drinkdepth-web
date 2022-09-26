// [gtag.js 이벤트 참조] (https://developers.google.com/tag-platform/gtagjs/reference/events)

import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { DOMAIN_LOCALHOST, DOMAIN_STAGE } from '../constants';
import { app } from './firebaseInit';

export async function getGA() {
  console.info(window.location.hostname);

  const yes = await isSupported();

  if (yes) {
    console.info('google analytics 사용 가능.');
  } else {
    console.error('google analytics가 지원되지 않습니다.');
  }

  if (
    yes &&
    process.env.NODE_ENV === 'production' &&
    window.location.hostname !== DOMAIN_LOCALHOST &&
    window.location.hostname !== DOMAIN_STAGE
  ) {
    console.info('done GA.');
    return getAnalytics(app);
  }
}

export function gaSelectContent(content_type: string, item_id: string) {
  getGA().then((ga) => {
    ga &&
      logEvent(ga, 'select_content', {
        content_type,
        item_id,
      });
  });
}

export function gaShare(method: string, content_type: string, item_id: string) {
  getGA().then((ga) => {
    ga &&
      logEvent(ga, 'share', {
        method,
        content_type,
        item_id,
      });
  });
}

/**
 * 이 이벤트는 목록에서 프로모션이 선택되었음을 나타냅니다.
 * @param creative_name 프로모션 광고 소재의 이름입니다. (예시: summer_banner2)
 * @param creative_slot 상품과 연결된 프로모션 광고 소재 슬롯의 이름입니다. (예시: featured_app_1)
 * @param promotion_name 상품과 연결된 프로모션의 이름입니다. (예시: 여름 세일)
 */
export function gaSelectPromotion(
  creative_name?: string,
  creative_slot?: string,
  promotion_name?: string
) {
  getGA().then((ga) => {
    ga &&
      logEvent(ga, 'select_promotion', {
        creative_name,
        creative_slot,
        promotion_name,
      });
  });
}

/**
 * 이 이벤트는 사용자가 계정에 가입했음을 나타냅니다. 이 이벤트를 사용하여 로그인 및 로그아웃한 사용자의 다양한 동작을 이해할 수 있습니다.
 * @param method 가입에 사용되는 방법입니다. (예시: Google)
 */
export function gaSignUp(method: string) {
  getGA().then((ga) => {
    ga &&
      logEvent(ga, 'sign_up', {
        method,
      });
  });
}

//
// custom
//

export function gaClickNaverMap(
  event_name: string,
  item_name: string,
  place_name: string
) {
  getGA().then((ga) => {
    ga &&
      logEvent(ga, event_name, {
        item_name,
        place_name,
      });
  });
}

export function gaClickMarkerFromClusterer(
  item_name: string,
  place_name: string
) {
  getGA().then((ga) => {
    ga &&
      logEvent(ga, 'click_marker_from_clusterer', {
        item_name,
        place_name,
      });
  });
}
