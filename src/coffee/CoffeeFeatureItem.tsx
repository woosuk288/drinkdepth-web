import { Grid, Typography } from '@mui/material';
import React from 'react';

type CoffeeFeatureItemProps = {
  label: string;
  value: string | null;
  type?: string;
};

function CoffeeFeatureItem({
  label,
  value,
  type = (value = ''),
}: CoffeeFeatureItemProps) {
  return (
    <>
      {/* xs, sm */}
      <Grid
        container
        spacing={2}
        height={60}
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <Grid item xs={6} sm={3}>
          <Typography variant="subtitle1" fontWeight={500} align="center">
            {label}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={9}>
          <Typography
            variant="body1"
            color="GrayText"
            fontWeight={500}
            align="center"
          >
            {getLabel(type, value)}
          </Typography>
        </Grid>
      </Grid>

      {/* md */}
      <Grid
        container
        spacing={2}
        height={60}
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        <Grid item md={3}>
          <Typography variant="subtitle1" fontWeight={500} align="center">
            {label}
          </Typography>
        </Grid>
        <Grid item md={9} container>
          {getCombo(type).map((t) => (
            <Typography
              key={t.value}
              variant="body1"
              color={value === t.value ? 'primary' : 'GrayText'}
              fontWeight={500}
              px="1.5rem"
            >
              {t.label}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default CoffeeFeatureItem;

const getLabel = (key: string, value: string) => {
  return key === 'type'
    ? ComboCoffeeType.find((t) => t.value === value)?.label
    : key === 'roasting'
    ? ComboCoffeeRoasting.find((r) => r.value === value)?.label
    : value;
};

const getCombo = (key: string) => {
  const defaultArr = [
    {
      label: key,
      value: key,
    },
  ];

  return key === 'type'
    ? ComboCoffeeType
    : key === 'roasting'
    ? ComboCoffeeRoasting
    : defaultArr;
};

const ComboCoffeeType = [
  { label: '블랜드', value: 'blend' },
  { label: '싱글오리진', value: 'single_origin' },
  { label: '디카페인', value: 'decaffeination' },
];

const ComboCoffeeRoasting = [
  { label: '라이트', value: 'light' },
  { label: '라이트미디엄', value: 'light_medium' },
  { label: '미디엄', value: 'medium' },
  { label: '미디엄다크', value: 'medium_dark' },
  { label: '다크', value: 'dark' },
];
