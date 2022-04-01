import React, { useState } from 'react';
import { auth, firestore } from '../../firebase/clientApp';
import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore/lite';
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

import { Company } from '../types';
import { converter } from '../../firebase/converter';
import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../../apollo/client';
import Link from '../../src/Link';

type UserInfoProps = {
  uid: string;
};

const COMPANIES = 'companies';
const companyCollection = collection(firestore, COMPANIES);

function UserInfo({ uid }: UserInfoProps) {
  const userRole = useReactiveVar(roleVar);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [show, setShow] = useState({
    phone: false,
    // opening_date: false,
  });

  const handleClickShow = (key: string) => {
    setShow((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const getComapanies = async () => {
    const companyQuery = query(
      companyCollection,
      where('uid', '==', uid),
      limit(1)
    );

    const querySnapshot = await getDocs(companyQuery);

    const companies = querySnapshot.docs.map((d) => ({
      id: d.id,
      ...converter(d.data()),
    }));

    console.log('companies : ', companies);
    setCompanies(companies as Company[]);
  };

  React.useEffect(() => {
    uid && getComapanies().then(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠어요?')) {
      await signOut(auth);
      roleVar(null);
    }
  };

  if (loading) return <LinearProgress />;

  const company = companies.length > 0 ? companies[0] : null;

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
