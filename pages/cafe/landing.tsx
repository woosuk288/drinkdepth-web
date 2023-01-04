import { Box } from '@mui/material';
import SectionMain from '../../src/cafe/lnading/SectionMain';
import LandingHeader from '../../src/Layout/LandingHeader';
import Layout from '../../src/Layout';
import Meta from '../../src/common/Meta';
import * as fbq from '../../facebook/fpixel';
import SectionGradient from '../../src/cafe/lnading/SectionGradient';
import SectionForm from '../../src/cafe/lnading/SectionForm';
import KakaoShare from '../../src/cafe/lnading/KakaoShare';
import SectionContent from '../../src/cafe/lnading/SectionContent';
import KakaoChat from '../../src/cafe/lnading/KakaoChat';
import { GetStaticProps } from 'next';
import SectionIntro from '../../src/cafe/lnading/SectionIntro';
import SectionServey from '../../src/cafe/lnading/SectionSurvey';

import { useRecoilState } from 'recoil';
import { landingFormState } from '../../atoms/landingFormAtom';

const metaData = {
  title: '스마트 메뉴판 소개 - 드링크뎁스',
  description: '우리 카페만의 특별한 모바일 메뉴판을 도입해보세요.',
  image: '/images/logo_icon.png',
  canonical: '/cafe/landing',
};

function LandingPage() {
  const [, setLandingForm] = useRecoilState(landingFormState);

  const handleScroll = () => {
    // console.log('window.scrollY : ', window.scrollY);

    // if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return

    // console.log('document.body.scrollHeight : ', document.body.scrollHeight);

    const register_form_location = (
      document.querySelector('#register_form_location') as any
    ).offsetTop!;

    // console.log('register_form_location : ', register_form_location);

    window.scrollTo({
      top: register_form_location,
      behavior: 'smooth',
    });

    // fbq.event('Schedule', { event_name: '사전 알림 신청 버튼 클릭' });
  };

  const clickPromotion = (name: string) => {
    const nextApplyBtn = name === '메뉴판 신청하기';
    const nextMoneyBtn = name === '100만원 상당';

    setLandingForm((curr) => ({
      applyBtn: nextApplyBtn || curr.applyBtn,
      moneyBtn: nextMoneyBtn || curr.moneyBtn,
    }));

    handleScroll();
  };

  return (
    <Layout header={<LandingHeader />}>
      <Meta data={metaData} />

      <Box display="flex" flexDirection={'column'}>
        <SectionMain handleScroll={() => clickPromotion('메뉴판 신청하기')} />

        <SectionIntro />

        <SectionServey />

        <SectionContent />

        <SectionGradient handleScroll={() => clickPromotion('100만원 상당')} />

        <SectionForm />

        <KakaoShare />

        {/* TODO: 채널톡 넣기 */}
        <KakaoChat />
      </Box>
    </Layout>
  );
}
export default LandingPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
