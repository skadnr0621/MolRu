import React from 'react'
import CategoryCard from './CategoryCard'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const categories = [
  { title: '화남', img: 'angry' },
  { title: '밝음', img: 'bright' },
  { title: '차분함', img: 'tranquil' },
  { title: '어두움', img: 'dark' },
  { title: '극적', img: 'extreme' },
  { title: '펑키', img: 'funky' },
  { title: '행복', img: 'happy' },
  { title: '낭만적', img: 'romance' },
  { title: '슬픔', img: 'sad' },
]

const Category = () => {
  const CategoryContainer = styled('div')({
    width: 'min(1280px, 100%)',
    display: 'flex',
    flexDirection: 'column',
    margin: '50px auto',
    padding: '60px 20px',
  })

  return (
    <CategoryContainer>
      <Stack spacing={2}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '28px',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            멜로디 카테고리
          </Typography>
        </Box>

        <Grid container spacing={3} width="100%">
          {categories.map((value, index) => (
            <CategoryCard key={index} title={value.title} img={value.img} />
          ))}
        </Grid>
      </Stack>
    </CategoryContainer>
  )
}

export default Category
