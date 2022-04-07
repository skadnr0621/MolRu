import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite' // 좋아요 누름
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder' // 좋아요 안누름
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import molrudy from 'assets/molrudy.png'

const ItemCard = ({
  tokenCA,
  tokenId,
  owner,
  price,
  title,
  date,
  img,
  audio,
}) => {
  const [likeCnt, setLikeCnt] = useState(0)

  return (
    <Box sx={{ height: '100%' }}>
      <Button
        sx={{ padding: '0px', border: '1px solid rgba(0, 0, 0, 0.12)' }}
        to={`/items/${tokenCA}/${tokenId}`}
        component={Link}
      >
        <Card
          sx={{
            '&:hover': { boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px' },
          }}
        >
          <CardActions
            sx={{
              height: '40px',
              flexDirection: 'row-reverse',
              padding: '8px 16px',
              marginBottom: '16px',
            }}
          >
            <Typography>{likeCnt}</Typography>
            <IconButton sx={{ padding: '4px' }}>
              <FavoriteBorderIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          </CardActions>
          <CardMedia
            component="img"
            src={img}
            // image={img} // svg 파일이 안열림
            alt="molrudy"
          />
          <CardActions
            sx={{
              flexDirection: 'row-reverse',
              padding: '0px 8px',
              height: '48px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <IconButton>
              <PlayCircleIcon sx={{ fontSize: '38px', color: '#424242' }} />
            </IconButton>
          </CardActions>
          <CardContent>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>
                  {owner}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#9E9E9E' }}>
                  Price
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.87)' }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.87)' }}
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/ethereum.png"
                    style={{ verticalAlign: 'text-top', height: '16px' }}
                  />
                  {price}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
          <Typography
            sx={{
              margin: '0px 16px 16px 0px',
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#9E9E9E',
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            {date}
          </Typography>
        </Card>
      </Button>
    </Box>
  )
}

export default ItemCard
