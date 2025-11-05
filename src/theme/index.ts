import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#403d39' },
    secondary: { main: '#ccc5b9' },
    background: { default: '#fffcf2', paper: '#ffffff' },
    text: { primary: '#252422', secondary: '#403d39' },
  },
  typography: { fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif' },
  shape: { borderRadius: 8 },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ccc5b9' },
    secondary: { main: '#403d39' },
    background: { default: '#252422', paper: '#403d39' },
    text: { primary: '#fffcf2', secondary: '#ccc5b9' },
  },
  typography: { fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif' },
  shape: { borderRadius: 8 },
});