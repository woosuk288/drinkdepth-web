import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import HeaderD from './HeaderD';

import Main from './Main';
import { SetterOrUpdater } from 'recoil';
import KakaoAddressSearch, { AddressType } from './SearchRegion';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  handleClose: () => void;
  setter: SetterOrUpdater<AddressType | undefined>;
  headerCenterComponent?: React.ReactNode;
  hasHeader?: boolean;
};

export default function SearchRegionDialog({
  open,
  handleClose,
  setter,
  headerCenterComponent,
  hasHeader = false,
}: Props) {
  const handleSelect = (address: AddressType) => {
    // console.log('address : ', address);
    setter(address);
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {hasHeader && (
          <HeaderD leftIcon="back" centerComponent={headerCenterComponent} />
        )}
        <Main sx={{ width: '100%' }}>
          <KakaoAddressSearch handleSelect={handleSelect} />
        </Main>
      </Dialog>
    </div>
  );
}
