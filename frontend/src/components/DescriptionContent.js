import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      md: 1100,
    },
  },
})

const DescriptionContent = ({ icon, title, content }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        id="desc-content-container"
        item
        xs={4}
        sm={4}
        md={4}
        lg={12}
        xl={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '@media(max-width: 1100px)': {
            marginBottom: '60px',
          },
        }}
      >
        <Stack spacing={1}>
          <Box sx={{ textAlign: 'center' }}>{icon}</Box>
          <Box>
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                color: 'rgba(0, 0, 0, 0.87)',
                '@media(max-width: 480px)': {
                  fontSize: '16px',
                },
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                color: 'rgba(0, 0, 0, 0.38)',
                '@media(max-width: 480px)': {
                  fontSize: '16px',
                },
                '@media(max-width: 330px)': {
                  fontSize: '14px',
                },
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Box>
        </Stack>
      </Grid>
    </ThemeProvider>
  )
}

export default DescriptionContent
