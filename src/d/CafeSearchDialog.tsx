import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import HeaderD from './HeaderD';
import KakaoMapsSearch, { PlaceType } from './CafeSearch';
import Main from './Main';
import { SetterOrUpdater } from 'recoil';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  initialOpen?: boolean;
  setter: SetterOrUpdater<DReviewType>;
};

export default function CafeSearchDialog({
  initialOpen = true,
  setter,
}: Props) {
  const [open, setOpen] = React.useState(initialOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (place: PlaceType) => {
    setter((prev) => ({ ...prev, place }));
    handleClose();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <HeaderD leftIcon="back" centerComponent="리뷰 쓰기" />
        <Main sx={{ width: '100%' }}>
          <KakaoMapsSearch handleSelect={handleSelect} />
        </Main>
      </Dialog>
    </div>
  );
}
