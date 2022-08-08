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

type SelectorProps = {
  helperText: string;
  tooltip: string;
  name: string;
  value: string[];
  options: {
    value: string;
    label: string;
  }[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
  disabled?: boolean;
};

function Selector({
  helperText,
  tooltip,
  name,
  value,
  options,
  handleChange,
  disabled,
}: SelectorProps) {
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
      <Badge
        badgeContent={value.length}
        color="primary"
        invisible={value.length < 2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ right: 12 }}
      />
      <Select
        multiple
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>전체</em>;
          }

          return selected.join(', ');
        }}
        name={name}
        value={value}
        displayEmpty
        onChange={handleChange}
        sx={{ fontWeight: value.length > 0 ? 'bold' : 'inherit' }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={(theme) => ({
              fontWeight:
                value.indexOf(option.value) === -1
                  ? theme.typography.fontWeightRegular
                  : theme.typography.fontWeightBold,
            })}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default Selector;
