import { logEvent } from 'firebase/analytics';
import { analytics } from './firebaseInit';

export async function getGA() {
  if (!analytics) {
    console.error('google analytics가 지원되지 않습니다.');
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('ENV : ', process.env.NODE_ENV);
  }

  if (analytics && process.env.NODE_ENV === 'production') {
    return analytics;
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
