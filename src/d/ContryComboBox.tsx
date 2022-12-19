import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import { OutlinedInput } from '@mui/material';

type Props = {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function ContryComboBox({ name, handleChange }: Props) {
  const onChange = (
    e: React.SyntheticEvent<Element, Event>,
    value: any,
    r: AutocompleteChangeReason,
    d: any
  ) => {
    // console.log('e : ', e);
    // console.log('value : ', value);
    // console.log('r : ', r);
    // console.log('d : ', d);

    handleChange({
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Autocomplete
      disablePortal
      id="input-review-country"
      options={coffeeCountries}
      onChange={onChange}
      renderInput={({ InputLabelProps, InputProps, ...params }) => (
        <OutlinedInput
          {...params}
          ref={InputProps.ref}
          name={name}
          size="small"
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const coffeeCountries = [
//   { label: '에티오피아', eng: 'Ethiopia' },
//   { label: '케냐', eng: 'Kenya' },
//   { label: '브라질', eng: 'Brazil' },
//   { label: '콜롬비아', eng: 'Colombia' },
//   { label: '과테말라', eng: 'Guatemala' },
//   { label: '베트남', eng: 'Vietnam' },
//   { label: '인도네시아', eng: 'Indonesia' },
//   { label: '인도', eng: 'India' },
// ];

const coffeeCountries = [
  '에티오피아',
  '콜롬비아',
  '브라질',
  '케냐',
  '과테말라',
  '코스타리카',
  '에콰도르',
  '엘살바도르',
  '파푸아뉴기니',
  '페루',
  '파나마',
  '온두라스',
  '르완다',
  '인도',
  '인도네시아',
  '베트남',
];
