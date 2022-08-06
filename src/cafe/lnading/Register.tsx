import * as React from 'react';

import { Box, Button, CircularProgress, TextField } from '@mui/material';

import * as fbq from '../../../facebook/fpixel';
import { useMutation } from 'react-query';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebaseInit';

const initContactInfo = {
  ip: '',
  contact: '',
  name: '',
  memo: '',
};

const Register = () => {
  const [contactInfo, setContactInfo] = React.useState(initContactInfo);

  const { data, isLoading, isError, mutate } = useMutation<
    string,
    string,
    RegisterType
  >(mutationRegister);

  // const [registerTest, { data, loading: processing, error }] = useMutation<
  //   registerTest,
  //   registerTestVariables
  // >(REGISTER_TEST_MUTATION, {
  //   onCompleted: (result) => {
  //     if (result.registerTest.ok) {
  //       setContactInfo(initContactInfo);
  //       alert('신청 완료.');
  //     }
  //     if (result.registerTest.error) {
  //       alert(result.registerTest.error);
  //     }
  //   },
  //   onError: (error) => {
  //     console.log('onError : ', error.name);
  //     console.log('onError : ', error.message);
  //   },
  // });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();

    // loading......

    // fbq.event('SubmitApplication', {
    //   event_name: '사전 알림 신청 제출 버튼',
    // });

    const { name, contact, memo } = contactInfo;

    mutate(
      { name, contact, memo },
      {
        onSuccess: (data) => {
          console.log('data : ', data);
        },
      }
    );
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
          // autoFocus
          fullWidth
          // label=""
          placeholder="이름"
          // error={!!errorMsg}
          // helperText={errorMsg}
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading || contactInfo.contact.length < 11}
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
          {isLoading && (
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

type RegisterType = {
  ip?: string;
  contact: string;
  name: string;
  memo: string;
};
async function mutationRegister({ name, contact, memo }: RegisterType) {
  const ip: string = await fetch('https://jsonip.com', { mode: 'cors' })
    .then((resp) => resp.json())
    .then(({ ip }) => {
      console.log(ip);

      return ip;
    });

  // registerTest({ variables: { input: { ...contactInfo, ip } } });

  // create
  await addDoc(collection(db, 'registers'), {
    name,
    contact,
    memo,
    ip,
  });

  return '등록 완료';
}
