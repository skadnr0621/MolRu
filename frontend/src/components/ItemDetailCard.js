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
import molrudyAudio from 'assets/molrudy.wav'

const ItemDetailCard = ({ isHeader, item }) => {
  const [likeCnt, setLikeCnt] = useState(0)

  return (
    <Box
      sx={{
        height: 'auto%',
        width: '100%',
        boxShadow: 'rgb(4 17 29 / 15%) 0px 0px 8px 0px',
      }}
    >
      <Card sx={{ width: '100%' }}>
        {isHeader && (
          <CardActions
            sx={{
              height: '40px',
              flexDirection: 'row-reverse',
              padding: '8px 16px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <Typography>{likeCnt}</Typography>
            <IconButton sx={{ padding: '4px' }}>
              <FavoriteBorderIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          </CardActions>
        )}
        {!isHeader && (
          <CardActions
            sx={{
              height: '40px',
              flexDirection: 'row-reverse',
              padding: '8px 16px',
            }}
          ></CardActions>
        )}
        <CardContent
          sx={{
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '4% 0px',
            width: 'inherit',
          }}
        >
          Molrudy #{item.tokenId} [{item.tokenTitle}]
        </CardContent>
        <CardMedia
          component="img"
          // image={molrudy} // svg 파일이 안열림
          image={item.tokenURI}
          alt="molrudy"
          sx={{ margin: '6% 0px 12% 0px', width: 'inherit' }}
        />
        <CardActions
          sx={{
            margin: '0px 8px 6% 8px',
          }}
        >
          <audio
            style={{ margin: '0 auto' }}
            controls
            src={process.env.REACT_APP_API_URL + item.audioPath}
          >
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </CardActions>
      </Card>
    </Box>
  )
}

export default ItemDetailCard
