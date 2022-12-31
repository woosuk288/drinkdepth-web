import { CircularProgress, IconButton } from '@mui/material';

import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

type Props = {
  isFetchingNextPage: boolean;
  onClick: () => void;
};

function FetchMoreButton({ isFetchingNextPage, onClick }: Props) {
  return (
    <div css={{ textAlign: 'center' }}>
      {isFetchingNextPage ? (
        <CircularProgress disableShrink sx={{ animationDuration: '550ms' }} />
      ) : (
        // <CircularProgress disableShrink sx={{ animationDuration: '550ms' }} />
        <IconButton onClick={onClick}>
          <ExpandCircleDownOutlinedIcon fontSize="large" />
        </IconButton>
      )}
    </div>
  );
}
export default FetchMoreButton;
