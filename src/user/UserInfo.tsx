import React, { useState } from 'react';
import { firestore } from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore/lite';
import { Box, Button, LinearProgress } from '@mui/material';
import { Company } from '../types';
import { converter } from '../../firebase/converter';

type UserInfoProps = {
  uid: string;
};

const COMPANIES = 'companies';
const companyCollection = collection(firestore, COMPANIES);

function UserInfo({ uid }: UserInfoProps) {
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

  if (loading) return <LinearProgress />;

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
      <div>전화번호</div>
      <div>사업자 등록번호</div>
      <div>대표자성명</div>
      <div>상호</div>
      <div>사업자등록증</div>

      <Button
        fullWidth
        variant="outlined"
        color="inherit"
        aria-label="ask for sign-out"
        sx={{ marginTop: '3rem' }}
      >
        로그아웃
      </Button>
    </Box>
  );
}

export default UserInfo;
