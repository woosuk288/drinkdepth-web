import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/system';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

// emotion styled과 mui styled 사용법 비교하기 위해 써봄
const VisionWrapper = muiStyled(Box)(({ theme }) => ({
  marginTop: '100px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '80px',
  },
}));

const GoalWrapper = styled.div`
  position: relative;
  margin: 48px 0;
  display: grid;
  grid-auto-columns: 260px; /* 반드시! */
  grid-auto-flow: column; /* row 를 가지지않을거라면 반드시! */
  grid-template-rows: 280px;
  grid-gap: 20px;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: unset;
    grid-template-rows: 168px;
    grid-gap: 8px;
  }
`;

const GoalCard = styled.div`
  position: relative;
  padding: 30px;
  display: inline-block;
  border-radius: 20px;
  text-align: left;
  font-size: 24px;
  font-weight: 800;

  color: #fff;

  @media (max-width: 900px) {
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 16px;
    font-weight: 500;

    flex: 0 0 50%;

    line-height: 1.2;
  }
`;

const GoalIcon = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  & > img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 900px) {
    position: unset;
    width: 57px;
    height: 57px;
    margin-bottom: 1rem;
  }
`;

import React from 'react';

function SectionA() {
  return (
    <>
      <VisionWrapper>
        <Typography
          variant="h1"
          fontWeight={700}
          sx={{
            fontSize: { xs: 36, md: 50, lineHeight: 1.32, marginBottom: 24 },
          }}
        >
          마시는 즐거움과
          <p>경험의 깊이를 바꾸는 혁신</p>
          {/* 바꿉니다. 드립니다. 만드는, 채우는 */}
        </Typography>
        <Typography
          variant="h6"
          color="InfoText"
          fontWeight={400}
          sx={{ lineHeight: { xs: 1.3, md: 1.6 }, maxWidth: '880px' }}
        >
          마시는 경험이 바뀌면 인생의 깊이가 달라집니다. 모두가 마시는 즐거움을
          느낄 수 있도록 끊임없이 소통하고, 보다 깊은 삶의 경험을 만드는 기술
          혁신과 도전을 이어갑니다.
        </Typography>
      </VisionWrapper>

      <GoalWrapper>
        <GoalCard
          style={{
            backgroundColor: '#579dff',
          }}
        >
          <GoalIcon>
            <img src={'/images/goals/goal_choice.png'} alt="choice" />
          </GoalIcon>
          선택의 시행착오를
          <p>줄이다</p>
        </GoalCard>
        <GoalCard style={{ backgroundColor: '#37BBAB' }}>
          <GoalIcon>
            {<img src={'/images/goals/goal_place.png'} alt="place" />}
          </GoalIcon>
          장소의 제약을
          <p>없애다</p>
        </GoalCard>
        <GoalCard style={{ backgroundColor: '#A993F8' }}>
          <GoalIcon>
            {<img src={'/images/goals/goal_time.png'} alt="time" />}
          </GoalIcon>
          시간의 제약을
          <p>줄이다</p>
        </GoalCard>
        <GoalCard style={{ backgroundColor: '#6E8CF8' }}>
          <GoalIcon>
            {<img src={'/images/goals/goal_create.png'} alt="create" />}
          </GoalIcon>
          창작 환경을
          <p>촉진하다</p>
        </GoalCard>
      </GoalWrapper>
    </>
  );
}

export default SectionA;
