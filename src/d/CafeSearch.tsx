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
const autocompleteService: { current: null | kakao.maps.services.Places } = {
  current: null,
};

export interface PlaceType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

type Props = {
  sx?: SxProps;
  handleSelect: (result: PlaceType) => void;
};
export default function KakaoMapsSearch({ sx, handleSelect }: Props) {
  const { loading, error } = useInjectKakaoMapApi({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!, // 발급 받은 APPKEY
    libraries: ['services', 'clusterer'],
  });

  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (
            autocompleteService.current as kakao.maps.services.Places
          ).keywordSearch(
            request.input,
            callback,
            // placesSearchCB
            { category_group_code: 'CE7' }
          );
        },
        500
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).kakao) {
      autocompleteService.current = new (
        window as any
      ).kakao.maps.services.Places();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

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
      id="kakao-map-search"
      sx={sx}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.place_name
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      forcePopupIcon={false}
      open={!!inputValue}
      noOptionsText={'결과 없음'}
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
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
          placeholder="카페를 검색해 보세요."
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
          <li {...props} key={option.id}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {option.place_name}
                <Typography variant="body2" color="text.secondary">
                  {option.road_address_name}
                </Typography>
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
