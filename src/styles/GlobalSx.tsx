import { SxProps, Theme } from '@mui/material';

export const sxCenter = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
} as const;

export const sxSquareImg = {
  width: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    paddingBottom: '100%',
  },
  ' .img': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};
