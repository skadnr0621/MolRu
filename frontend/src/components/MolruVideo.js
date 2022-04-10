import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const MolruVideo = () => {
  const RankingContainer = styled('div')({
    width: 'min(1280px, 100% - 40px)',
    display: 'flex',
    flexDirection: 'column',
    margin: '50px auto',
    padding: '60px 200px',

    '@media(max-width: 900px)': {
      padding: '60px 50px',
    },
    '@media(max-width: 600px)': {
      padding: '60px 25px',
    },
    '@media(max-width: 480px)': {
      padding: '60px 16px',
    },
  })

  return (
    <RankingContainer>
      <Stack spacing={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '28px',
              color: 'rgba(0, 0, 0, 0.87)',
              '@media(max-width: 480px)': {
                fontSize: '22px',
              },
            }}
          >
            What is Molru?
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            paddingBottom: '56.25%',
            borderRadius: '10px',
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Ar2nUdW9k4k"
            //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ position: 'absolute', borderRadius: '10px' }}
          ></iframe>
        </Box>
      </Stack>
    </RankingContainer>
  )
}

export default MolruVideo
