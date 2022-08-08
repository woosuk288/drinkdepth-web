import { Box, SelectChangeEvent } from '@mui/material';

import React from 'react';
import { ChoiceType } from '../../../pages/o2o/place';

import Selector from './Selector';

type SelectorsProps = {
  choice: ChoiceType;
  handleChange: (event: SelectChangeEvent<string[]>) => void;
  disabled?: boolean;
};

function Selectors({ choice, handleChange, disabled = false }: SelectorsProps) {
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
      <Selector
        helperText="카페인유무"
        tooltip="커피 전문점 이용 기준 성인 기준 1일 1잔~ 2잔 사이 추천드립니다. 카페인은 과다 섭취시 카페인 중독,불면증 등 여러 질환을 유발할 수 있습니다."
        name="caffein"
        value={choice.caffein}
        options={[
          { label: '카페인', value: '카페인' },
          { label: '디카페인', value: '디카페인' },
        ]}
        handleChange={handleChange}
        disabled={disabled}
      />

      <Selector
        helperText="로스팅"
        tooltip="다크로 갈수록 쓴맛 진한맛이 강해집니다. 미디움 라이트로 갈수록 신맛 감미로운 향이 강조됩니다."
        name="roasting"
        value={choice.roasting}
        options={[
          { label: '라이트', value: '라이트로스팅' },
          { label: '라이트미디엄', value: '라이트미디엄로스팅' },
          { label: '미디엄', value: '미디엄로스팅' },
          { label: '미디엄다크', value: '미디엄다크로스팅' },
          { label: '다크', value: '다크로스팅' },
        ]}
        handleChange={handleChange}
        disabled={disabled}
      />

      <Selector
        helperText="산미"
        tooltip="커피에서 긍정적인 신맛 상큼함을 의미합니다. 산미단계가 높을수록 신맛이 강해집니다"
        name="acidity"
        value={choice.acidity}
        options={[
          { label: '매우 낮음', value: '매우 낮음' },
          { label: '낮음', value: '낮음' },
          { label: '보통', value: '보통' },
          { label: '높음', value: '높음' },
          { label: '매우 높음', value: '매우 높음' },
        ]}
        handleChange={handleChange}
        disabled={disabled}
      />
    </Box>
  );
}

export default Selectors;
