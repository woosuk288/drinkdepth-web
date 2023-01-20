import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

import { clipText } from 'src/utils/etc';

type Props = {
  cafe: ManiaCafeType;
};

function ManiaCafe({ cafe }: Props) {
  const clipDescription = clipText(cafe.description ?? '', 100);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card /* sx={{ maxWidth: 345 }} */>
      <CardHeader
        avatar={
          <Avatar
            sx={{ border: '1px solid #eee' }}
            aria-label="cafe logo"
            src={cafe.logo}
          >
            {cafe.name.charAt(0)}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <Typography
            noWrap
            variant="subtitle2"
            // fontWeight={500}
            fontSize={15}
            sx={{ width: { xs: '200px', sm: '100%' } }}
          >
            {cafe.name}
          </Typography>
        }
        subheader={
          <Typography
            noWrap
            variant="body2"
            color="text.secondary"
            sx={{ width: { xs: '200px', sm: '100%' } }}
          >
            {getSido(cafe.sido)} {cafe.gungu} {cafe.dong} • {cafe.subway}
          </Typography>
        }
      />
      <div
        css={{
          display: 'flex',
          '> img': { width: '50%' },
          '> img + img': { marginLeft: '0.125rem' },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={cafe['images.0']}
          alt="매장 외관 사진"
        />
        <CardMedia
          component="img"
          height="200"
          image={cafe['images.1']}
          alt="시그니처 or 매장 내부 사진"
        />
      </div>

      <CardActions
        disableSpacing
        sx={{
          '> button': {
            color: (theme) => theme.palette.text.secondary,
          },
        }}
      >
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {cafe.parking && <Button color="inherit">주차 가능</Button>}
        {cafe.wifi && <Button>무선 인터넷</Button>}
        {cafe.pet && <Button>반려동물</Button>}
      </CardActions>
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          whiteSpace="pre-line"
        >
          {expanded ? (
            <>
              {cafe.description}
              <ExpandMoreIcon
                sx={{ verticalAlign: 'middle', transform: 'rotate(180deg)' }}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="hide more"
              />
            </>
          ) : (
            <>
              {clipDescription}
              {(cafe.description?.length ?? 0) > clipDescription.length && (
                <ExpandMoreIcon
                  sx={{ verticalAlign: 'middle' }}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                />
              )}
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default ManiaCafe;

const getSido = (sido: string) => {
  if (sido == '서울특별시') {
    return '서울';
  }

  return sido;
};
