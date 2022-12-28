import {
  Badge,
  ImageList,
  ImageListItem,
  SvgIcon,
  SvgIconProps,
  Typography,
} from '@mui/material';

import CollectionsIcon from '@mui/icons-material/Collections';
// import { NextLinkComposed } from './Link';
// import { POST_PATH } from 'src/routes';
import { sxSquareImg } from 'src/styles/GlobalSx';
import { NextLinkComposed } from 'src/common/Link';
import { useRouter } from 'next/router';
import { BADGE_PATH } from 'src/utils/routes';

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import OpacityIcon from '@mui/icons-material/Opacity';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function BadgeList() {
  const router = useRouter();

  return (
    <ImageList cols={3} gap={3} sx={{ marginTop: 0 }}>
      <>
        {badges.map((badge) => (
          <div key={badge.id} css={{ margin: '0.25rem' }}>
            <ImageListItem
              sx={sxSquareImg}
              component={NextLinkComposed}
              to={`${BADGE_PATH}/${badge.id}`}
            >
              {/* <img
                src={badge.image}
                alt={badge.name}
                loading="lazy"
                className="img"
              /> */}
              <div
                className="img"
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '> svg': {
                    fontSize: '80px',
                    color: badge.hasBadge ? badge.color : 'gray',
                  },
                }}
              >
                {badge.image}
              </div>
            </ImageListItem>

            <Typography
              align="center"
              fontWeight={700}
              sx={{ marginTop: '0.5rem' }}
            >
              {news.includes(badge.id) ? (
                <Badge
                  color="secondary"
                  badgeContent="N"
                  sx={{ '.MuiBadge-badge': { right: '-8px' } }}
                >
                  {badge.name}
                </Badge>
              ) : (
                badge.name
              )}
            </Typography>
          </div>
        ))}
      </>
    </ImageList>
  );
}

export default BadgeList;

// 출처 https://www.svgrepo.com/svg/396892/letter-d
export const LetterDIcon = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    // viewBox="0 0 128 128"
    // preserveAspectRatio="xMidYMid meet"
    // focusable="false"
    // clipRule="evenodd"
    // fillRule="evenodd"
    // style="pointer-events: none; display: block; width: 100%; height: 100%;"

    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    // class="iconify iconify--noto"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* <svg width="128px" height="128px" > */}
    <path
      d="M65.71 15.31h-43.6c-1.25 0-2.24 1-2.24 2.24v100.96c0 1.24 1 2.24 2.24 2.24H65.7c30.15 0 50.43-21.19 50.43-52.73c0-31.53-20.27-52.71-50.42-52.71zm-1.29 80.8c-.28 0-.54-.07-.79-.16c-.06.01-.11.03-.17.03c-.08.01-.14.04-.22.04h-14.7c-1.2 0-2.16-.97-2.16-2.16V42.19c0-1.19.96-2.16 2.16-2.16h14.7c.08 0 .14.03.22.04c.05 0 .11.02.17.03c.25-.09.51-.16.79-.16c.43 0 .86.04 1.29.06c.75.03 1.5.09 2.24.18c13.11 1.63 21.69 12.39 21.69 27.84s-8.59 26.21-21.69 27.84c-.74.09-1.49.15-2.24.18c-.43.03-.86.07-1.29.07z"
      fill="inherit"
      // fill="#6AD7FF"
      // fill="#4f9cff"
    ></path>

    {/* </svg> */}
  </SvgIcon>
);

export const badges = [
  {
    id: '00010',
    image: <LetterDIcon />,
    name: '개국 공신',
    description:
      '드링크뎁스의 초창기 유저로서 성장에 기여한 분에게만 제공되는 한정판 배지',
    hasBadge: true,
    color: '#4f9cff',
  },
  {
    id: '00020',
    image: <OpacityIcon />,
    name: '식초단',
    description: '산미가 4, 5단계인 음료를 10회 이상 달성 시 부여',
    hasBadge: true,
    color: '#ffd356',
  },
  { id: '00030', image: <OutdoorGrillIcon />, name: '석탄단' },
  { id: '00110', image: <SmokingRoomsIcon />, name: '게이샤갱' },
  { id: '00040', image: <QuestionMarkIcon />, name: '에티단' },
  { id: '00050', image: <QuestionMarkIcon />, name: '케냐는 외로워' },
  { id: '00060', image: <QuestionMarkIcon />, name: '???' }, // 콜롬비아
  { id: '00070', image: <QuestionMarkIcon />, name: '???' }, // 브라질
  { id: '00080', image: <QuestionMarkIcon />, name: '???' }, // 인도
  { id: '00090', image: <QuestionMarkIcon />, name: '???' }, // 베트남
  { id: '00100', image: <QuestionMarkIcon />, name: '???' }, // 코스타리카

  { id: '00120', image: <QuestionMarkIcon />, name: '???' }, // 티피카갱
];

const news = ['020'];
