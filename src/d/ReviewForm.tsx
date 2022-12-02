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
import { SyntheticEvent, useEffect, useRef } from 'react';
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

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview((prev) => ({
      ...prev,
      type: (event.target as HTMLInputElement).value,
    }));
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

      setReview((prev) => ({
        ...prev,
        images: uploadImages,
      }));

      // console.log('uploadImages : ', uploadImages);

      // setPost((oldPost) => {
      //   // 파일 업로드시 이름 중복 방지 (ios safari에서 버그 발견)
      //   const images = [...oldPost.images, ...uploadImages].map(
      //     (image, i, array) => {
      //       let name = image.name;
      //       if (
      //         image.name === 'image' ||
      //         (i > 0 &&
      //           array
      //             .filter((_, j) => j !== i)
      //             .find((item) => item.name === name))
      //       ) {
      //         name = image.name + '_' + new Date().toISOString();
      //       }

      //       return { ...image, name };
      //     }
      //   );

      //   // console.log('images : ', images);

      //   return {
      //     ...oldPost,
      //     images,
      //   };
      // });

      // setSelectedIndex(post.images.length);
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
            size="small"
            fullWidth
            placeholder="메뉴명을 입력해주세요"
          />
        </div>
        {/* <div>어떤 종류의 메뉴를 드셨나요?</div> */}
        <FormControl sx={{ marginTop: '1rem' }}>
          <FormLabel id="demo-radio-buttons-group-label">종류</FormLabel>

          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            onChange={handleTypeChange}
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
                htmlFor="input-review-coffee"
                sx={{ fontSize: 14, marginLeft: '14px' }}
              >
                원두명
              </InputLabel>
              <OutlinedInput id="input-review-coffee" size="small" fullWidth />
            </div>
            <div>
              <InputLabel
                htmlFor="input-review-country"
                sx={{ fontSize: 14, marginLeft: '14px' }}
              >
                원산지
              </InputLabel>
              <ContryComboBox />
            </div>
            <div css={{ display: 'flex' }}>
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

            <div>
              <FlavorTags
                tooltip="맛과 향을 의미합니다"
                helperText="향미노트"
                value={review.coffee?.tastingNote}
                name={'coffee.tastingNote'}
                onChange={handleTagsChange}
              />
            </div>
          </div>
        ) : (
          <div css={{ marginTop: '0.5rem' }}>
            <FlavorTags
              tooltip="맛과 향을 의미합니다"
              helperText="향미노트"
              value={review.coffee?.tastingNote}
              name={'coffee.tastingNote'}
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
          value={review.cafe.keywords}
          name={'cafe.keywords'}
          onChange={handleTagsChange}
          placeholder="키워드를 입력해주세요"
        />
      </div>

      <div css={{ marginTop: '1rem' }}>
        <InputLabel htmlFor="input-review-comment">한줄평</InputLabel>
        <OutlinedInput
          id="input-review-comment"
          size="small"
          fullWidth
          multiline
          rows={3}

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

const setNestedProp = (
  obj: Record<string, any>,
  [first, ...rest]: string[],
  value: string | string[]
): any => ({
  ...obj,
  [first]: rest.length ? setNestedProp(obj[first], rest, value) : value,
});
