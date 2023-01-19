import { useEffect } from 'react';
import { useInjectKakaoMapApi } from 'react-kakao-maps-sdk';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import debounce from 'lodash/debounce';
import { InputAdornment, SxProps } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

// 장소 검색 객체를 생성합니다
const autocompleteService: { current: null | kakao.maps.services.Geocoder } = {
  current: null,
};

export interface AddressType {
  /* 전체 지번 주소 또는 전체 도로명 주소, 입력에 따라 결정됨 */
  address_name: string;
  /* address_name의 값의 타입(Type) 다음 중 하나: REGION(지명) ROAD(도로명) REGION_ADDR(지번 주소) ROAD_ADDR(도로명 주소) */
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string;
  y: string;

  /* 지번 주소 상세 정보 */
  address: {
    /* 전체 지번 주소 */
    address_name: string;
    /* 지역 1 Depth, 시도 단위 */
    region_1depth_name: string;
    /* 지역 2 Depth, 구 단위 */
    region_2depth_name: string;
    /* 지역 3 Depth, 동 단위 */
    region_3depth_name: string;
    /* 지역 3 Depth, 행정동 명칭 */
    region_3depth_h_name: string;
    /* 행정 코드 */
    h_code: string;
    /* 법정 코드 */
    b_code: string;
    /* 산 여부, Y 또는 N */
    mountain_yn: string;
    /* 지번 주번지 */
    main_address_no: string;
    /* 지번 부번지, 없을 경우 빈 문자열("") 반환 */
    sub_address_no: string;
    /* X 좌표값, 경위도인 경우 경도(longitude) */
    x: string;
    /* Y 좌표값, 경위도인 경우 위도(latitude) */
    y: string;
  };

  /* 도로명 주소 상세 정보 */
  road_address: {
    /* 	전체 도로명 주소 */
    address_name: string;
    /* 	지역명1 */
    region_1depth_name: string;
    /* 	지역명2 */
    region_2depth_name: string;
    /* 	지역명3 */
    region_3depth_name: string;
    /* 	도로명 */
    road_name: string;
    /* 	지하 여부, Y 또는 N */
    underground_yn: string;
    /* 	건물 본번 */
    main_building_no: string;
    /* 	건물 부번, 없을 경우 빈 문자열("") 반환 */
    sub_building_no: string;
    /* 	건물 이름 */
    building_name: string;
    /* 	우편번호(5자리) */
    zone_no: string;
    /* 	X 좌표값, 경위도인 경우 경도(longitude) */
    x: string;
    /* 	Y 좌표값, 경위도인 경우 위도(latitude) */
    y: string;
  };
}

type Props = {
  sx?: SxProps;
  handleSelect: (result: AddressType) => void;
};
export default function KakaoAddressSearch({ sx, handleSelect }: Props) {
  const { loading, error } = useInjectKakaoMapApi({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!, // 발급 받은 APPKEY
    libraries: ['services', 'clusterer'],
  });

  const [value, setValue] = React.useState<AddressType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly AddressType[]>([]);

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly AddressType[]) => void
        ) => {
          (
            autocompleteService.current as kakao.maps.services.Geocoder
          ).addressSearch(request.input, callback);
        },
        500
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).kakao) {
      autocompleteService.current = new window.kakao.maps.services.Geocoder();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly AddressType[]) => {
      if (active) {
        let newOptions: readonly AddressType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="kakao-address-search"
      sx={sx}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.address_name
      }
      filterOptions={(x) => x.filter((x) => x.address_type === 'REGION')}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      forcePopupIcon={false}
      open={!!inputValue}
      noOptionsText={'결과 없음'}
      value={value}
      onChange={(event: any, newValue: AddressType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);

        if (newValue) {
          handleSelect(newValue);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          autoFocus
          placeholder="인사동, 강남구 등"
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ marginLeft: '0.25rem', marginRight: '-0.25rem' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.x + '_' + option.y}>
            <Grid container alignItems="center">
              <Grid item xs>
                {option.address_name}
                {/* <Typography variant="body2" color="text.secondary">
                  {option.road_address_name}
                </Typography> */}
              </Grid>
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', ml: 2 }}
                />
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

// 키워드 검색을 요청하는 함수입니다
function searchPlaces(keyword: string) {
  var ps = new kakao.maps.services.Places();

  // var keyword = document.getElementById('keyword').value;

  if (!keyword.replace(/^\s+|\s+$/g, '')) {
    alert('키워드를 입력해주세요!');
    return false;
  }

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(
  data: any,
  status: kakao.maps.services.Status,
  pagination: any
) {
  console.log('data : ', data);
  console.log('status : ', status);
  console.log('pagination : ', pagination);

  if (status === kakao.maps.services.Status.OK) {
    // 정상적으로 검색이 완료됐으면
    // 검색 목록과 마커를 표출합니다
    // displayPlaces(data);
    // 페이지 번호를 표출합니다
    // displayPagination(pagination);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert('검색 결과가 존재하지 않습니다.');
    return;
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert('검색 결과 중 오류가 발생했습니다.');
    return;
  }
}
