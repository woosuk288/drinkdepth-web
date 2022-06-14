import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
      }}
    >
      <FormControl size="small">
        <FormHelperText>
          카페인유무
          {/* <span>
            <InfoOutlinedIcon sx={{ paddingLeft: '0.5rem' }} />
          </span> */}
        </FormHelperText>
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
        <FormHelperText>로스팅</FormHelperText>
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
        <FormHelperText>산미</FormHelperText>
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
