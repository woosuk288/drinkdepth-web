import * as React from 'react';
import Autocomplete, {
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import { OutlinedInput } from '@mui/material';

type Props = {
  options: string[];
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function ComboBox({ options, name, handleChange }: Props) {
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
      // id="input-review-country"

      options={options}
      onChange={onChange}
      renderInput={({ InputLabelProps, InputProps, ...params }) => (
        <OutlinedInput
          {...params}
          ref={InputProps.ref}
          name={name}
          size="small"
          // placeholder="asdas"
        />
      )}
    />
  );
}
