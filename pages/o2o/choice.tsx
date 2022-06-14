import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChoiceType } from './place';
import { choiceVar } from '../../apollo/client';
import { useReactiveVar } from '@apollo/client';

const ChoicePage: NextPage = () => {
  const router = useRouter();

  const choice = useReactiveVar(choiceVar);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChoice = {
      ...choice,
      [event.target.name]: event.target.value,
    };

    choiceVar(newChoice);
  };

  console.log('choice : ', choice);

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          marginTop: '2rem',
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
            <Tooltip
              arrow
              title="'밤에 카페인음료를 마시면 잠이 오질 않아요~'"
              enterTouchDelay={10}
              leaveTouchDelay={3000}
            >
              <span>
                1. 카페인 or 디카페인
                <InfoOutlinedIcon sx={{ marginLeft: '0.5rem' }} />
              </span>
            </Tooltip>
          </FormLabel>

          <RadioGroup
            // row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="hasCaffein"
            defaultValue={''}
            onChange={handleChange}
            value={choice.hasCaffein}
          >
            <FormControlLabel
              value="카페인"
              control={<Radio />}
              label="카페인"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="디카페인"
              control={<Radio />}
              label="디카페인"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value=""
              control={<Radio />}
              label="상관없음"
              // labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            <Tooltip
              arrow
              title="카페인???카페인???카페인???카페인???카페인???카페인???카페인???카페인???카페인???카페인???"
              enterTouchDelay={10}
              leaveTouchDelay={3000}
            >
              <span>
                2. 로스팅 정도
                <InfoOutlinedIcon sx={{ marginLeft: '0.5rem' }} />
              </span>
            </Tooltip>
          </FormLabel>
          <RadioGroup
            // row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="roasting"
            defaultValue={''}
            value={choice.roasting}
            onChange={handleChange}
          >
            <FormControlLabel
              value="라이트로스팅"
              control={<Radio />}
              label="라이트"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="라이트미디엄로스팅"
              control={<Radio />}
              label="라이트미디엄"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="미디엄로스팅"
              control={<Radio />}
              label="미디엄"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="미디엄다크로스팅"
              // value="disabled"
              // disabled
              control={<Radio />}
              label="미디엄다크"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="다크로스팅"
              control={<Radio />}
              label="다크"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value=""
              control={<Radio />}
              label="상관없음"
              // labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            <Tooltip
              arrow
              title="카페인???"
              enterTouchDelay={10}
              leaveTouchDelay={3000}
            >
              <span>
                3. 산미
                <InfoOutlinedIcon sx={{ marginLeft: '0.5rem' }} />
              </span>
            </Tooltip>
          </FormLabel>
          <RadioGroup
            // row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="acidity"
            defaultValue={''}
            value={choice.acidity}
            onChange={handleChange}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="매우 낮음"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="낮음"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="보통"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="4"
              // value="disabled"
              // disabled
              control={<Radio />}
              label="높음"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="매우 높음"
              // labelPlacement="bottom"
            />
            <FormControlLabel
              value=""
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
