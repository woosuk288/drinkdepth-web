import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { OutlinedInput } from '@mui/material';

export default function ContryComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="input-review-country"
      options={coffeeCountries}
      renderInput={({ InputLabelProps, InputProps, ...params }) => (
        <OutlinedInput {...params} ref={InputProps.ref} size="small" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const coffeeCountries = [
  { label: '에티오피아', eng: 'Ethiopia' },
  { label: '케냐', eng: 'Kenya' },
  { label: '브라질', eng: 'Brazil' },
  { label: '콜롬비아', eng: 'Colombia' },
  { label: '과테말라', eng: 'Guatemala' },
  { label: '베트남', eng: 'Vietnam' },
  { label: '인도네시아', eng: 'Indonesia' },
  { label: '인도', eng: 'India' },
];
