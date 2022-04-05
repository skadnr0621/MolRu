import React from 'react'
import { Link } from 'react-router-dom'
import MelodyBackground from 'components/MelodyBackground'
import ItemCard from 'components/ItemCard'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Intro = () => {
  const MainPageStyle = styled('div')({
    width: 'min(1280px, 100% - 100px)',
    display: 'flex',
    margin: '0 auto',
  })

  return (
    <>
      <MelodyBackground />
      <MainPageStyle>
        <Grid
          container
          spacing={1}
          width="100%"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '70px 0px',
            }}
          >
            <Stack spacing={4} sx={{ display: 'flex', margin: '70px 0px' }}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '36px',
                    color: 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  멜로디 NFT를
                  <br />
                  수집하고 판매해보세요
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  MOLRU는 세계 최초의
                  <br />
                  멜로디 NFT 마켓 플레이스입니다.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ width: '167px' }}
                    to={'/items?category=전체&status=all'}
                    component={Link}
                  >
                    <Typography
                      sx={{ fontWeight: 'bold', textTransform: 'none' }}
                    >
                      Explore
                    </Typography>
                  </Button>
                </Box>

                <Box>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ width: '167px' }}
                    to="/gacha"
                    component={Link}
                  >
                    <Typography
                      sx={{ fontWeight: 'bold', textTransform: 'none' }}
                    >
                      Gacha
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ItemCard />
          </Grid>
        </Grid>
      </MainPageStyle>
    </>
  )
}

export default Intro
