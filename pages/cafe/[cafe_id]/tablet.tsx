import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import Menus from 'src/cafe/Menus';
import Meta from 'src/common/Meta';
import { AuthUserProvider } from 'src/context/AuthUserContext';
import { fetchCafe, fetchCafeMenus, fetchCafes } from 'src/firebase/services';
import { CAFE_PATH } from 'src/utils/routes';

import CouponWIthQR from 'src/cafe/tablet/CouponWIthQR';
import BannerCarousel from 'src/cafe/tablet/BannerCarousel';
import CafeHeader from 'src/cafe/Header';

const TabletPage: NextPage<Props> = ({ cafe, menus }) => {
  const metaData = {
    title: `카페 메뉴 | ${cafe.name} | 태블릿`,
    description: cafe.introduce,
    image: cafe.imageURL,
    canonical: `${CAFE_PATH}/${cafe.id}`,
  };

  /**
   * only access offlineqrtablet.drinkdepth.com
   */

  return (
    <Container maxWidth="sm" disableGutters>
      <Meta data={metaData} />

      <AuthUserProvider>
        <CafeHeader title={cafe.name} />
        <BannerCarousel imageURLs={cafe.imageOfflineURLs} />
        <CouponWIthQR cafeId={cafe.id} />
        <Menus
          menus={menus}
          sx={{
            '& > h6': { marginTop: '0.75rem', marginBottom: 0 },
            '& > ul > li .MuiAvatar-root': { width: '160px', height: '160px' },
          }}
        />

        <div style={{ height: '80px' }}></div>
      </AuthUserProvider>
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
  const cafes = await fetchCafes();

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
  const cafe = await fetchCafe(params!.cafe_id);
  const menus = await fetchCafeMenus(params!.cafe_id);

  if (!cafe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cafe,
      menus,
    },

    revalidate: 1800,
  };
};
