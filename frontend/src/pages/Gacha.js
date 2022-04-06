import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MelodyBackground from 'components/MelodyBackground'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import PianoCat from 'assets/piano-cat.png'
import GachaLoadingContainer from 'components/GachaLoadingContainer'
import ItemDetailCard from 'components/ItemDetailCard'
import Typography from '@mui/material/Typography'

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
            sx={{ m: 5, width: '50%' }}
            onClick={handleGacha}
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
                  fontSize: '20px',
                },
              }}
            >
              Gacha
            </Typography>
          </Button>
        </Container>
      ) : isLoading ? (
        <GachaLoadingContainer />
      ) : (
        <Container
          sx={{
            mt: 14,
            mb: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 'min(480px, 100% - 36px)',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <ItemDetailCard isHeader={false} />
          </Box>
          <Box
            sx={{
              width: '100%',
              marginTop: '40px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="contained"
              onClick={handleGachaAgain}
              sx={{ width: '45%' }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '@media(max-width: 360px)': {
                    fontSize: '16px',
                  },
                }}
              >
                더 뽑기
              </Typography>
            </Button>
            <Button
              component={Link}
              to="/items/1"
              variant="outlined"
              sx={{ width: '45%' }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '@media(max-width: 360px)': {
                    fontSize: '16px',
                  },
                }}
              >
                상세정보
              </Typography>
            </Button>
          </Box>
        </Container>
      )}
    </>
  )
}

export default Gacha
