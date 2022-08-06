import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { CoffeeResultType } from '../../../../pages/o2o/place';
import { Avatar, Box, Chip, IconButton, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import ChoiceTable from './ChoiceTable';
import BeanTable from './BeanTable';
import SellerAndBranch from './SellerAndBranch';
import { KakaoShareButton } from '../../../common/KakaoShareButton';
import proj4 from 'proj4';
import { analytics } from '../../../utils/firebase/firebaseInit';
import { logEvent } from 'firebase/analytics';
import LazyStorage from '../../../common/LazyStorage';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type AlertDialogSlideProps = {
  open: boolean;
  handleClose: () => void;
  coffeeDetail: CoffeeResultType;
};

export default function AlertDialogSlide({
  open,
  handleClose,
  coffeeDetail,
}: AlertDialogSlideProps) {
  // const [open, setOpen] = React.useState(false);

  const handleOpenNaverMap = async (from: 'top' | 'bottom') => {
    const p = proj4('EPSG:4326', 'EPSG:3857');
    const position = p.forward([
      parseFloat(coffeeDetail.branch.addressX),
      parseFloat(coffeeDetail.branch.addressY),
    ]);

    const url = makeNaverMapURL(coffeeDetail.branch.name, position);
    console.log('position : ', position);
    console.log('url : ', url);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();

    const ga = await analytics;
    if (ga && process.env.NODE_ENV === 'production') {
      logEvent(ga!, 'custom_click_go_naver', {
        from,
        name: coffeeDetail.name,
        branchName: coffeeDetail.branch.name,
      });
    }
  };

  const handleShareClick = async () => {
    const ga = await analytics;
    if (ga && process.env.NODE_ENV === 'production') {
      logEvent(ga!, 'kakao_share_click', {
        name: coffeeDetail.name,
        branchName: coffeeDetail.branch.name,
      });
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        scroll={'body'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={coffeeDetail.seller.logoURLs['origin']}
            sx={{ marginRight: '0.5rem' }}
          />
          <Typography fontWeight={'bold'}>
            {coffeeDetail.branch.name}
          </Typography>

          <span style={{ flex: 1 }} />

          <IconButton
            color="primary"
            sx={{ padding: 0 }}
            onClick={() => handleOpenNaverMap('top')}
          >
            <LocationOnIcon fontSize="large" />
          </IconButton>
        </DialogTitle>

        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {coffeeDetail.name}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {coffeeDetail.note}
          </DialogContentText>
        </DialogContent>

        <DialogContent>
          <Box>
            {coffeeDetail.characters.map((character) => (
              <Chip key={character} label={character} variant="filled" />
            ))}
          </Box>
          <Box>
            {coffeeDetail.flavors.map((flavor) => (
              <Chip key={flavor} label={flavor} variant="filled" />
            ))}
          </Box>
        </DialogContent>

        <DialogContent>
          <ChoiceTable
            choiceOptions={[
              {
                name: '카페인 여부',
                value:
                  coffeeDetail.tags[1] === '디카페인' ? '디카페인' : '카페인',
              },
              { name: '로스팅 정도', value: coffeeDetail.tags[0] },
              {
                name: '산미 정도',
                value: getAcidityLabel(coffeeDetail.acidity),
              },
              {
                name: '원두 유형',
                value:
                  coffeeDetail.tags[1] === '디카페인'
                    ? coffeeDetail.tags[2]
                    : coffeeDetail.tags[1],
              },
            ]}
          />
        </DialogContent>

        <DialogContent>
          <BeanTable beans={coffeeDetail.beans} />
        </DialogContent>

        <DialogContent>
          <LazyStorage storagePath="/images/2022. 4. 2.테스트 스타벅스 커피2.jpeg" />
          <LazyStorage storagePath="/images/테스트커피.jpeg" />
          <LazyStorage storagePath="/images/커피 숲.png" />
        </DialogContent>

        <DialogContent>
          <SellerAndBranch
            seller={coffeeDetail.seller}
            branch={coffeeDetail.branch}
            handleOpenNaverMap={() => handleOpenNaverMap('bottom')}
          />
        </DialogContent>

        <DialogActions
          sx={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
            backgroundColor: 'white',
            // boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
          }}
        >
          <IconButton
            // edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <span style={{ flex: 1 }}></span>

          <Box
            id="kakao-link-btn"
            sx={{ display: 'flex', cursor: 'pointer' }}
            onClick={handleShareClick}
          >
            <KakaoShareButton url={'https://drinkdepth.com/o2o'} />
            <Typography
              // variant="h6"
              sx={{ marginX: '0.5rem', color: '#3A2929' }}
            >
              카카오톡 공유
            </Typography>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function getAcidityLabel(acidity: number) {
  return acidity === 1
    ? '매우낮음'
    : acidity === 2
    ? '낮음'
    : acidity === 3
    ? '보통'
    : acidity === 4
    ? '높음'
    : acidity === 5
    ? '매우높음'
    : '';
}

// 네이버 지도는 EPSG:3857 좌표계를 사용
export function makeNaverMapURL(cafeName: string, position: number[]) {
  return `https://map.naver.com/v5/search/${cafeName}?c=${position[0]},${position[1]},15,0,0,0,dh`;
}
