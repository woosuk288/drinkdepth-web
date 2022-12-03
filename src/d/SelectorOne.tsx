import {
  Badge,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type SelectorOneProps = {
  helperText: string;
  tooltip: string;
  name: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  handleChange: (event: SelectChangeEvent<string>) => void;
  disabled?: boolean;
};

function SelectorOne({
  helperText,
  tooltip,
  name,
  value,
  options,
  handleChange,
  disabled,
}: SelectorOneProps) {
  return (
    <FormControl size="small" disabled={disabled} sx={{ flex: 1 }}>
      <Tooltip
        arrow
        enterTouchDelay={10}
        leaveTouchDelay={3000}
        title={tooltip}
      >
        <FormHelperText sx={{ fontSize: 14, position: 'relative' }}>
          {helperText}
          <InfoOutlinedIcon
            sx={{ position: 'absolute', paddingBottom: '0.5rem' }}
          />
        </FormHelperText>
      </Tooltip>

      <Select
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>선택 안함</em>;
          }

          return selected;
        }}
        name={name}
        value={value}
        displayEmpty
        onChange={handleChange}
        // sx={{ fontWeight: value.length > 0 ? 'bold' : 'inherit' }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={(theme) => ({
              fontWeight:
                value === option.value
                  ? theme.typography.fontWeightBold
                  : theme.typography.fontWeightRegular,
            })}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default SelectorOne;
