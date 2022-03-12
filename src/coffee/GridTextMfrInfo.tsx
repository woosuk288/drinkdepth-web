import { Grid, Typography } from '@mui/material'
import React from 'react'

type GridTextMfrInfoProps = {
  label: string
  value: string
}

function GridTextMfrInfo({ label, value }: GridTextMfrInfoProps) {
  return (
    <Grid container spacing={2} height={56}>
      <Grid item xs={4} md={3}>
        <Typography variant="subtitle1" fontWeight={500} align="center">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={8} md={9}>
        <Typography variant="body1" color="GrayText" fontWeight={500}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default GridTextMfrInfo
