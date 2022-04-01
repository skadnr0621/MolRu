import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MelodyBackground from 'components/MelodyBackground'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import PianoCat from 'assets/piano-cat.png'
import GachaLoadingContainer from 'components/GachaLoadingContainer'
import ItemDetailCard from 'components/ItemDetailCard'

const Gacha = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 3000)
    }
  }, [isLoading])

  const handleGacha = () => {
    setIsClicked(true)
    setIsLoading(true)
    // TODO: 멜로디 발급 로직 적용
  }

  const handleGachaAgain = () => {
    setIsClicked(false)
    setIsLoading(true)
  }

  return (
    <>
      <MelodyBackground />
      {!isClicked ? (
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
          <Box component="img" src={PianoCat} sx={{ width: '50%' }}></Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 5, width: '50%' }}
            onClick={handleGacha}
          >
            <h1>Gacha</h1>
          </Button>
        </Container>
      ) : isLoading ? (
        <GachaLoadingContainer />
      ) : (
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
          <Box sx={{ width: 'min(375px, 100% - 40px)' }}>
            <ItemDetailCard isHeader={false} />
          </Box>
          <Box sx={{ m: 5 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              onClick={handleGachaAgain}
            >
              <h2>더 뽑기</h2>
            </Button>
            <Button
              component={Link}
              to="/items/1"
              variant="outlined"
              color="primary"
              sx={{ ml: 1 }}
            >
              <h2>상세정보</h2>
            </Button>
          </Box>
        </Container>
      )}
    </>
  )
}

export default Gacha
