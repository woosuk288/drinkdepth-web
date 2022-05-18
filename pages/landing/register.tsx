import * as React from 'react';
import type { NextPage } from 'next';
// import Layout from '../src/Layout';
// import Meta from '../src/Meta';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import Layout from '../../src/Layout';
import Meta from '../../src/Meta';
import { useMutation } from '@apollo/client';
import { REGISTER_TEST_MUTATION } from '../../apollo/mutations';
import {
  registerTest,
  registerTestVariables,
} from '../../apollo/__generated__/registerTest';

import { useAuthFb } from '../../firebase/clientApp';

const metaData = {
  title: '깊이를 마시다',
  description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
  image: '/images/logo_name.png',
};

const Register: NextPage = () => {
  useAuthFb();

  const [contact, setContact] = React.useState<string>('');
  const [registerTest, { data, loading: processing, error }] = useMutation<
    registerTest,
    registerTestVariables
  >(REGISTER_TEST_MUTATION, {
    onCompleted: (result) => {
      if (result.registerTest.ok) {
        setContact('');
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
    setContact(event.target.value);
  };

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('https://jsonip.com', { mode: 'cors' })
      .then((resp) => resp.json())
      .then(({ ip }) => {
        console.log(ip);

        registerTest({ variables: { input: { ip, contact } } });
      });
  };

  return (
    <Layout>
      <Meta data={metaData} />

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 600,
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ margin: '60px 0' }}>
          사전 알림 신청
        </Typography>

        <Box
          component="form"
          sx={{ width: { xs: '280px', sm: '400px' } }}
          onSubmit={onSend}
          // onSubmit={handleSubmit(onSendSMS)}
        >
          <TextField
            autoComplete="off"
            onChange={handleChange}
            value={contact}
            variant="standard"
            autoFocus
            fullWidth
            // label=""
            placeholder="전화번호 or 이메일"
            required={true}
            // error={!!errorMsg}
            // helperText={errorMsg}
            disabled={processing}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center',
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={processing || contact.length < 11}
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
    </Layout>
  );
};

export default Register;
