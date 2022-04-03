import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CoffeeSearch, { CoffeeSearchXS } from './CoffeeSearch';
import { Coffee_coffee_coffee } from '../../apollo/__generated__/Coffee';

type CoffeeFilterProps = {
  items: Coffee_coffee_coffee[];
};
function CoffeeFilter({ items }: CoffeeFilterProps) {
  const handleFilterClick = () => {
    console.log('handleFilterClick : ');
  };

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
      <Typography>{items.length}개의 상품</Typography>
      <CoffeeSearch />
      <CoffeeSearchXS />
      <Button
        onClick={handleFilterClick}
        color="inherit"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 600,
        }}
        endIcon={<FilterAltIcon />}
      >
        필터
      </Button>
    </Box>
  );
}

export default CoffeeFilter;
