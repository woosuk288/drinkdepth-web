import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { cafeMenuReviewState } from 'atoms/reviewFormAtom';
import { SyntheticEvent } from 'react';
import { useRecoilState } from 'recoil';
import FlavorTags from './FlavorTags';
import RadioGroupRating from './RadioGroupRating';
import SelectorOne from './SelectorOne';

function ReviewForm() {
  const [review, setReview] = useRecoilState(cafeMenuReviewState);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'acidity') {
      setReview((prev) => ({
        ...prev,
        coffee: { ...prev.coffee, acidity: event.target.value },
      }));
    } else if (event.target.name === 'sweetness') {
      setReview((prev) => ({
        ...prev,
        coffee: { ...prev.coffee, sweetness: event.target.value },
      }));
    }
  };

  const handleRatingChange = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setReview((prev) => ({
      ...prev,
      coffee: { ...prev.coffee, rating: value },
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        padding: '1rem',
        '.MuiInputLabel-root': {
          marginBottom: '0.25rem',
        },
      }}
      noValidate
      autoComplete="off"
    >
      <InputLabel htmlFor="input-cafename">카페명</InputLabel>
      <OutlinedInput
        id="input-cafename"
        aria-describedby="my-helper-text"
        size="small"
        fullWidth
        autoFocus
      />
      <FormHelperText id="my-helper-text">주소</FormHelperText>

      <div css={{ marginTop: '1rem' }}>
        <div>
          <InputLabel htmlFor="input-review-menu">메뉴 이름</InputLabel>
          <OutlinedInput id="input-review-menu" size="small" fullWidth />
        </div>
        {/* <div>어떤 종류의 메뉴를 드셨나요?</div> */}

        <div className="menu-options" css={{ paddingLeft: '3rem' }}>
          <div css={{ display: 'flex', marginTop: '10px' }}>
            <SelectorOne
              helperText="산미"
              tooltip="커피에서 긍정적인 신맛 상큼함을 의미합니다. 산미단계가 높을수록 신맛이 강해집니다"
              name="acidity"
              value={review.coffee?.acidity ?? ''}
              options={[
                { label: '매우 낮음', value: '매우 낮음' },
                { label: '낮음', value: '낮음' },
                { label: '보통', value: '보통' },
                { label: '높음', value: '높음' },
                { label: '매우 높음', value: '매우 높음' },
              ]}
              handleChange={handleChange}
              // disabled={disabled}
            />

            <SelectorOne
              helperText="단맛"
              tooltip="......"
              name="sweetness"
              value={review.coffee?.sweetness ?? ''}
              options={[
                { label: '매우 낮음', value: '매우 낮음' },
                { label: '낮음', value: '낮음' },
                { label: '보통', value: '보통' },
                { label: '높음', value: '높음' },
                { label: '매우 높음', value: '매우 높음' },
              ]}
              handleChange={handleChange}
              // disabled={disabled}
            />
          </div>

          <FlavorTags tooltip="......" helperText="맛과향" />

          <div css={{ marginTop: '8px' }}>
            <FormHelperText sx={{ fontSize: 14, marginLeft: '14px' }}>
              사진
            </FormHelperText>

            <Button
              color="inherit"
              aria-label="upload picture"
              component="label"
              sx={{ border: '1px dotted', width: 80, height: 80 }}
            >
              <input hidden accept="image/*" type="file" />
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>

      <div css={{ marginTop: '1rem' }}>
        <InputLabel htmlFor="input-review-comment">한줄평</InputLabel>
        <OutlinedInput
          id="input-review-comment"
          size="small"
          fullWidth
          multiline
          rows={3}
          placeholder="주문하신 메뉴는 어떠셨나요? 같이 드신 디저트도 궁금해요!"
          // maxRows={3}
        />

        <div css={{ marginTop: '2rem', textAlign: 'center' }}>
          <RadioGroupRating
            name="rating"
            value={review.coffee?.rating ?? null}
            onChange={handleRatingChange}
          />
        </div>
      </div>
    </Box>
  );
}
export default ReviewForm;
