import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CoffeeSearch, { CoffeeSearchXS } from './CoffeeSearch';
import { Coffee_coffee_coffee } from '../../apollo/__generated__/Coffee';
import CoffeeFilterDrawer from './CoffeeFilterDrawer';

type CoffeeFilterProps = {
  items: Coffee_coffee_coffee[];
};
function CoffeeFilter({ items }: CoffeeFilterProps) {
  const [open, setOpen] = React.useState(false);

  const [checked, setChecked] = React.useState<string[]>([]);

  const handleCheckbox = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
