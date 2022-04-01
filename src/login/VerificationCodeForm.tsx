/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { Role, roleVar, userVar } from '../../apollo/client';
import { USER_ROLES } from '../constants';

interface IVerificationCodeForm {
  verificationCode: string;
}

export const VerificationCodeForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { handleSubmit, control } = useForm<IVerificationCodeForm>();
  const verificationCode = useWatch({
    control,
    name: 'verificationCode',
    defaultValue: '',
  });

  const onSignInSubmit = async (data: IVerificationCodeForm) => {
    setError('');
    setLoading(true);
    try {
      const result = await window.confirmationResult.confirm(
        data.verificationCode
      );
      // User signed in successfully.
      const user = result.user;
      userVar(user);

      // triiger AuthGuard automatically by an created user.

      // role이 있으면 '/' 이동. 아니면 '/login'의 InfoForm 보여줌
      const idTokenResult = await user.getIdTokenResult(true);
      const role = Object.keys(idTokenResult.claims).find((c) =>
        USER_ROLES.includes(c)
      );
      roleVar(role as Role);
    } catch (error: any) {
      setLoading(false);
      // User couldn't sign in (bad verification code?)
      // ...

      console.log('error : ', error);
      if (error.code === 'auth/invalid-verification-code') {
        setError('인증 코드를 다시 확인하세요.');
      } else if (error.code === 'auth/code-expired') {
        setError('인증 코드가 만료되었습니다.');
      }
    }
  };

  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ margin: '60px 0' }}>
        인증 코드 입력
      </Typography>
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
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Button>
      </Box>
    </>
  );
};

export default VerificationCodeForm;
