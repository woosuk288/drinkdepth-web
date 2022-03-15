/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { auth } from '../../firebase/clientApp';

interface IPhoneNumberFormProps {
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>;
}

type IPhoneNumberForm = {
  phoneNumber: string;
};

function PhoneNumberForm({ setIsSent }: IPhoneNumberFormProps) {
  const { handleSubmit, control } = useForm<IPhoneNumberForm>();
  const phoneNumber = useWatch({
    control,
    name: 'phoneNumber',
    defaultValue: '',
  });

  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSendSMS = async (data: IPhoneNumberForm) => {
    setErrorMsg('');
    setProcessing(true);
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'load-invisible-recaptcha',
        {
          size: 'invisible',
          callback: (/* response: any */) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // console.log("window.grecaptcha : ", window.grecaptcha);
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            console.log('expired-callback : ');
            setErrorMsg('인증 시간이 만료됐습니다. 다시 시도해주세요.');
          },
        },
        auth
      );
    }

    try {
      // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult.confirm(code).
      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        '+82' + data.phoneNumber,
        window.recaptchaVerifier
      );
      setIsSent(true);
    } catch (error: any) {
      // Error; SMS not sent
      // ...
      console.log('error : ', error);
      if (error.code === 'auth/invalid-phone-number') {
        setErrorMsg('번호를 다시 확인해주세요.');
      }

      window.recaptchaVerifier
        .render()
        .then(function (widgetId) {
          window.grecaptcha.reset(widgetId);
        })
        .catch((error) => {
          console.log('error : ', error);
          setErrorMsg('리캡챠를 불러오는 중 오류 발생.');
        });
    }
    setProcessing(false);
  };

  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ margin: '60px 0' }}>
        전화번호 간편 가입
      </Typography>
      <Box
        component="form"
        sx={{ width: { xs: '280px', sm: '400px' } }}
        onSubmit={handleSubmit(onSendSMS)}
      >
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field /* , fieldState, formState */ }) => (
            <TextField
              autoComplete="off"
              onChange={field.onChange}
              value={field.value}
              variant="standard"
              autoFocus
              fullWidth
              // label=""
              placeholder="01012345678"
              type="tel"
              required={true}
              error={!!errorMsg}
              helperText={errorMsg}
              disabled={processing}
              sx={{
                '& .MuiInputBase-input': {
                  textAlign: 'center',
                },
              }}
            />
          )}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={processing || phoneNumber.length < 11}
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
          다음
          {processing && (
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
}

export default PhoneNumberForm;
