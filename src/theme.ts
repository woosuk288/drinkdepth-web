import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const THEME_PRIMARY_COLOR = '#4f9cff';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: THEME_PRIMARY_COLOR,
      contrastText: '#fff',
    },
    // secondary: {
    //   main: '#19857b',
    // },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

export const COLOR_PRICE = 'rgba(255, 87, 87)';
export const THEME_SEPERATOR = 'rgb(219, 219, 219)';
