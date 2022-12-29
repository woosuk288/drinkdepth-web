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
import { resize_image_file } from 'src/utils/resizeImages';
import SingleLineImageList from './HorizontalImageList';
import FlavorTags from './FlavorTags';
// import CafeSearch from './CafeSearch';
import CafeSearchDialog from './CafeSearchDialog';
import ComboBox from './ComboBox';

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

  // console.log('review : ', review);

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
              value="other_drink"
              control={<Radio />}
              label="그 외 음료"
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
            <FormControl required fullWidth>
              {/* <InputLabel htmlFor="input-review-menu">메뉴명</InputLabel> */}
              <FormLabel id="input-review-menu" sx={{ marginBottom: '4px' }}>
                메뉴명(원두명)
              </FormLabel>
              <OutlinedInput
                inputRef={focusRef}
                id="input-review-menu"
                name="menuName"
                // label="메뉴명"
                value={review.menuName}
                size="small"
                placeholder="메뉴명을 입력해주세요"
                onChange={handleChange}
              />
            </FormControl>

            <div>
              <FormLabel
                id="input-review-bean-type-label"
                // sx={{ fontSize: 14, marginLeft: '14px' }}
              >
                원두
              </FormLabel>

              <RadioGroup
                row
                aria-labelledby="input-review-bean-type-label"
                defaultValue=""
                name="coffee.beanType"
                onChange={handleChange}
                value={review.coffee?.beanType ?? ''}
              >
                <FormControlLabel
                  value="single_origin"
                  control={<Radio />}
                  label="싱글오리진"
                />
                <FormControlLabel
                  value="blend"
                  control={<Radio />}
                  label="블렌드"
                />
                <FormControlLabel
                  value="americano"
                  control={<Radio />}
                  label="아메리카노"
                />
              </RadioGroup>
            </div>

            <div css={{ display: 'flex' }}>
              {review.coffee?.beanType === 'single_origin' && (
                <div css={{ flex: 0.5 }}>
                  <InputLabel
                    htmlFor="input-review-country"
                    sx={{ fontSize: 14, marginLeft: '14px' }}
                  >
                    원산지
                  </InputLabel>
                  <ComboBox
                    options={coffeeCountries}
                    name="coffee.country"
                    value={review.coffee.country}
                    handleChange={handleChange}
                  />
                </div>
              )}
              {(review.coffee?.beanType === 'single_origin' ||
                review.coffee?.beanType === 'blend') && (
                <div css={{ flex: 0.5 }}>
                  <InputLabel
                    htmlFor="input-review-process"
                    sx={{ fontSize: 14, marginLeft: '14px' }}
                  >
                    가공 방식
                  </InputLabel>
                  <ComboBox
                    options={processList}
                    name="coffee.process"
                    value={review.coffee.process}
                    handleChange={handleChange}
                  />
                </div>
              )}
            </div>

            {review.coffee?.beanType && (
              <div>
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

                  <SelectorOne
                    helperText="로스팅"
                    tooltip="다크로 갈수록 쓴맛 진한맛이 강해집니다. 미디움 라이트로 갈수록 신맛 감미로운 향이 강조됩니다"
                    name="coffee.roasting"
                    value={review.coffee?.roasting ?? ''}
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
                    id="flavor-tags"
                    tooltip="맛과 향을 의미합니다"
                    helperText="#향미노트"
                    value={
                      review.type === 'filtered_coffee'
                        ? review.coffee.flavors
                        : review.otherDrink?.flavors
                    }
                    name={
                      review.type === 'filtered_coffee'
                        ? 'coffee.flavors'
                        : 'otherDrink.flavors'
                    }
                    onChange={handleTagsChange}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <FormControl required fullWidth>
              {/* <InputLabel htmlFor="input-review-menu">메뉴명</InputLabel> */}
              <FormLabel id="input-review-menu" sx={{ marginBottom: '4px' }}>
                메뉴명
              </FormLabel>
              <OutlinedInput
                inputRef={focusRef}
                id="input-review-menu"
                name="menuName"
                // label="메뉴명"
                value={review.menuName}
                size="small"
                placeholder="메뉴명을 입력해주세요"
                onChange={handleChange}
              />
            </FormControl>

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
        <InputLabel htmlFor="input-review-keywords">#편의적 측면</InputLabel>
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

const coffeeCountries = [
  '에티오피아',
  '콜롬비아',
  '브라질',
  '케냐',
  '과테말라',
  '코스타리카',
  '에콰도르',
  '엘살바도르',
  '파푸아뉴기니',
  '페루',
  '파나마',
  '온두라스',
  '르완다',
  '인도',
  '인도네시아',
  '베트남',
];

const processList = [
  '워시드',
  '내추럴',
  '허니',
  '무산소 발효',
  '웻홀링',
  '펄프트 내추럴',
];
