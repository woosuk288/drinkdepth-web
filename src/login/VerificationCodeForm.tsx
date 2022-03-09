/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'

import { Box, Button, CircularProgress, TextField } from '@mui/material'

interface IVerificationCodeForm {
  verificationCode: string
}

export const VerificationCodeForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { handleSubmit, control } = useForm<IVerificationCodeForm>()
  const verificationCode = useWatch({
    control,
    name: 'verificationCode',
    defaultValue: '',
  })

  const onSignInSubmit = async (data: IVerificationCodeForm) => {
    setError('')
    setLoading(true)
    try {
      const result = await window.confirmationResult.confirm(
        data.verificationCode
      )
      // User signed in successfully.
      const user = result.user
      // triiger AuthGuard automatically by an created user.
    } catch (error: any) {
      setLoading(false)
      // User couldn't sign in (bad verification code?)
      // ...

      console.log('error : ', error)
      if (error.code === 'auth/invalid-verification-code') {
        setError('인증 코드를 다시 확인하세요.')
      } else if (error.code === 'auth/code-expired') {
        setError('인증 코드가 만료되었습니다.')
      }
    }
  }

  return (
    <Box
      component="form"
      sx={{ width: { xs: '280px', sm: '400px' } }}
      onSubmit={handleSubmit(onSignInSubmit)}
    >
      <Controller
        name="verificationCode"
        control={control}
        rules={{ required: true }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            onChange={field.onChange}
            value={field.value}
            autoFocus
            fullWidth
            label="인증 번호"
            type="tel"
            required={true}
            error={!!error}
            helperText={error}
            disabled={loading}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center',
              },
            }}
          />
        )}
      />
      <Button
        size="small"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading || verificationCode.length < 6}
        type="submit"
        sx={{
          marginTop: '0.5rem',
          fontWeight: 600,
          '&:disabled': {
            backgroundColor: '#4f9cff4d',
            color: '#fff',
          },
        }}
      >
        로그인 완료
        {loading && <CircularProgress size={24} />}
      </Button>
    </Box>
  )
}

export default VerificationCodeForm
