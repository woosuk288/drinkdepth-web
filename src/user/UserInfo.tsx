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

import { Box, Button, LinearProgress } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

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
    getComapanies().then(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠어요?')) {
      await signOut(auth);
    }
  };

  if (loading) return <LinearProgress />;

  // if (!userRole ) return <RedirectPage path="/login" />;

  return (
    <Box
      sx={{
        width: {
          xs: '280px',
          sm: '400px',
        },
        '& > div': { marginBottom: '1rem' },
      }}
    >
      {userRole ? (
        <div>
          <div>전화번호</div>
          <div>사업자 등록번호</div>
          <div>대표자성명</div>
          <div>상호</div>
          <div>사업자등록증</div>
        </div>
      ) : (
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          sx={(theme) => ({
            my: '5rem',
            fontSize: 32,
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
