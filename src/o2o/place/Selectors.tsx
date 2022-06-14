import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import React from 'react';
import { ChoiceType } from '../../../pages/o2o/place';

type SelectorsProps = {
  choice: ChoiceType;
  handleChange: (event: SelectChangeEvent) => void;
};

function Selectors({ choice, handleChange }: SelectorsProps) {
  // const [age, setAge] = React.useState('');

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        margin: '0.5rem',
        marginTop: 0,
        '& > .MuiFormControl-root': { flex: 1 },
        '& .MuiFormHelperText-root': { fontSize: 14, position: 'relative' },
        '& .MuiSvgIcon-root': { position: 'absolute', paddingBottom: '0.5rem' },
      }}
    >
      <FormControl size="small">
        <Tooltip
          arrow
          enterTouchDelay={10}
          leaveTouchDelay={3000}
          title="커피 전문점 이용 기준 성인 기준 1일 1잔~ 2잔 사이 추천드립니다. 카페인은 과다 섭취시 카페인 중독,불면증 등 여러 질환을 유발할 수 있습니다."
        >
          <FormHelperText>
            카페인유무
            <InfoOutlinedIcon />
          </FormHelperText>
        </Tooltip>
        <Select
          name="hasCaffein"
          value={choice.hasCaffein}
          displayEmpty
          onChange={handleChange}
          sx={{ fontWeight: choice.hasCaffein && 'bold' }}
        >
          <MenuItem value="">
            <em>상관없음</em>
          </MenuItem>
          <MenuItem value={'카페인'}>카페인</MenuItem>
          <MenuItem value={'디카페인'}>디카페인</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <Tooltip
          arrow
          enterTouchDelay={10}
          leaveTouchDelay={3000}
          title="다크로 갈수록 쓴맛 진한맛이 강해집니다. 미디움 라이트로 갈수록 신맛 감미로운 향이 강조됩니다."
        >
          <FormHelperText>
            로스팅
            <InfoOutlinedIcon />
          </FormHelperText>
        </Tooltip>
        <Select
          labelId="select-caffein-label"
          id="demo-simple-select-disabled"
          name="roasting"
          value={choice.roasting}
          displayEmpty
          onChange={handleChange}
          sx={{ fontWeight: choice.roasting && 'bold' }}
        >
          <MenuItem value="">
            <em>상관없음</em>
          </MenuItem>
          <MenuItem value={'라이트로스팅'}>라이트</MenuItem>
          <MenuItem value={'라이트미디엄로스팅'}>라이트미디엄</MenuItem>
          <MenuItem value={'미디엄로스팅'}>미디엄</MenuItem>
          <MenuItem value={'미디엄다크로스팅'}>미디엄다크</MenuItem>
          <MenuItem value={'다크로스팅'}>다크</MenuItem>
        </Select>
        {/* <FormHelperText>Disabled</FormHelperText> */}
      </FormControl>
      <FormControl size="small">
        <Tooltip
          arrow
          enterTouchDelay={10}
          leaveTouchDelay={3000}
          title="커피에서 긍정적인 신맛 상큼함을 의미합니다. 산미단계가 높을수록 신맛이 강해집니다"
        >
          <FormHelperText>
            산미
            <InfoOutlinedIcon />
          </FormHelperText>
        </Tooltip>
        <Select
          name="acidity"
          value={choice.acidity}
          displayEmpty
          onChange={handleChange}
          sx={{ fontWeight: choice.acidity && 'bold' }}
        >
          <MenuItem value="">
            <em>상관없음</em>
          </MenuItem>
          <MenuItem value={'1'}>매우 낮음</MenuItem>
          <MenuItem value={'2'}>낮음</MenuItem>
          <MenuItem value={'3'}>보통</MenuItem>
          <MenuItem value={'4'}>높음</MenuItem>
          <MenuItem value={'5'}>아주 높음</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Selectors;
