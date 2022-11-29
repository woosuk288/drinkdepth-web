import {
  Autocomplete,
  Box,
  Chip,
  FormHelperText,
  TextField,
  Tooltip,
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { cafeMenuReviewState } from 'atoms/reviewFormAtom';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { FETCH_FLAVOR_WHEELS_KEY } from 'src/utils/queryKeys';
import createFuzzyMatcher from 'src/utils/createFuzzyMatcher';

type Props = {
  tooltip: string;
  helperText: string;
};
function FlavorTags({ tooltip, helperText }: Props) {
  const focusRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const [review, setReview] = useRecoilState(cafeMenuReviewState);
  const { data, isLoading } = useQuery(FETCH_FLAVOR_WHEELS_KEY, () =>
    // fetchTagNames(auth.currentUser!.uid)
    ({
      flavors: ['꿀'],
    })
  );

  return (
    <>
      {/* 해시태그 입력 */}
      <Autocomplete
        sx={{
          marginTop: '12px',
          // borderTop: `1px solid ${THEME_SEPERATOR}`,
          // borderBottom: `1px solid ${THEME_SEPERATOR}`,
          // backgroundColor: 'white',
        }}
        multiple
        loading={isLoading}
        value={review.flavors}
        onChange={(_, flavors) => {
          focusRef.current?.focus();
          setTimeout(() => {
            textRef.current?.focus();
          });

          setReview((prev) => ({ ...prev, flavors }));
        }}
        // open={true}
        id="tags-plain"
        options={data?.flavors ?? []}
        defaultValue={[]}
        filterSelectedOptions
        filterOptions={(x, state) => {
          if (!state.inputValue) {
            return [];
          } else {
            const regex = createFuzzyMatcher(state.inputValue);
            return x.filter((option) => regex.test(option));
          }
        }}
        freeSolo
        blurOnSelect
        autoSelect
        disableClearable
        componentsProps={{
          popper: {
            sx: {
              width: '200px !important',
              '& .MuiAutocomplete-listbox': { maxHeight: '180px' },
            },
          },
        }}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              sx={{ border: 'none', fontSize: '1rem' }}
              variant="outlined"
              label={option}
              deleteIcon={<ClearOutlinedIcon />}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <Box
            sx={{
              paddingLeft: '1rem',
            }}
          >
            <Tooltip
              arrow
              enterTouchDelay={10}
              leaveTouchDelay={3000}
              title={tooltip}
            >
              <FormHelperText
                sx={{ fontSize: 14, position: 'relative', marginLeft: '14px' }}
              >
                {helperText}
                <InfoOutlinedIcon
                  sx={{ position: 'absolute', paddingBottom: '0.5rem' }}
                />
              </FormHelperText>
            </Tooltip>

            <TextField
              {...params}
              inputRef={textRef}
              autoFocus
              // size="small"
              sx={{ '& .MuiOutlinedInput-root': { paddingY: '2px' } }}
            />
          </Box>
        )}
      />

      <input ref={focusRef} style={{ position: 'fixed', top: '-190px' }} />
    </>
  );
}
export default FlavorTags;

const defaultOptions = [
  {
    textColor: '#ffffff',
    bgColor: '',
    name: '',
  },
];
