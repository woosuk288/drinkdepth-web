import React, { useState } from 'react';
import { auth } from '../../firebase/clientApp';

import { signOut } from 'firebase/auth';

import {
  Box,
  Button,
  InputAdornment,
  LinearProgress,
  TextField,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useQuery, useReactiveVar } from '@apollo/client';
import { roleVar } from '../../apollo/client';
import Link from '../../src/Link';
import { COMPANY_QUERY } from '../../apollo/queries';
import { Company } from '../../apollo/__generated__/Company';

type UserInfoProps = {
  uid: string;
};

function UserInfo({ uid }: UserInfoProps) {
  const userRole = useReactiveVar(roleVar);

  const { data, loading, error } = useQuery<Company>(COMPANY_QUERY);

  const [show, setShow] = useState({
    phone: false,
    // opening_date: false,
  });

  const handleClickShow = (key: string) => {
    setShow((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠어요?')) {
      await signOut(auth);
      roleVar(null);
    }
  };

  if (loading) return <LinearProgress />;
  if (error) return <div>{error.message}</div>;

  const company = data?.company.company;

  return (
    <Box
      sx={{
        width: {
          xs: '280px',
          sm: '400px',
        },
        textAlign: 'center',
        '& > div': { marginBottom: '1rem' },
      }}
    >
      {userRole && company ? (
        <>
          <TextField
            label="전화번호"
            fullWidth
            value={company.telephone}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => handleClickShow('phone')}
                >
                  {show.phone ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
            type={show.phone ? 'text' : 'password'}
          />
          <TextField
            label="사업자 등록번호"
            fullWidth
            value={company.business_number}
          />
          <TextField
            label="대표자성명"
            fullWidth
            value={company.president_name}
          />
          <TextField label="상호" fullWidth value={company.company_name} />
          <TextField
            label="개업년월일"
            fullWidth
            value={company.opening_date}
          />

          <div>사업자등록증</div>
        </>
      ) : (
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          sx={(theme) => ({
            my: '5rem',
            fontSize: 28,
            maxWidth: '300px',
            [theme.breakpoints.down('sm')]: {
              fontSize: 24,
            },
          })}
          startIcon={
            <BusinessIcon
              sx={(theme) => ({
                marginRight: '0.5rem',
                fontSize: 32,
                [theme.breakpoints.down('sm')]: {
                  fontSize: 24,
                },
              })}
            />
          }
          component={Link}
          href="/login"
        >
          사업자 인증하기
        </Button>
      )}

      <Box sx={{ margin: 'auto', marginTop: '5rem', textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="inherit"
          aria-label="ask for sign-out"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </Box>
    </Box>
  );
}

export default UserInfo;
