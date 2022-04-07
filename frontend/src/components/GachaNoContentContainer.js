import React from 'react'
import { Link } from 'react-router-dom'
import MovingNoteBackground from 'components/MovingNoteBackground'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PianoCatPlay from 'assets/piano-cat-play.gif'
import NoMelody from 'assets/no-melody.png'

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
      {/* <MovingNoteBackground /> */}
      <Box component="img" src={NoMelody} sx={{ width: '50%' }}></Box>
      <Button
        variant="contained"
        sx={{ m: 5, width: '50%' }}
        to="/main"
        component={Link}
      >
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
          메인으로 돌아가기
        </Typography>
      </Button>
    </Container>
  )
}

export default GachaLoadingContainer
