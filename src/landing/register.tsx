import * as React from 'react';
// import Layout from '../src/Layout';
// import Meta from '../src/Meta';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import Layout from '../Layout';
import Meta from '../Meta';
import { useMutation } from '@apollo/client';
import { REGISTER_TEST_MUTATION } from '../../apollo/mutations';
import {
  registerTest,
  registerTestVariables,
} from '../../apollo/__generated__/registerTest';

import * as fbq from '../../facebook/fpixel';

const initContactInfo = {
  ip: '',
  contact: '',
  name: '',
  memo: '',
};

const Register = () => {
  const [contactInfo, setContactInfo] = React.useState(initContactInfo);
  const [registerTest, { data, loading: processing, error }] = useMutation<
    registerTest,
    registerTestVariables
  >(REGISTER_TEST_MUTATION, {
    onCompleted: (result) => {
      if (result.registerTest.ok) {
        setContactInfo(initContactInfo);
        alert('신청 완료.');
      }
      if (result.registerTest.error) {
        alert(result.registerTest.error);
      }
    },
    onError: (error) => {
      console.log('onError : ', error.name);
      console.log('onError : ', error.message);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();

    fbq.event('SubmitApplication', {
      event_name: '사전 알림 신청 제출 버튼',
    });

    fetch('https://jsonip.com', { mode: 'cors' })
      .then((resp) => resp.json())
      .then(({ ip }) => {
        console.log(ip);

        registerTest({ variables: { input: { ...contactInfo, ip } } });
      });
  };

  return (
    <Box
      sx={{
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3rem',
        // minHeight: 600,
      }}
    >
      <Box
        component="form"
        sx={{ width: { xs: '280px', sm: '400px' } }}
        onSubmit={onSend}
        // onSubmit={handleSubmit(onSendSMS)}
      >
        <TextField
          autoComplete="off"
          name="name"
          onChange={handleChange}
          value={contactInfo.name}
          variant="outlined"
          autoFocus
          fullWidth
          // label=""
          placeholder="이름"
          // error={!!errorMsg}
          // helperText={errorMsg}
          disabled={processing}
        />

        <TextField
          autoComplete="off"
          name="contact"
          onChange={handleChange}
          value={contactInfo.contact}
          variant="outlined"
          fullWidth
          // label=""
          placeholder="전화번호 or 이메일"
          required={true}
          // error={!!errorMsg}
          // helperText={errorMsg}
          disabled={processing}
          style={{ marginTop: 8, marginBottom: 8 }}
        />

        <TextField
          autoComplete="off"
          name="memo"
          onChange={handleChange}
          value={contactInfo.memo}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          // label=""
          placeholder="남기실 내용"
          // error={!!errorMsg}
          // helperText={errorMsg}
          disabled={processing}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={processing || contactInfo.contact.length < 11}
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
          완료
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
    </Box>
  );
};

export default Register;
