import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, RegisterOptions } from 'react-hook-form'
import React from 'react'

type FormInputTextProps = TextFieldProps & {
  control: Control<any, any>
  name: string
  defaultValue?: string
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  [x: string]: any
}

export const FormInputText = ({
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
        <TextField onChange={field.onChange} value={field.value} {...props} />
      )}
    />
  )
}
