import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import EggIcon from '@mui/icons-material/Egg';
import EggOutlinedIcon from '@mui/icons-material/EggOutlined';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    // color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    // color: '#ff3d47',
  },
});

type FlavorRatingProps = {
  label: string;
  value: string | null;
};

export default function FlavorRating({ label, value = '' }: FlavorRatingProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ '& > legend': { mt: 2, mb: 1 } }}
    >
      <Typography component="legend" align="center" fontWeight={500}>
        {label}
      </Typography>
      <StyledRating
        name="customized-color"
        defaultValue={tasteConverter(value ?? '')}
        readOnly
        icon={<EggIcon fontSize="inherit" color="primary" />}
        emptyIcon={
          <EggOutlinedIcon
            fontSize="inherit"
            color="primary"
            sx={{ opacity: 0.4 }}
          />
        }
      />
    </Box>
  );
}

const tasteConverter = (taste: string) => {
  return taste === 'very_low'
    ? 1
    : taste === 'low'
    ? 2
    : taste === 'average'
    ? 3
    : taste === 'high'
    ? 4
    : taste === 'very_high'
    ? 5
    : 0;
};
