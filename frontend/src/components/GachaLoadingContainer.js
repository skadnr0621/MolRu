import React from 'react'
import MovingNoteBackground from 'components/MovingNoteBackground'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import PianoCatPlay from 'assets/piano-cat-play.gif'

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
      <Button variant="contained" color="primary" sx={{ m: 5, width: '50%' }}>
        <h1>멜로디 제작중...</h1>
      </Button>
    </Container>
  )
}

export default GachaLoadingContainer
