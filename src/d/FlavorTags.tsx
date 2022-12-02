import { FormHelperText, Tooltip } from '@mui/material';
import StringTags, { StringTagsProps } from './StringTags';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type Props = {
  tooltip: string;
  helperText: string;
} & StringTagsProps;
function FlavorTags({
  tooltip,
  helperText,
  id,
  options = [],
  value = [],
  name,
  onChange,
  placeholder,
}: Props) {
  return (
    <div>
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

      <StringTags
        id={id}
        options={options}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
export default FlavorTags;
