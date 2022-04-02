import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../src/Layout';

import { Badge, Box, LinearProgress, Tab, Tabs } from '@mui/material';

import { useAuthFb } from '../firebase/clientApp';
import UserInfo from '../src/user/UserInfo';
import RedirectPage from '../src/common/RedirectPage';
import BookmarkList from '../src/user/BookmarkList';
import NotificationList from '../src/user/NotificationList';
import { notiBadgeVar } from '../apollo/client';
import { useReactiveVar } from '@apollo/client';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  [x: string]: any;
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
      {value === index && <Box>{children}</Box>}
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
  const [user, loading, error] = useAuthFb();
  const notiBadge = useReactiveVar(notiBadgeVar);

  const [tabValue, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (loading) return <LinearProgress />;
  if (!user) return <RedirectPage path="/login" />;

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

          <Tab
            label={
              <Badge
                color="secondary"
                variant="dot"
                invisible={notiBadge === false}
              >
                알림
              </Badge>
            }
            {...a11yProps(2)}
          />
        </Tabs>
        {/* <Typography variant="h5" fontWeight={700} sx={{ margin: '60px 0' }}>
          내 정보
        </Typography> */}
        <TabPanel value={tabValue} index={0}>
          <UserInfo uid={user.uid} />
        </TabPanel>
        <TabPanel value={tabValue} index={1} style={{ width: '100%' }}>
          <BookmarkList />
        </TabPanel>
        <TabPanel
          value={tabValue}
          index={2}
          style={{ width: '100%', maxWidth: 400 }}
        >
          <NotificationList />
        </TabPanel>
      </Box>
    </Layout>
  );
};

export default User;
