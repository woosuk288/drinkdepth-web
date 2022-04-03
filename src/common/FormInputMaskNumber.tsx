import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import React from 'react';
import NumberFormat from 'react-number-format';

type FormInputTextProps = TextFieldProps & {
  control: Control<any, any>;
  name: string;
  defaultValue?: string;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  [x: string]: any;
};

export const FormInputMaskNumber = ({
  control,
  name,
  defaultValue = '',
  rules,
  ...props
}: FormInputTextProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        // <TextField
        //   onChange={field.onChange}
        //   value={field.value ?? ""}
        //   {...props}
        // />
        // @ts-ignore
        <NumberFormat
          {...props}
          value={field.value ?? ''}
          onChange={field.onChange}
          customInput={TextField}
          format="### - ## - #####"
        />
      )}
    />
  );
};
