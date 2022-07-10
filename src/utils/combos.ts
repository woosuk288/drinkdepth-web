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
