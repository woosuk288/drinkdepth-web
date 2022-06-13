import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const ChoicePage: NextPage = () => {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& .MuiFormControl-root': {
            marginY: '1rem',
          },
          '& .MuiFormLabel-root': {
            fontSize: '1.25rem',
            fontWeight: 'bold',
          },
          '& .MuiFormGroup-root': {
            margin: '0.5rem 1rem',
          },
        }}
      >
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            1. 카페인 or 디카페인
          </FormLabel>

          <RadioGroup
            // row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={'all'}
          >
            <FormControlLabel
              value="caffeine"
              control={<Radio />}
              label="카페인"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="decaffeination"
              control={<Radio />}
              label="디카페인"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="상관없음"
              // labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            2. 로스팅 정도
          </FormLabel>
          <RadioGroup
            // row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={'all'}
          >
            <FormControlLabel
              value="light"
              control={<Radio />}
              label="라이트"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="light_medium"
              control={<Radio />}
              label="라이트미디엄"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label="미디엄"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="medium_dark"
              // value="disabled"
              // disabled
              control={<Radio />}
              label="미디엄다크"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="dark"
              control={<Radio />}
              label="다크"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="상관없음"
              // labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">3. 산미</FormLabel>
          <RadioGroup
            // row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={'all'}
          >
            <FormControlLabel
              value="lowest"
              control={<Radio />}
              label="매우 낮음"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="low"
              control={<Radio />}
              label="낮음"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label="보통"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="high"
              // value="disabled"
              // disabled
              control={<Radio />}
              label="높음"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="highest"
              control={<Radio />}
              label="매우 높음"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="상관없음"
              // labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>

        {/* 카페인여부, 로스팅, 산미 */}

        {/* 카페이름, 주소, 전화번호, ......좌표  */}
        {/* 음료이름, 풍미main, sub  */}

        <Button
          variant="contained"
          sx={{ marginBottom: '2rem' }}
          onClick={() => router.push('/o2o/place')}
        >
          찾기
        </Button>
      </Box>
    </Container>
  );
};

export default ChoicePage;
