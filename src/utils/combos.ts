import {
  DOMAIN_DEFAULT,
  DOMAIN_OFFLINE_QR,
  DOMAIN_OFFLINE_QR_TABLET,
  DOMAIN_WWW,
  NORMAL,
  OFFLINE_QR,
  OFFLINE_QR_TABLET,
  SMART,
} from './constants';

export const labelFromOneToFive = (value: number) => {
  switch (value) {
    case 1:
      return '매우 낮음';
    case 2:
      return '낮음';
    case 3:
      return '보통';
    case 4:
      return '높음';
    case 5:
      return '매우 높음';
    default:
      return '';
  }
};

export const valueFromLowToHigh = (label: string) => {
  switch (label) {
    case '매우 낮음':
      return 1;
    case '낮음':
      return 2;
    case '보통':
      return 3;
    case '높음':
      return 4;
    case '매우 높음':
      return 5;
    default:
      return 0;
  }
};

export const getTestType = () => {
  const hostname = window.location.hostname;

  const type =
    hostname === DOMAIN_DEFAULT
      ? NORMAL
      : hostname === DOMAIN_WWW
      ? SMART
      : hostname === DOMAIN_OFFLINE_QR
      ? OFFLINE_QR
      : hostname === DOMAIN_OFFLINE_QR_TABLET
      ? OFFLINE_QR_TABLET
      : 'etc';
  return type;
};

export const getLabelWithColor = (name: string) => {
  const labelingColors = [
    {
      label: '라이트로스팅',
      color: '#9d5433',
    },
    {
      label: '미디엄로스팅',
      color: '#692a19',
    },
    {
      label: '다크로스팅',
      color: '#470604',
    },
    {
      label: '산미약함',
      color: '#e1c315',
    },
    {
      label: '산미보통',
      color: '#fde404',
    },
    {
      label: '산미높음',
      color: '#faef07',
    },
    {
      label: '부드러운',
      color: '#e9b762',
    },
    // {
    //   label: '우유',
    //   color: '#fcfce0',
    // },
    // {
    //   label: '달콤한',
    //   color: '#fcfce0',
    // },
    {
      label: '고소함',
      color: '#894810',
    },
    {
      label: '고소',
      color: '#894810',
    },
    {
      label: '얼그레이',
      color: '#975e6d',
    },
    {
      label: '민트',
      color: '#9ee2ec',
    },
    {
      label: '자스민',
      color: '#f7f1bd',
    },
    {
      label: '오렌지 껍질 향',
      color: '#e2631e',
    },
    {
      label: '홍차',
      color: '#975e6d',
    },
    {
      label: '박하사탕',
      color: '#9ee2ec',
    },
    {
      label: '레몬그라스',
      color: '#fde404',
    },
    {
      label: '꽃',
      color: '#da0d68',
    },
    {
      label: '화함',
      color: '#9ee2ec',
    },
    {
      label: '기름진',
      color: '#a2b029',
    },
    {
      label: '라즈베리',
      color: '#e62969',
    },
    {
      label: '바닐라',
      color: '#f89a80',
    },
    {
      label: '과일',
      color: '#da1d23',
    },
    {
      label: '땅콩',
      color: '#d4ad12',
    },
    {
      label: '완두콩',
      color: '#62aa3c',
    },
    {
      label: '유기농 귀리',
      color: '#ddaf61',
    },
    {
      label: '유기농 통밀',
      color: '#eb9d5f',
    },
    {
      label: '바닐라',
      color: '#f89a80',
    },
    {
      label: '누룽지 사탕',
      color: '#894810',
    },
    {
      label: '피넛 브리틀',
      color: '#d4ad12',
    },
    {
      label: '꿀',
      color: '#da5c1f',
    },
    {
      label: '초콜릿',
      color: '#692a19',
    },
    {
      label: '유기농 설탕',
      color: '#d45a59',
    },
    {
      label: '프랑스 다크 초콜릿',
      color: '#470604',
    },
    {
      label: '새콤달콤',
      color: '#da1d23',
    },
    {
      label: '발효',
      color: '#ba9232',
    },
    {
      label: '탄산',
      color: '#794752',
    },
  ];

  return (
    labelingColors.find((colorLabel) => colorLabel.label === name) || {
      label: name,
      color: 'rgba(0, 0, 0, 0.26)',
    }
  );
};
