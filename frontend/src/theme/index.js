import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// import { purple } from '@mui/material/colors'
// import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
})

export default function ThemeConfig({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
