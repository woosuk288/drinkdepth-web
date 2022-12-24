import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import Menus from 'src/cafe/Menus';
import Meta from 'src/common/Meta';
import { CAFE_PATH } from 'src/utils/routes';

// import CouponWIthQR from 'src/cafe/tablet/CouponWIthQR';
import BannerCarousel from 'src/cafe/tablet/BannerCarousel';
import CafeHeader from 'src/cafe/B2BHeader';
import useScrollY from 'src/hooks/useScrollY';
import { apiCafe, apiMenu } from 'src/firebase/api';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

/**
 * only access offlineqrtablet.drinkdepth.com
 */

const TabletPage: NextPage<Props> = ({ cafe, menus }) => {
  const metaData = {
    title: `카페 메뉴 | ${cafe.name} | 태블릿`,
    description: cafe.introduce,
    image: cafe.imageURL,
    canonical: `${CAFE_PATH}/${cafe.id}`,
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

interface Params extends ParsedUrlQuery {
  cafe_id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const cafes = await apiCafe.list();

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await apiCafe.cache.set(cafes);
  }

  return {
    paths: cafes.map((cafe) => ({
      params: {
        cafe_id: cafe.id,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  let cafe = await apiCafe.cache.get(params!.cafe_id);

  if (!cafe) {
    cafe = await apiCafe.fetch(params!.cafe_id);
  }

  if (!cafe) {
    return {
      notFound: true,
    };
  }

  const menus = await apiMenu.list();

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await apiMenu.cache.set(menus);
  }

  return {
    props: {
      cafe,
      menus,
    },

    revalidate: 1800,
  };
};
