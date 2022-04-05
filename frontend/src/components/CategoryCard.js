import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const CategoryCard = ({ title, img }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={4}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Button
        sx={{ display: 'flex', padding: '0px', width: 'fit-content' }}
        to={`/items?category=${title}&status=all`}
        component={Link}
      >
        <Card
          sx={{
            border: '1px solid rgba(0, 0, 0, 0.2)',
            '&:hover': {
              boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 0px',
            },
          }}
        >
          <CardMedia
            component="img"
            src={`category/${img}.png`}
            sx={{ filter: 'grayscale(100%)' }}
          />
          <CardContent
            sx={{
              borderTop: '1px solid rgba(0, 0, 0, 0.2)',
              padding: '10px 0px',
              '&:last-child': {
                paddingBottom: '10px',
              },
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              {title}
            </Typography>
          </CardContent>
        </Card>
      </Button>
    </Grid>
  )
}

export default CategoryCard
