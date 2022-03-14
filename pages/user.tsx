import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../src/Layout';
import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../apollo/client';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import { collection, doc, getDoc, limit, where } from 'firebase/firestore/lite';
import { firestore, useAuthFb } from '../firebase/clientApp';
import UserInfo from '../src/user/UserInfo';
import RedirectPage from '../src/common/RedirectPage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const User: NextPage = () => {
  const router = useRouter();

  const [user, loading, error] = useAuthFb();
  const userRole = useReactiveVar(roleVar);

  const [tabValue, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (loading) return <LinearProgress />;

  // if (!userRole || !user) return <RedirectPage path="/login" />;

  /**
   * TODO: 사업자 인증 안됬을 시 인증하러가기 버튼 login화면 InfoForm 이동
   * 인증 됬을시 정보 보여주기
   */

  return (
    <Layout>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 600,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="primary tabs example"
          sx={{
            marginTop: '1rem',
            marginBottom: '3rem',
          }}
        >
          <Tab label="내 정보" {...a11yProps(0)} />
          <Tab label="찜한 상품" {...a11yProps(1)} />
        </Tabs>
        {/* <Typography variant="h5" fontWeight={700} sx={{ margin: '60px 0' }}>
          내 정보
        </Typography> */}

        <TabPanel value={tabValue} index={0}>
          <UserInfo uid={user.uid} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </Layout>
  );
};

export default User;
