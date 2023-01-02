import proj4 from 'proj4';

export const clipText = (text: string, minLenth: number) => {
  const idx = text.indexOf('\n', minLenth);

  if (idx === -1 || text.length < minLenth) {
    return text;
  } else {
    return text.slice(0, idx);
  }
};

// 네이버 지도는 EPSG:3857 좌표계를 사용
export function makeNaverMapURL(cafeName: string, x: string, y: string) {
  const p = proj4('EPSG:4326', 'EPSG:3857');
  const position = p.forward([parseFloat(x), parseFloat(y)]);

  return `https://map.naver.com/v5/search/${cafeName}?c=${position[0]},${position[1]},15,0,0,0,dh`;
}

export const makeGoogleMapURL = (parameter: string) => {
  return `https://www.google.com/maps/search/?api=1&query=${parameter}`;
};

export const createAnchorAndClick = (url: string) => {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.click();
};
