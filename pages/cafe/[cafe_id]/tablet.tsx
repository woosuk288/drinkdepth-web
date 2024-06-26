import { Container } from '@mui/material';
import { NextPage } from 'next';

import Menus from 'src/cafe/Menus';
import Meta from 'src/common/Meta';
import { CAFE_PATH } from 'src/utils/routes';

// import CouponWIthQR from 'src/cafe/tablet/CouponWIthQR';
import BannerCarousel from 'src/cafe/tablet/BannerCarousel';
import CafeHeader from 'src/cafe/B2BHeader';
import useScrollY from 'src/hooks/useScrollY';

/**
 * only access offlineqrtablet.drinkdepth.com
 */

const TabletPage: NextPage<Props> = ({ cafe, menus }) => {
  const metaData = {
    title: `카페 메뉴 | ${cafe.name} | 태블릿 - 드링크뎁스`,
    description: cafe.introduce,
    image: cafe.imageURL,
    canonical: `${CAFE_PATH}/${cafe.id}/tablet`,
  };

  const {} = useScrollY();

  return (
    <Container maxWidth="sm" disableGutters>
      <Meta data={metaData} />

      <CafeHeader title={cafe.name} />
      <BannerCarousel imageURLs={cafe.imageOfflineURLs} />
      {/* <CouponWIthQR cafeId={cafe.id} /> */}
      <Menus
        menuCategories={cafe.menuCategories}
        menus={menus}
        sx={{
          marginTop: '3rem',
          '& > h6': { marginTop: '0.75rem', marginBottom: 0 },
          '& > ul > li .MuiAvatar-root': { width: '160px', height: '160px' },
        }}
      />

      <div style={{ height: '80px' }}></div>
    </Container>
  );
};
export default TabletPage;

type Props = {
  cafe: CafeType;
  menus: CafeMenuType[];
};

export { getStaticPaths, getStaticProps } from '../[cafe_id]';
