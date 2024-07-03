import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'
import Onest from './assets/fonts/OnestRegular1602-hint.ttf';

const onest = {
  fontFamily: 'Onest',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Onest'),
    local('Onest-Regular'),
    url(${Onest}) format('tff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#303C6c',
    },
    secondary: {
      main: '#F4976c',
      light: '#FBE8a6',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#f9f3f2',
    },
  },
  typography: {
    fontFamily: 'Onest',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [onest],
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
)
