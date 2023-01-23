import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { CardHeader, LinearProgress, Typography } from '@mui/material';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import Meta from 'src/common/Meta';
import { D_HOT_BEANS_PATH } from 'src/utils/routes';
import { useQuery } from 'react-query';
import HotBean from 'src/d/HotBean';

const metaData = {
  title: '핫(HOT) 원두 5+5 - 드링크뎁스',
  description:
    '매주 트래픽 등 복합적인 조사를 통해 한 주간 가장 핫한 주제로 오르내리던 원두들을 종합해 게이샤 + 넌 게이샤로 집어서 올려보겠습니다',
  image: '/images/logo_name_og.png',
  canonical: D_HOT_BEANS_PATH,
};

const HotBeansPage: NextPage = () => {
  return (
    <>
      <Meta data={metaData} />
      {/* <AuthContainer> */}
      <HeaderD
        centerComponent={
          <div css={{ display: 'flex' }}>
            <Typography fontSize={18} fontWeight={600}>
              핫(HOT) 원두
            </Typography>
          </div>
        }
      />

      <Main>
        <HotBeansContainer />
      </Main>

      <Navbar />
      {/* </AuthContainer> */}
    </>
  );
};

export default HotBeansPage;

const HOT_BEANS = 'hot_beans';
function HotBeansContainer() {
  const {
    data: allHotBeans,
    isLoading: isLoadingAllHotBeans,
    error,
  } = useQuery<HotBeanType[]>(HOT_BEANS, async () => {
    const result = await import('src/firebase/hot_beans_data');
    return result.default;
  });

  if (isLoadingAllHotBeans) return <LinearProgress />;
  if (error) return <div>오류가 발생했습니다.</div>;
  if (!allHotBeans) return <div>데이터가 없습니다.</div>;

  // console.log('allHotBeans : ', allHotBeans);

  const { month, week, fromDate, toDate } = allHotBeans[0].titleDate;

  return (
    <>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={700}>
            {month}월 {week}주차 ({new Date(fromDate).getDate()}일 ~{' '}
            {new Date(toDate).getDate()}일)
          </Typography>
        }
        sx={{ paddingBottom: 0, marginTop: '0.5rem' }}
      />

      <div css={{ '> div + div': { marginTop: '0.25rem' } }}>
        {allHotBeans.map((hotBean, i) => (
          <>
            {(i === 0 || allHotBeans[i - 1].type !== hotBean.type) && (
              <CardHeader
                title={
                  <Typography variant="h6" fontWeight={700} color="blue">
                    ★ {hotBean.type === 'geisha' ? '게이샤' : '넌 게이샤'} 파트
                  </Typography>
                }
                sx={{ paddingBottom: 0, marginTop: '0.5rem' }}
              />
            )}
            <HotBean key={i} hotBean={hotBean} />
          </>
        ))}
      </div>
    </>
  );
}
