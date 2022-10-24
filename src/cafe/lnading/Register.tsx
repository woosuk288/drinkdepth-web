import * as React from 'react';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from '@mui/material';

// import * as fbq from '../../../facebook/fpixel';
import { useMutation } from 'react-query';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'src/firebase/services';

import { useRecoilState } from 'recoil';
import { landingFormState } from '../../../atoms/landingFormAtom';

const initContactInfo = {
  ip: '',
  contact: '',
  name: '',
  memo: '',
};

const Register = () => {
  const [landingForm] = useRecoilState(landingFormState);
  const [contactInfo, setContactInfo] = React.useState(initContactInfo);

  const { data, isLoading, isError, mutate } = useMutation<
    string,
    string,
    RegisterType
  >(mutationRegister);

  const [open, setOpen] = React.useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();

    // fbq.event('SubmitApplication', {
    //   event_name: '사전 알림 신청 제출 버튼',
    // });

    const { name, contact, memo } = contactInfo;

    mutate(
      { name, contact, memo, ...landingForm },
      {
        onSuccess: (data) => {
          setOpen(true);
          setContactInfo(initContactInfo);
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

      <Snackbar
        open={open}
        color="white"
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleClose}
          variant="outlined"
          severity="info"
          sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
          <AlertTitle>성공</AlertTitle>
          신청이 완료되었습니다.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;

type RegisterType = {
  ip?: string;
  contact: string;
  name: string;
  memo: string;

  // for GA
  applyBtn?: boolean;
  moneyBtn?: boolean;
};
async function mutationRegister({
  name,
  contact,
  memo,
  applyBtn,
  moneyBtn,
}: RegisterType) {
  const ip: string = await fetch('https://jsonip.com', { mode: 'cors' })
    .then((resp) => resp.json())
    .then(({ ip }) => {
      return ip;
    });

  // create
  await addDoc(collection(db, 'registers'), {
    name,
    contact,
    memo,
    ip,
    applyBtn,
    moneyBtn,
  });

  return '등록 완료';
}
