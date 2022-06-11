import { IconButton, SvgIcon } from '@mui/material';
import { useEffect } from 'react';

interface KakaoShareButtonProps {
  url: string;
}

export const KakaoShareButton = ({ url }: KakaoShareButtonProps) => {
  useEffect(() => {
    createKakaoButton();
  }, []);

  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // console.log('kakao : ', kakao);
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: '깊이를 마시다',
          description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/foodoverflow-bca6d.appspot.com/o/images%2Fdrinkdepth600x600.png?alt=media&token=f3cb9980-ccf2-4113-b72d-3539b638b7a6',
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
  return (
    <IconButton
      // id="kakao-link-btn"
      style={{ verticalAlign: 'initial', padding: 0 }}
    >
      <KakaoIcon style={{ width: 48, height: 48 }} />
    </IconButton>
  );
};

export const KakaoIcon = (props: any) => (
  <SvgIcon
    {...props}
    viewBox="0 0 60 60"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
    clipRule="evenodd"
    fillRule="evenodd"
    // style="pointer-events: none; display: block; width: 100%; height: 100%;"
  >
    <path
      d="M28.486325 59.9692983c-6.6364044-.569063-11.5630204-2.3269562-16.3219736-5.8239328C4.44376336 48.4721167 0 39.6467923 0 29.9869344 0 15.1115596 10.506778 2.79838844 25.2744118.36718043 31.302519-.62523147 37.978265.41644488 43.5623517 3.2208101 57.138627 10.0389054 63.3436513 25.7618627 58.2050226 40.3239688c-3.5279559 9.9977054-12.7897094 17.6177847-23.3910729 19.2449379-2.0856252.3201125-5.0651487.5086455-6.3276247.4003916z"
      fill="#FFE812"
    ></path>
    <path
      d="M30.5 14C19.730375 14 11 20.69445394 11 28.952339c0 5.3388968 3.649875 10.0235376 9.14025 12.6688251-.2986875 1.0018068-1.9194375 6.4448229-1.9839375 6.8724233 0 0-.0388125.3212929.175125.4438292.2139375.1225362.4655625.0273518.4655625.0273518.6135-.0833319 7.1143125-4.5241766 8.2395-5.2953162 1.1240625.1548115 2.2815.2352259 3.4635.2352259 10.769625 0 19.5-6.6942716 19.5-14.9523391C50 20.69445394 41.269625 14 30.5 14z"
      fill="#000"
    ></path>
    <path
      d="M20.11212489 33c-.64033041 0-1.16107056-.4353882-1.16107056-.9707294v-6.0386824h-1.81165709C16.51106456 25.9905882 16 25.5440188 16 24.9952941S16.51125807 24 17.13939724 24h5.94545526c.6283327 0 1.1393973.4465694 1.1393973.9952941s-.5112581.9952941-1.1393973.9952941h-1.8116571v6.0386824c0 .5353412-.5207401.9707294-1.16107051.9707294zm10.18104071-.0132141c-.4841664 0-.8545479-.1721224-.9662042-.4489412l-.5749235-1.3176847-3.5404911-.0001694-.5753105 1.3185318c-.1112692.2763105-.4814572.4482635-.9656237.4482635-.2546749.0002283-.5064123-.0476164-.7380538-.140273-.3200685-.1292611-.6277522-.484687-.2751737-1.4433882l2.7772807-6.3996988c.1956404-.48672.789915-.9881788 1.546159-1.0032565.7583726.0149082 1.3526472.5165365 1.5486746 1.004273l2.7761197 6.3968188c.3533525.9609035.0456688 1.3164988-.2743997 1.4454212-.2316966.0924919-.4834067.1402736-.7380538.1401035-.0001935 0 0 0 0 0zm-2.1516573-3.5671341l-1.1597159-2.8842353-1.159716 2.8842353h2.3194319zm5.0326604 3.4321129c-.6136258 0-1.1126927-.4181082-1.1126927-.9317647v-6.9035294c0-.5605835.5317704-1.0164706 1.1852596-1.0164706s1.1852595.4558871 1.1852595 1.0164706v5.9717647H36.89927c.6136258 0 1.1126926.4181082 1.1126926.9317647s-.4990668.9317647-1.1126926.9317647h-3.7251013zm6.4505209.1350212c-.6403304 0-1.1610705-.4558871-1.1610705-1.0164706v-6.9538447c0-.5605835.5207401-1.0164706 1.1610705-1.0164706.6403305 0 1.1610706.4558871 1.1610706 1.0164706v2.1847341l3.2393869-2.8359529c.1666136-.1458636.395538-.2261647.6440071-.2261647.2898806 0 .5809223.10944.7990101.3001976.2033808.1778824.3247127.4067577.3413547.6444424.0168355.2397176-.0743085.4594447-.2562096.6188611l-2.6458863 2.3160283 2.8579752 3.3147106c.1863887.2147949.2666819.4860225.2229256.7530353-.0418059.2671791-.2040382.5085898-.4504954.6703623-.2007827.1336077-.4461848.2056972-.698384.2051577-.3648049.0014863-.7088533-.1483913-.9275018-.4040471l-2.722904-3.1585129-.4028915.3527152v2.2177695c-.0007462.5613249-.5202804 1.016232-1.1614576 1.0169788z"
      fill="#FFE812"
    ></path>
  </SvgIcon>
);
