import * as React from 'react';
import type { NextPage } from 'next';

// import Meta from '../src/Meta';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import TagIcon from '@mui/icons-material/Tag';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';

import Layout from '../src/Layout';
import Meta from '../src/Meta';

import Image from 'next/image';
import Register from '../src/landing/register';
import * as fbq from '../facebook/fpixel';
import { KakaoShareButton } from '../src/landing/KakaoShareButton';

const metaData = {
  title: '깊이를 마시다',
  description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
  image: '/images/logo_name.png',
};

const Landing: NextPage = () => {
  const handleScroll = (e: any) => {
    console.log('window.scrollY : ', window.scrollY);

    // if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return

    console.log('document.body.scrollHeight : ', document.body.scrollHeight);

    const register_form_location = (
      document.querySelector('#register_form_location') as any
    ).offsetTop!;

    console.log('register_form_location : ', register_form_location);

    window.scrollTo({
      top: register_form_location,
      behavior: 'smooth',
    });

    fbq.event('Schedule', { event_name: '사전 알림 신청 이미지 클릭' });
  };

  return (
    <Layout>
      <Meta data={metaData} />

      <Box display="flex" flexDirection={'column'} paddingX="1rem">
        {/* first */}
        <Box
          height="calc(100vh - 56px)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <span style={{ flex: 1 }} />
          <Typography
            variant="h3"
            fontWeight={'bold'}
            align="center"
            // color="primary"
          >
            우리 카페만의 특별한 원두
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{ marginTop: '3rem', marginBottom: '0.5rem' }}
          >
            드링크뎁스는 수수료 제로의 음료 마켓 플레이스입니다.
          </Typography>
          <Typography variant="h6" align="center">
            국내 유명 로스터리들의 개성있고 특별한 원두를 최저가로 도입해
            보세요.
          </Typography>

          <span style={{ flex: 1 }} />
          <Box textAlign="center">
            <Button
              variant="contained"
              sx={{
                padding: ' 1rem 3rem',
                borderRadius: '30px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
              onClick={handleScroll}
            >
              사전 알림 신청
            </Button>
          </Box>
          <span style={{ flex: 1 }} />
        </Box>

        {/* second */}
        <Box>
          <Box
            width="100%"
            position={'relative'}
            sx={{
              '&::after': {
                content: '""',
                display: 'block',
                paddingBottom: '75%',
              },
            }}
          >
            <Box
              position="absolute"
              left="-1rem"
              width="calc(100% + 2rem)"
              height="100%"
            >
              <Image
                src="/images/coffee_bean.png"
                alt="landing-2"
                width={1080}
                height={779}
              />
            </Box>
          </Box>

          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              marginTop: '2rem',
              bgcolor: 'background.paper',
              '.MuiListItemText-primary': {
                fontSize: '1.5rem',
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: '0.5rem',
              },
              '.MuiListItemText-secondary': {
                fontSize: '1rem',
              },
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'primary.main' }}>Q</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="유명 카페는 왜 꾸준하게 고객이 많을까요?"
                secondary={'단골고객 유치에는 음료의 퀄리티와 맛이 기본입니다.'}
              />
            </ListItem>
          </List>

          {/* <Box marginTop={'3rem'} marginBottom={'2rem'}>
            <Image
              src={'/images/coffee_why_text.png'}
              alt="coffee_review"
              width={684}
              height={144}
            />
          </Box> */}

          <Image
            src={'/images/coffee_review.png'}
            alt="coffee_review"
            width={860}
            height={1100}
          />

          <Typography
            variant="h6"
            fontWeight="400"
            align="center"
            sx={{ marginTop: '6rem' }}
          >
            카페 시장이 과열됨에 따라 차별화된 커피의 맛이 단골 손님을 유치
            하는데 기본이 되고 있습니다.
          </Typography>
          <Typography
            variant="h6"
            fontWeight="400"
            align="center"
            sx={{ marginTop: '1rem' }}
          >
            실제로 커피전문점 이용시 커피의 맛을 가장 중요하게 보고 있습니다.
          </Typography>
          <div></div>

          <Box display="flex" justifyContent={'center'}>
            <Image
              src="/images/coffee_flavor.png"
              alt="landing-2"
              width={222}
              height={318}
            />
          </Box>

          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            sx={{ marginTop: '5rem', marginBottom: '1.5rem' }}
          >
            드링크뎁스를
            <div>왜 이용해야 할까요?</div>
          </Typography>

          <Typography variant="h6" fontWeight="400" align="center" gutterBottom>
            커피 전문점 이용시 음료 맛을 가장 중요하게 봄에 따라 원재료의
            중요성이 높아졌습니다.
          </Typography>
          <Typography variant="h6" fontWeight="400" align="center">
            그에 따라 획기적인 기능과 수수료 없는 서비스를 이용해 보세요
          </Typography>

          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              marginTop: '2rem',
              bgcolor: 'background.paper',
              '.MuiListItemText-primary': {
                fontSize: '1.5rem',
                fontWeight: 600,
              },
              '.MuiListItemText-secondary': {
                fontSize: '1rem',
              },
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'primary.main' }}>
                  <TagIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="데이터 해시태그 검색"
                secondary={
                  '원두 해시태그 기반 검색으로 전국 유명 로스터리의 커피를 우리 카페 컨셉에 맞게 도입해 보세요.'
                }
              />
            </ListItem>
            {/* <Divider variant="inset" component="li" /> */}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#6AD7FF' }}>
                  <MoneyOffIcon />
                </Avatar>
              </ListItemAvatar>
              {/* <ListItemButton>
                <ListItemIcon>
                  <MoneyOffIcon color="primary" fontSize="large" />
                </ListItemIcon>
              </ListItemButton> */}
              <ListItemText
                primary="최저가 보장"
                secondary={
                  '군더더기를 뺀 수수료 0%의 공유 마켓 플레이스기 때문에 최저가로 제공이 가능합니다.'
                }
              />
            </ListItem>
            {/* <Divider variant="inset" component="li" /> */}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'secondary.main' }}>
                  <CoffeeMakerIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="맞춤 레시피"
                secondary={
                  '로스터리 제작자들의 원재료 맞춤 공유 레시피로 개성을 살려보세요.'
                }
              />
            </ListItem>
          </List>
        </Box>

        {/* third */}

        <Box
          marginTop="3rem"
          padding="100px 1rem"
          marginLeft="-1rem"
          width="calc(100% + 2rem)"
          sx={{
            background:
              'linear-gradient(to bottom, rgba(106,215,255,1) 0%, rgba(79,156,255,0.7) 30%, rgba(0,0,0,0) 100%)',
          }}
        >
          <Typography
            variant="h5"
            fontWeight={'bold'}
            align="center"
            color="white"
          >
            원재료의 개성으로 손님에게 특별한 가치를 공유하고 싶으시다면?
          </Typography>

          <Typography
            variant="h6"
            align="center"
            color="white"
            sx={{ marginTop: '2rem' }}
          >
            드링크뎁스를 이용해보세요!
          </Typography>

          <Box marginTop="3rem" textAlign="center">
            <Button
              variant="contained"
              sx={{
                padding: ' 1rem 2rem',
                borderRadius: '30px',
                fontSize: '1.25rem',
              }}
              onClick={handleScroll}
            >
              사전 알림 신청
            </Button>
          </Box>
        </Box>

        <Box id="register_form_location">
          <Typography
            variant="h4"
            fontWeight={'bold'}
            align="center"
            marginTop="3rem"
          >
            드링크뎁스에 <div>문의 및 제안하기</div>
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{ marginTop: '2rem', marginBottom: '0.5rem' }}
          >
            궁금하신 점이나 제안 주실 사항 있으시면 본인의 전화번호나 이메일
            주소와 함께
            <div>아래 양식에 남겨주세요.</div>
          </Typography>
        </Box>
      </Box>

      <Register />

      <a
        href="https://pf.kakao.com/_ktxnJb/chat"
        target="_blank"
        style={{ position: 'fixed', right: 20, bottom: 10, zIndex: 100 }}
        rel="noreferrer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/btn_kakao.png"
          alt="카카오톡투명로고"
          width={56}
          height={56}
        />
      </a>

      <div style={{ marginBottom: '100px' }}></div>
      <Box
        display="flex"
        justifyContent={'center'}
        alignItems="center"
        sx={{ cursor: 'pointer' }}
        id="kakao-link-btn"
      >
        <KakaoShareButton url={'https://drinkdepth.com'} />
        <Typography variant="h6" sx={{ marginLeft: '1rem', color: '#3A2929' }}>
          공유하기
        </Typography>
      </Box>
    </Layout>
  );
};

export default Landing;
