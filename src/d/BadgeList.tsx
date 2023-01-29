import {
  Badge,
  ImageList,
  ImageListItem,
  SvgIcon,
  SvgIconProps,
  Tooltip,
  Typography,
} from '@mui/material';

import CollectionsIcon from '@mui/icons-material/Collections';
// import { NextLinkComposed } from './Link';
// import { POST_PATH } from 'src/routes';
import { sxSquareImg } from 'src/styles/GlobalSx';
// import { NextLinkComposed } from 'src/common/Link';
import { useRouter } from 'next/router';

// import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import OpacityIcon from '@mui/icons-material/Opacity';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

type Props = {
  myBadges: UserBadgeType[];
  handleCheckNewBadge: (badgeId: string) => () => void;
};
function BadgeList({ myBadges, handleCheckNewBadge }: Props) {
  // const router = useRouter();

  const badges = allBadges.map((badge) => {
    const hasBadge = Boolean(
      myBadges.find((myBadge) => myBadge.id === badge.id)
    );
    const color = hasBadge ? badge.color : 'gray';
    const isNew = Boolean(
      myBadges.find((myBadge) => myBadge.isNew && myBadge.id === badge.id)
    );

    return {
      ...badge,
      color,
      hasBadge,
      isNew,
    };
  });

  return (
    <ImageList cols={3} gap={3} sx={{ marginTop: 0 }}>
      <>
        {badges.map((badge) => (
          <Tooltip
            key={badge.id}
            title={badge.description}
            arrow
            enterTouchDelay={10}
            leaveTouchDelay={5000}
          >
            <div css={{ margin: '0.25rem' }}>
              <ImageListItem
                sx={sxSquareImg}
                onClick={
                  badge.isNew ? handleCheckNewBadge(badge.id) : undefined
                }
                // component={NextLinkComposed}
                // to={`${MYBADGE_PATH}/${badge.id}`}
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
                      color: badge.color,
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
                {badge.isNew ? (
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
          </Tooltip>
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

export const GangsterIcon = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    // width="127px"
    // height="127px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    // fill="#000000"
    // stroke="#000000"
    strokeWidth="0.00512"
    transform="matrix(1, 0, 0, 1, 0, 0)"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

    <g id="SVGRepo_iconCarrier">
      <path
        fill="inherit"
        d="M196.2 34.57c-7.5 16.07-17.3 39.33-25.7 62.86-4 11.17-7.6 22.47-10.5 32.77 80.8 26 111.2 26 192 0-2.9-10.3-6.5-21.6-10.5-32.77-8.4-23.53-18.2-46.79-25.7-62.86-26.5 13.22-42.6 20.86-59.8 20.86-17.2 0-33.3-7.64-59.8-20.86zM32.28 139H27.34c-1.71 0-2.8.1-3.72.3l-.41.5c-5.12 6.8-6.92 12.6-6.92 17.8 0 5.1 1.9 10.3 6.14 15.9 8.48 11.1 26.73 22.9 50.92 32.5C121.7 225.4 193.1 237.4 256 237.4c62.9 0 134.3-12 182.7-31.4 24.2-9.6 42.4-21.4 50.9-32.5 4.2-5.6 6.1-10.8 6.1-15.9 0-5.2-1.8-11-6.9-17.8l-.4-.5c-2-.3-6-.5-11.4-.2-11.8.7-29.8 3.2-51.8 6.2-14.8 2-31.5 4.3-49.5 6.4.8 5.3 1.3 10.2 1.3 14.7v4.8l-4 2.7c-27.1 18-71.9 25.5-117 25.5-45.1 0-89.9-7.5-117-25.5l-4-2.7v-4.8c0-4.5.5-9.4 1.3-14.7-18-2.1-34.7-4.4-49.51-6.4-22.01-3-40-5.5-51.82-6.2-.93-.1-1.83-.2-2.69-.1zm123.32 8.6c-1.1 5.2-1.9 9.8-2.3 13.7 22.1 12.5 62.4 20.1 102.7 20.1 40.3 0 80.6-7.6 102.7-20.1-.4-3.9-1.2-8.5-2.3-13.7-81.3 25.9-119.5 25.9-200.8 0zM137 265.4c.2 14 1.9 27.4 4.9 40.2 14.5-.4 29.9-3.9 44.9-9.6 8.2-3.2 16.2-7 23.9-11.2-6.1 1-12.4 1.6-18.7 1.6-14.7 0-36.1-10.1-55-21zm238 0c-18.9 10.9-40.3 21-55 21-6.3 0-12.6-.6-18.7-1.6 7.7 4.2 15.7 8 23.9 11.2 15 5.7 30.3 9.2 44.9 9.6 3-12.8 4.7-26.2 4.9-40.2zm-112.1 15.3c1.7 24.1 20.9 41.5 45 58.5-36.2-5.4-59.3-20.8-68.5-51.2-13.7 9.7-29.5 18.3-46.2 24.8-19.2 7.4-39.7 11.7-59.6 10.6 8.3 10.7 15.7 20.5 22.4 29.7 25.2 19.2 45.7 36.8 102.7 45.4-24 3.7-51.2 6.2-72.5-.9 16 25.8 28.2 65.6 43.3 95.8h53c7.9-15.9 15-45.9 22.3-59.4-16.6 13.6-34.5 16.6-47.9 15.2 34.1-14.6 53.4-37.4 74-59.6 12.4-19.3 27.3-40.3 47.5-66.2-19.9 1.1-40.4-3.2-59.6-10.6-20.9-8.1-40.3-19.6-55.9-32.1zm219 18c-5.5 0-11.7.6-18.6 1.7-15.7 2.6-34.6 7.7-55.3 14.3l-1 1.3c-12.2 15.3-22.7 28.8-31.8 41.1 15.4 9.5 24.9 20.3 35 30.9-14.5-5.7-27.4-11.7-45.4-16.6-5.1 7.2-9.8 14-14.1 20.5 9.6 3.7 19.9 6.7 30.8 9.3 26.9 6.5 56 10.1 81.5 16.6-18-27.2-43.4-55.2-74.3-77 20.1-4.1 40.6-8.6 58.7-14.9 19.9-6.9 35.9-15.8 45.2-26.5-1.8-.2-3.4-.5-5.4-.6-1.7-.1-3.4-.1-5.3-.1z"
      />
    </g>
  </SvgIcon>
);

export const allBadges = [
  {
    id: '00010',
    image: <LetterDIcon />,
    name: '개국 공신',
    description:
      '드링크뎁스의 초창기 유저로서 성장에 기여한 분에게만 제공되는 한정판 배지',
    hasBadge: false,
    color: '#4f9cff',
  },
  {
    id: '00020',
    image: <OpacityIcon />,
    name: '식초단',
    description: '산미가 4, 5단계인 음료를 10회 이상 달성 시 부여',
    hasBadge: false,
    color: '#ffd356',
  },
  {
    id: '00030',
    image: <OutdoorGrillIcon />,
    name: '석탄단',
    description: '로스팅이 4, 5단계인 음료를 10회 이상 달성 시 부여',
    hasBadge: false,
    color: '#2c2026',
  },
  { id: '00110', image: <GangsterIcon />, name: '게이샤갱' },
  { id: '00040', image: <QuestionMarkIcon />, name: '에티단' },
  { id: '00050', image: <QuestionMarkIcon />, name: '케냐는 외로워' },
  { id: '00060', image: <QuestionMarkIcon />, name: '???' }, // 콜롬비아
  { id: '00070', image: <QuestionMarkIcon />, name: '???' }, // 브라질
  { id: '00080', image: <QuestionMarkIcon />, name: '???' }, // 인도
  { id: '00090', image: <QuestionMarkIcon />, name: '???' }, // 베트남
  { id: '00100', image: <QuestionMarkIcon />, name: '???' }, // 코스타리카

  { id: '00120', image: <QuestionMarkIcon />, name: '???' }, // 티피카갱
];
