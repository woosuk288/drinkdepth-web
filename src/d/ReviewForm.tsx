import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  SelectChangeEvent,
} from '@mui/material';

import { cafeMenuReviewState } from 'atoms/reviewFormAtom';
import { ChangeEvent, SyntheticEvent, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import StringTags from './StringTags';
import RadioGroupRating from './RadioGroupRating';
import SelectorOne from './SelectorOne';
import ContryComboBox from './ContryComboBox';
import { resize_image_file } from 'src/utils/resizeImages';
import SingleLineImageList from './HorizontalImageList';
import FlavorTags from './FlavorTags';
import CafeSearch from './CafeSearch';
import CafeSearchDialog from './CafeSearchDialog';

function ReviewForm() {
  const [review, setReview] = useRecoilState(cafeMenuReviewState);

  //   const { data, isLoading } = useQuery(FETCH_FLAVOR_WHEELS_KEY, () =>
  //   // fetchTagNames(auth.currentUser!.uid)
  //   ({
  //     flavors: ['꿀'],
  //   })
  // );

  const focusRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (review.place) {
      focusRef.current?.focus();
    }
  }, [review.place]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const keys = name.split('.');
    setReview(setNestedProp(review, keys, e.target.value));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.name;
    const keys = name.split('.');
    setReview(setNestedProp(review, keys, e.target.value));
  };

  const handleRatingChange = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setReview((prev) => ({ ...prev, rating: value ?? 0 }));
  };

  const onFileChangeCapture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    /*Selected files data can be collected here.*/
    // console.log(e.target.files);

    const files = e.target.files;

    if ((files?.length ?? 0) === 0) return;

    if (files) {
      // const file = e.target.files[0];

      if (review.images.length + files.length > 10) {
        // set helperText 최대 10장까지 가능합니다.
        return;
      }

      const resizedImages = await Promise.all(
        Array.from(files).map((file) => resize_image_file(file))
      );

      // console.log('resizedImages : ', resizedImages);

      const uploadImages = resizedImages.slice(0, 10).map((image) => {
        return {
          name: image.dataFile.name,
          url: image.dataURL,
          objectFit: 'cover' as const,
          rotate: 0,
        };
      });

      // setReview((prev) => ({
      //   ...prev,
      //   images: uploadImages,
      // }));

      // console.log('uploadImages : ', uploadImages);

      setReview((oldReview) => {
        // 파일 업로드시 이름 중복 방지 (ios safari에서 버그 발견)
        const images = [...oldReview.images, ...uploadImages].map(
          (image, i, array) => {
            let name = image.name;
            if (
              image.name === 'image' ||
              (i > 0 &&
                array
                  .filter((_, j) => j !== i)
                  .find((item) => item.name === name))
            ) {
              name = new Date().toISOString() + '_' + image.name;
            }

            return { ...image, name };
          }
        );

        // console.log('images : ', images);

        return {
          ...oldReview,
          images,
        };
      });

      // setSelectedIndex(review.images.length);
    }
  };

  const handleRemove = (index: number) => {
    setReview((oldReview) => ({
      ...oldReview,
      images: oldReview.images.filter((_, i) => i !== index),
    }));

    // if (index === selectedIndex) {
    //   setSelectedIndex(index === 0 ? 0 : index - 1);
    // } else {
    //   setSelectedIndex(selectedIndex === 0 ? 0 : selectedIndex - 1);
    // }
  };

  const handleTagsChange = (name: string, tags: string[]) => {
    const keys = name.split('.');
    setReview(setNestedProp(review, keys, tags));
  };

  // console.log('hiyo : ', review);

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
      {!review.place && <CafeSearchDialog setter={setReview} />}

      <div>
        <div>
          <InputLabel htmlFor="input-review-menu">메뉴명</InputLabel>
          <OutlinedInput
            inputRef={focusRef}
            id="input-review-menu"
            name="menuName"
            value={review.menuName}
            size="small"
            required
            fullWidth
            placeholder="메뉴명을 입력해주세요"
            onChange={handleChange}
          />
        </div>
        {/* <div>어떤 종류의 메뉴를 드셨나요?</div> */}
        <FormControl sx={{ marginTop: '1rem' }} required>
          <FormLabel id="input-review-type-label">종류</FormLabel>

          <RadioGroup
            row
            aria-labelledby="input-review-type-label"
            defaultValue=""
            name="type"
            onChange={handleChange}
            value={review.type}
          >
            <FormControlLabel
              value="filtered_coffee"
              control={<Radio />}
              label="원두커피"
            />
            <FormControlLabel
              value="coffee_drink"
              control={<Radio />}
              label="커피음료"
            />
          </RadioGroup>
          {!review.type && (
            <FormHelperText sx={{ margin: 0 }}>
              어떤 계열인지 선택해 주세요
            </FormHelperText>
          )}
        </FormControl>

        {/* menu-options */}
        {review.type === '' ? null : review.type === 'filtered_coffee' ? (
          <div css={{ '> div': { marginTop: '12px' } }}>
            <div>
              <InputLabel
                htmlFor="input-review-bean"
                sx={{ fontSize: 14, marginLeft: '14px' }}
              >
                원두명
              </InputLabel>
              <OutlinedInput
                id="input-review-bean"
                name="coffee.bean"
                size="small"
                fullWidth
                onChange={handleChange}
              />
            </div>
            <div>
              <InputLabel
                htmlFor="input-review-country"
                sx={{ fontSize: 14, marginLeft: '14px' }}
              >
                원산지
              </InputLabel>
              <ContryComboBox
                name="coffee.country"
                handleChange={handleChange}
              />
            </div>
            <div css={{ display: 'flex' }}>
              <SelectorOne
                helperText="산미"
                tooltip="커피에서 긍정적인 신맛 상큼함을 의미합니다. 산미단계가 높을수록 신맛이 강해집니다"
                name="coffee.acidity"
                value={review.coffee?.acidity ?? ''}
                options={[
                  { label: '매우 낮음', value: '매우 낮음' },
                  { label: '낮음', value: '낮음' },
                  { label: '보통', value: '보통' },
                  { label: '높음', value: '높음' },
                  { label: '매우 높음', value: '매우 높음' },
                ]}
                handleChange={handleSelectChange}
                // disabled={disabled}
              />

              <SelectorOne
                helperText="단맛"
                tooltip="......"
                name="coffee.sweetness"
                value={review.coffee?.sweetness ?? ''}
                options={[
                  { label: '매우 낮음', value: '매우 낮음' },
                  { label: '낮음', value: '낮음' },
                  { label: '보통', value: '보통' },
                  { label: '높음', value: '높음' },
                  { label: '매우 높음', value: '매우 높음' },
                ]}
                handleChange={handleSelectChange}
                // disabled={disabled}
              />
            </div>

            <div>
              <FlavorTags
                id="filtered-coffee"
                tooltip="맛과 향을 의미합니다"
                helperText="향미노트"
                value={review.coffee?.flavors}
                name={'coffee.flavors'}
                onChange={handleTagsChange}
              />
            </div>
          </div>
        ) : (
          <div css={{ marginTop: '0.5rem' }}>
            <FlavorTags
              id="tags-coffee-drink"
              tooltip="맛과 향을 의미합니다"
              helperText="향미노트"
              value={review.coffee?.flavors}
              name={'coffee.flavors'}
              onChange={handleTagsChange}
            />
          </div>
        )}
      </div>

      <div css={{ marginTop: '1rem' }}>
        <InputLabel>사진</InputLabel>

        <SingleLineImageList
          images={review.images}
          onFileChangeCapture={onFileChangeCapture}
          handleRemove={handleRemove}
          // handleThumbnailClick={handleThumbnailClick}
        />
      </div>

      <div css={{ marginTop: '1rem' }}>
        <InputLabel htmlFor="input-review-keywords">편의적 측면</InputLabel>
        <StringTags
          id="input-review-keywords"
          value={review.keywords}
          name={'keywords'}
          onChange={handleTagsChange}
          placeholder="키워드를 입력해주세요"
        />
      </div>

      <div css={{ marginTop: '1rem' }}>
        <InputLabel htmlFor="input-review-text">한줄평</InputLabel>
        <OutlinedInput
          id="input-review-text"
          name="text"
          value={review.text}
          size="small"
          fullWidth
          multiline
          minRows={3}
          // maxRows={3}
          onChange={handleChange}
        />

        <div css={{ marginTop: '2rem', textAlign: 'center' }}>
          <RadioGroupRating
            name="rating"
            value={review.rating}
            onChange={handleRatingChange}
          />
        </div>
      </div>
    </Box>
  );
}
export default ReviewForm;

const setNestedProp = (
  obj: Record<string, any>,
  [first, ...rest]: string[],
  value: string | string[]
): any => ({
  ...obj,
  [first]: rest.length ? setNestedProp(obj[first], rest, value) : value,
});
