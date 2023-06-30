import React from 'react';
import { Box, Typography } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { sxCenter } from '../styles/GlobalSx';
import { useRouter } from 'next/router';
import LazyImage from '../common/LazyImage';

function SectionC() {
  const router = useRouter();

  const handleImageClick = (path: string) => {
    // console.log('router.pathname : ', window.location.origin);
    if (path) {
      router.push(path);
    }
  };

  return (
    <Box mt="160px">
      <Typography
        // variant="h1"
        fontWeight={700}
        sx={{
          fontSize: { xs: 36, md: 50, lineHeight: 1.32, marginBottom: '3rem' },
        }}
      >
        진행상태 및 소식
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {projects.map((p) => (
          <Box
            id={p.id}
            key={p.dt2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '3rem',
              minHeight: '320px',
              height: '100%',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(2, 32, 71, 0.05)',
                borderRadius: '50%',
                marginRight: { sm: '3rem' },
                marginBottom: { xs: '1rem', sm: 0 },
                width: '300px',
                height: '300px',
                cursor: 'pointer',
                ...sxCenter,
              }}
              onClick={() => handleImageClick(p.path)}
            >
              {/* {typeof p.imageURL === 'string' ? (
                <LazyImage
                  src={p.imageURL}
                  alt={p.dt1}
                  style={{
                    borderRadius: '50%',
                    border: '1px solid #bdbdbd',
                  }}
                />
              ) : (
                p.imageURL
              )} */}
            </Box>

            <Box component="dl" sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                component="dt"
                color="text.secondary"
                marginBottom="1rem"
                fontWeight={600}
              >
                {p.dt1}
              </Typography>
              <Typography
                variant="h3"
                component="dt"
                marginBottom="2.5rem"
                fontWeight={600}
                fontSize={30}
              >
                {p.dt2}
              </Typography>

              <Typography
                component="dd"
                variant="h6"
                color="text.secondary"
                gutterBottom
              >
                {p.dd1}
              </Typography>
              <Typography component="dd" variant="h6" color="text.secondary">
                {p.dd2}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SectionC;

const projects = [
  {
    id: 'drinkdepth_o2o_section',
    // imageURL: '/images/o2o/o2o_coffee_map.png',
    path: '',
    dt1: '매번 원하는 카페를 찾는 시간이 아깝다면?',
    dt2: '당신만을 위한 카페 추천',
    dd1: '지역, 분위기, 와이파이 사용, 음료 등 찾는 카페의 우선순위를 입력하고 언제든지 수정할 수 있어요. 여러분의 취향에 맞는 카페를 매주 2회 알려드립니다.',
    dd2: '50명이 342개의 카페 추천을 받았어요.',
  },
  {
    // imageURL: <QuestionMarkIcon sx={{ fontSize: 96, color: 'white' }} />,
    path: '',
    dt1: '카페 마케팅과 고객 유치가 어렵다면?',
    dt2: '카페 사장님을 위한 가치제안',
    dd1: '우리 카페만의 차별화된 가치를 공유해주세요. 시그니처 메뉴, 스페셜티, 디저트 맛집, 분위기, 전망, 인테리어, 애견동반, 모각코 등 어떤 가치라도 유저들이 놓치지않게 해드려요.',
    dd2: '219개의 카페가 등록되었어요.',
  },
  {
    // imageURL: <QuestionMarkIcon sx={{ fontSize: 96, color: 'white' }} />,
    path: '',
    dt1: '개발 소식',
    dt2: 'AI 카페 추천 서비스',
    dd1: '여러분의 취향을 분석하여 실시간으로 최적의 카페리스트를 찾아드리는 서비스를 개발 중이에요. 최신 업데이트된 개발 소식이 궁금하다면 확인하실 수 있어요.',
    dd2: '2023-06-30에 최종 업데이트 되었어요.',
  },
];
