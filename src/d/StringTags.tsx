import { Autocomplete, Chip, TextField } from '@mui/material';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { useRef } from 'react';
import createFuzzyMatcher from 'src/utils/createFuzzyMatcher';

export type StringTagsProps = {
  id?: string;

  options?: string[];
  name: string;
  value?: string[];
  onChange: (name: string, value: string[]) => void;
  placeholder?: string;
};
function StringTags({
  id,
  options = [],
  value = [],
  name,
  onChange,
  placeholder,
}: StringTagsProps) {
  const focusRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* 해시태그 입력 */}
      <Autocomplete
        sx={
          {
            // borderTop: `1px solid ${THEME_SEPERATOR}`,
            // borderBottom: `1px solid ${THEME_SEPERATOR}`,
            // backgroundColor: 'white',
          }
        }
        multiple
        value={value}
        onChange={(_, v) => {
          focusRef.current?.focus();
          setTimeout(() => {
            textRef.current?.focus();
          });

          // setReview((prev) => ({ ...prev, flavors }));
          onChange(name, v);
        }}
        // open={true}
        id={id}
        options={options}
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
          <div>
            <TextField
              {...params}
              inputRef={textRef}
              placeholder={value.length === 0 ? placeholder : ''}
              // autoFocus
              // size="small"
              sx={{ '& .MuiOutlinedInput-root': { paddingY: '2px' } }}
            />
          </div>
        )}
      />

      <input ref={focusRef} style={{ position: 'fixed', top: 0 }} />
    </>
  );
}
export default StringTags;

const defaultOptions = [
  {
    textColor: '#ffffff',
    bgColor: '',
    name: '',
  },
];
