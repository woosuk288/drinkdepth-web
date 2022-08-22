import { atom } from 'recoil';

export const landingFormState = atom({
  key: 'landingFormState',
  default: {
    applyBtn: false,
    moneyBtn: false,
  },
});
