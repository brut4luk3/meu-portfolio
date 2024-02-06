// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#27538C',
    },
  },
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
    h1: {
      fontFamily: "'Roboto Condensed', sans-serif",
      color: '#27538C',
      fontWeight: 700,
    },
  },
});

export default theme;