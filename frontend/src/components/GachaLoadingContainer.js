import React from 'react'
import MovingNoteBackground from 'components/MovingNoteBackground'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import PianoCatPlay from 'assets/piano-cat-play.gif'
import Typography from '@mui/material/Typography'

const GachaLoadingContainer = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 14,
        mb: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MovingNoteBackground />
      <Box component="img" src={PianoCatPlay} sx={{ width: '50%' }}></Box>
      <Button variant="contained" sx={{ m: 5, width: '50%' }}>
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: 'bold',
            textTransform: 'none',
            '@media(max-width: 600px)': {
              fontSize: '24px',
            },
            '@media(max-width: 480px)': {
              fontSize: '18px',
            },
            '@media(max-width: 360px)': {
              fontSize: '16px',
            },
          }}
        >
          멜로디 제작중...
        </Typography>
      </Button>
    </Container>
  )
}

export default GachaLoadingContainer
