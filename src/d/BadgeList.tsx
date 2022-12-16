import { ImageList, ImageListItem, Typography } from '@mui/material';

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
                  '> svg': { fontSize: '80px', color: 'gray' },
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
              {badge.name}
            </Typography>
          </div>
        ))}
      </>
    </ImageList>
  );
}
export default BadgeList;

const badges = [
  { id: '010', image: <MilitaryTechIcon />, name: '개국 공신' },
  { id: '020', image: <OpacityIcon />, name: '식초단' },
  { id: '030', image: <OutdoorGrillIcon />, name: '석탄단' },
  { id: '110', image: <SmokingRoomsIcon />, name: '게이샤갱' },
  { id: '040', image: <QuestionMarkIcon />, name: '에티단' },
  { id: '050', image: <QuestionMarkIcon />, name: '케냐는 외로워' },
  { id: '060', image: <QuestionMarkIcon />, name: '콜롬비아' },
  { id: '070', image: <QuestionMarkIcon />, name: '브라질' },
  { id: '080', image: <QuestionMarkIcon />, name: '인도' },
  { id: '090', image: <QuestionMarkIcon />, name: '베트남' },
  { id: '100', image: <QuestionMarkIcon />, name: '코스타리카' },

  { id: '120', image: <QuestionMarkIcon />, name: '티피카갱' },
];
