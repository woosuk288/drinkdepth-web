import * as React from 'react';
import Button from '@mui/material/Button';
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

import ChoiceTable from './choiceTable';
import BeanTable from './BeanTable';
import Seller from './Seller';
import { KakaoShareButton } from '../../../landing/KakaoShareButton';

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

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleClick = () => {};

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
            src={coffeeDetail.seller.logoURLs['200x200']}
            sx={{ marginRight: '0.5rem' }}
          />
          <Typography fontWeight={'bold'}>
            {coffeeDetail.seller.name}
          </Typography>

          <span style={{ flex: 1 }} />

          <IconButton color="primary" sx={{ padding: 0 }}>
            <LocationOnIcon fontSize="large" />
          </IconButton>
          {/* <Button
            // onClick={handleFindPath}
            // fullWidth
            variant="contained"
            size="small"
            startIcon={<LocationOnIcon />}
          >
            길찾기
          </Button> */}
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

          {/* <Chip
            label={coffeeDetail.tags[1] === '디카페인' ? '디카페인' : '카페인'}
            variant="outlined"
            onClick={handleClick}
          />
          <Chip
            label={coffeeDetail.tags[0]}
            variant="outlined"
            onClick={handleClick}
          />
          <Chip
            label={'산미 ' + getAcidityLabel(coffeeDetail.acidity)}
            variant="outlined"
            onClick={handleClick}
          />
          <Chip
            label={
              coffeeDetail.tags[1] === '디카페인'
                ? coffeeDetail.tags[2]
                : coffeeDetail.tags[1]
            }
            variant="outlined"
            onClick={handleClick}
          /> */}
        </DialogContent>

        <DialogContent>
          <BeanTable beans={coffeeDetail.beans} />
        </DialogContent>

        <DialogContent>
          <Seller seller={coffeeDetail.seller} />
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

          <Box id="kakao-link-btn" sx={{ display: 'flex', cursor: 'pointer' }}>
            <KakaoShareButton url={'https://drinkdepth.com'} />
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
