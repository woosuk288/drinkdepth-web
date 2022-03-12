import { Box, Card, Typography } from '@mui/material'
import React from 'react'

type DescriptionItemProps = {
  label: string
  value: string
}

function DescriptionItem({ label, value }: DescriptionItemProps) {
  return (
    <dl>
      <Box display="flex" alignItems="center">
        <Box component="dt" sx={{ flex: 1, padding: '1rem' }}>
          <Typography variant="subtitle2">{label}</Typography>
        </Box>
        <Box component="dd" sx={{ flex: 2, padding: '1rem' }}>
          <Typography variant="body2" whiteSpace="pre-line">
            {value}
          </Typography>
        </Box>
      </Box>
    </dl>
  )
}

export default DescriptionItem
