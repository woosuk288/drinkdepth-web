import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CoffeeSearch, { CoffeeSearchXS } from './CoffeeSearch';
import { Coffee_coffee_coffee } from '../../apollo/__generated__/Coffee';
import CoffeeFilterDrawer from './CoffeeFilterDrawer';
import { CoffeeOption } from '../../pages/coffee';

type CoffeeFilterProps = {
  length: number;
  checked: CoffeeOption;
  handleCheckbox: (key: keyof CoffeeOption, value: string) => () => void;
};

function CoffeeFilter({ length, checked, handleCheckbox }: CoffeeFilterProps) {
  const [open, setOpen] = React.useState(false);
  console.log('checked :', checked);

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '-30px',
        padding: '0.5rem 24px',
        [theme.breakpoints.down('md')]: {
          marginBottom: '-20px',
        },
      })}
    >
      <Typography>{length}개의 상품</Typography>
      <CoffeeSearch />
      <CoffeeSearchXS />
      <Button
        onClick={() => setOpen(true)}
        color="inherit"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 600,
        }}
        endIcon={<FilterAltIcon />}
      >
        필터
      </Button>
      <CoffeeFilterDrawer
        open={open}
        setOpen={setOpen}
        checked={checked}
        handleCheckbox={handleCheckbox}
      />
    </Box>
  );
}

export default CoffeeFilter;
