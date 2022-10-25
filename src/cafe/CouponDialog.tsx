import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { KakaoIcon } from '../common/KakaoShareButton';

type CouponDialogProps = {
  coupon: CouponType;
  open: boolean;
  handleClose: () => void;
};

function CouponDialog({ coupon, open, handleClose }: CouponDialogProps) {
  // console.log('coupon : ', coupon);

  return (
    <Dialog
      // fullScreen={true}
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={handleClose}
      aria-labelledby="optional-dialog-title"
    >
      <DialogTitle id="optional-dialog-title" sx={{ textAlign: 'center' }}>
        쿠폰 번호
      </DialogTitle>

      <DialogContent>
        <DialogContentText align="center" fontSize="3rem" marginBottom={'1rem'}>
          {coupon.code}
        </DialogContentText>
        <DialogContentText align="center">
          1000원 할인 or 아메리카노+1 <br />
          (둘중하나 선택)
        </DialogContentText>
      </DialogContent>

      <DialogContentText variant="caption" align="center" marginY={'1rem'}>
        1인당 한개의 쿠폰만 가능합니다.
      </DialogContentText>

      <DialogActions>
        <Button onClick={handleClose} color="inherit" fullWidth>
          취소
        </Button>

        <Button
          onClick={handleShareKakao}
          autoFocus
          sx={{
            color: '#3A1D1D',
            bgcolor: '#F7E600',
            ':hover': { bgcolor: '#F7E600CC' },
          }}
          fullWidth
          startIcon={<KakaoIcon style={{ fontSize: '24px' }} />}
          id="kakao-share-btn"
        >
          쿠폰 보내기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default CouponDialog;

const handleShareKakao = () => {
  const url = window.location.href;

  if (window.Kakao) {
    const kakao = window.Kakao;
    // console.log('kakao : ', kakao);
    // 중복 initialization 방지
    if (!kakao.isInitialized()) {
      // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '깊이를 마시다',
        description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/drinkdepth.appspot.com/o/images%2Fdrinkdepth600x600.png?alt=media&token=f3cb9980-ccf2-4113-b72d-3539b638b7a6',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      // social: {
      //   likeCount: 77,
      //   commentCount: 55,
      //   sharedCount: 333,
      // },
      // buttons: [
      //   {
      //     title: "웹으로 보기",
      //     link: {
      //       mobileWebUrl: url,
      //       webUrl: url,
      //     },
      //   },
      //   {
      //     title: "앱으로 보기",
      //     link: {
      //       mobileWebUrl: url,
      //       webUrl: url,
      //     },
      //   },
      // ],
    });
  }
};
