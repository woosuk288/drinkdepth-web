import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, RegisterOptions } from 'react-hook-form'
import React from 'react'

type FormInputDateProps = TextFieldProps & {
  control: Control<any, any>
  name: string
  defaultValue?: string
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  [x: string]: any
}

export const FormInputDate = ({
  control,
  name,
  defaultValue = '',
  rules,
  ...props
}: FormInputDateProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <TextField
          type="date"
          onChange={field.onChange}
          value={field.value}
          InputLabelProps={{
            shrink: true,
          }}
          {...props}
        />
      )}
    />
  )
}
