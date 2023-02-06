import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import HeaderD from './HeaderD';

import Main from './Main';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import { FilterType } from 'pages/d/mania_cafes';

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
  headerCenterComponent?: React.ReactNode;
  realFilter: FilterType;
  handleConfirm: (newFilter: FilterType) => void;
  fakeFilter: FilterType;
  handleFakeFilter: (newFakeFilter: FilterType) => void;
};

export default function ManiaCafeDialog({
  open,
  handleClose,
  headerCenterComponent,
  realFilter,
  handleConfirm,
  fakeFilter,
  handleFakeFilter,
}: Props) {
  const handleLocationChange = (
    _: any,
    value: { label: string; sido: string; gungu: string } | null
  ) => {
    const { sido, gungu } = value ?? { sido: '', gungu: '' };
    handleFakeFilter({ ...fakeFilter, sido, gungu, subway: '' });
  };
  const handleStationChange = (_: any, value: { label: string } | null) => {
    const { label } = value ?? { label: '' };
    handleFakeFilter({ ...fakeFilter, subway: label, sido: '', gungu: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFakeFilter({ ...fakeFilter, [e.target.name]: e.target.checked });
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {Boolean(headerCenterComponent) && (
        <HeaderD
          leftIcon="back"
          centerComponent={headerCenterComponent}
          rightIcon={
            <Button
              sx={{ fontSize: 15, fontWeight: 600, marginLeft: '-0.25rem' }}
              onClick={() => handleConfirm(fakeFilter)}
            >
              적용
            </Button>
          }
        />
      )}
      <Main sx={{ width: '100%' }}>
        <div css={{ margin: '1rem', display: 'flex' }}>
          <Autocomplete
            id="filter-cafe-location"
            disablePortal
            options={locations}
            // sx={{ width: 300 }}
            fullWidth
            size="small"
            autoComplete={false}
            renderInput={(params) => <TextField {...params} label="지역" />}
            value={
              locations.find(
                (location) =>
                  location.sido === fakeFilter.sido &&
                  location.gungu === fakeFilter.gungu
              ) ?? null
            }
            onChange={handleLocationChange}
          />
          <Autocomplete
            id="filter-cafe-station"
            disablePortal
            options={stations}
            // sx={{ width: 300 }}
            fullWidth
            size="small"
            renderInput={(params) => (
              <TextField {...params} autoComplete="off" label="지하철" />
            )}
            value={
              stations.find((station) => station.label === fakeFilter.subway) ??
              null
            }
            onChange={handleStationChange}
          />
        </div>
        <div css={{ margin: '1rem' }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fakeFilter.parking}
                  onChange={handleChange}
                  name="parking"
                />
              }
              label="주차 가능"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fakeFilter.wifi}
                  onChange={handleChange}
                  name="wifi"
                />
              }
              label="무선 인터넷"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fakeFilter.pet}
                  onChange={handleChange}
                  name="pet"
                />
              }
              label="반려동물"
            />
          </FormGroup>
        </div>
      </Main>
    </Dialog>
  );
}

const locations = [
  { label: '서울 강남구', sido: '서울특별시', gungu: '강남구' },
  { label: '서울 강동구', sido: '서울특별시', gungu: '강동구' },
  { label: '서울 강북구', sido: '서울특별시', gungu: '강북구' },
  { label: '서울 강서구', sido: '서울특별시', gungu: '강서구' },
  { label: '서울 관악구', sido: '서울특별시', gungu: '관악구' },
  { label: '서울 광진구', sido: '서울특별시', gungu: '광진구' },
  { label: '서울 구로구', sido: '서울특별시', gungu: '구로구' },
  { label: '서울 금천구', sido: '서울특별시', gungu: '금천구' },
  { label: '서울 노원구', sido: '서울특별시', gungu: '노원구' },
  { label: '서울 도봉구', sido: '서울특별시', gungu: '도봉구' },
  { label: '서울 동대문구', sido: '서울특별시', gungu: '동대문구' },
  { label: '서울 동작구', sido: '서울특별시', gungu: '동작구' },
  { label: '서울 마포구', sido: '서울특별시', gungu: '마포구' },
  { label: '서울 서대문구', sido: '서울특별시', gungu: '서대문구' },
  { label: '서울 서초구', sido: '서울특별시', gungu: '서초구' },
  { label: '서울 성동구', sido: '서울특별시', gungu: '성동구' },
  { label: '서울 성북구', sido: '서울특별시', gungu: '성북구' },
  { label: '서울 송파구', sido: '서울특별시', gungu: '송파구' },
  { label: '서울 양천구', sido: '서울특별시', gungu: '양천구' },
  { label: '서울 영등포구', sido: '서울특별시', gungu: '영등포구' },
  { label: '서울 용산구', sido: '서울특별시', gungu: '용산구' },
  { label: '서울 은평구', sido: '서울특별시', gungu: '은평구' },
  { label: '서울 종로구', sido: '서울특별시', gungu: '종로구' },
  { label: '서울 중구', sido: '서울특별시', gungu: '중구' },
  { label: '서울 중랑구', sido: '서울특별시', gungu: '중랑구' },
];

const stations = [
  // { label: '' },
  { label: '가좌역' },
  { label: '강동구청역' },
  { label: '경복궁역' },
  { label: '공덕역' },
  { label: '공릉역' },
  { label: '광화문역' },
  { label: '광흥창역' },
  { label: '구파발역' },
  { label: '군자역' },
  { label: '낙성대역' },
  { label: '남구로역' },
  { label: '남부터미널역' },
  { label: '남영역' },
  { label: '내방역' },
  { label: '녹사평역' },
  { label: '대흥역' },
  { label: '동대입구역' },
  { label: '뚝섬역' },
  { label: '마포구청역' },
  { label: '마포역' },
  { label: '망원역' },
  { label: '매봉역' },
  { label: '명동역' },
  { label: '문래역' },
  { label: '발산역' },
  { label: '방이역' },
  { label: '상수역' },
  { label: '상왕십리역' },
  { label: '서대문역' },
  { label: '서울대입구역' },
  { label: '서울숲역' },
  { label: '서울역' },
  { label: '성수역' },
  { label: '성신여대입구역' },
  { label: '송정역' },
  { label: '송파나루역' },
  { label: '송파역' },
  { label: '수색역' },
  { label: '수유역' },
  { label: '숙대입구역' },
  { label: '시청역' },
  { label: '신도림역' },
  { label: '신사역' },
  { label: '안국역' },
  { label: '압구정역' },
  { label: '약수역' },
  { label: '양재역' },
  { label: '어린이대공원역' },
  { label: '여의나루역' },
  { label: '역삼역' },
  { label: '올림픽공원역' },
  { label: '을지로3가역' },
  { label: '을지로입구역' },
  { label: '종각역' },
  { label: '종로3가역' },
  { label: '종합운동장역' },
  { label: '중랑역' },
  { label: '청량리역' },
  { label: '충무로역' },
  { label: '한강진역' },
  { label: '합정역' },
  { label: '혜화역' },
  { label: '홍대입구역' },
  { label: '홍제역' },
  { label: '효창공원앞역' },
];
