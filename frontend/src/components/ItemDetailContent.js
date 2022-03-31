import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Link from '@mui/material/Link'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'

const ItemDetailContent = () => {
  const categories = ['행복', '낭만적', '밝음']

  return (
    <Box sx={{ height: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography>
          <Link
            href="#"
            underline="hover"
            sx={{ color: '#6876C4', fontSize: '14px' }}
          >
            Molrudy #1 by 오용록
          </Link>
        </Typography>
        <ButtonGroup variant="outlined" size="small">
          <Button>
            <ShareIcon />
          </Button>
          <Button>
            <MoreVertIcon />
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: '32px',
            fontWeight: 'bold',
          }}
        >
          Molrudy #1
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px 0px',
        }}
      >
        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: '22px',
            fontWeight: 'bold',
            marginRight: '10px',
          }}
        >
          Price
        </Typography>
        <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.87)' }}>
          <img
            src="https://img.icons8.com/color/48/000000/ethereum.png"
            style={{ verticalAlign: 'text-top', height: '16px' }}
          />
          0.01
        </Typography>
      </Box>

      <Box
        sx={{
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Button
          variant="contained"
          sx={{
            height: '50px',
            width: '160px',
            margin: '10px 0px',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          Buy now
        </Button>
      </Box>

      <Box
        sx={{
          padding: '20px 0px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          Owned by{' '}
          <Link href="#" underline="hover" sx={{ color: 'rgb(32, 129, 226)' }}>
            김남욱
          </Link>
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '22px',
            margin: '10px 0px',
          }}
        >
          <LocalOfferOutlinedIcon
            sx={{ verticalAlign: 'text-top', marginRight: '5px' }}
          />
          Categories
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {categories.map((value, index) => (
            <Box
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.87)',
                borderRadius: '20px',
                padding: '5px 10px',
                marginRight: '10px',
                marginBottom: '10px',
              }}
            >
              #{value}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ItemDetailContent
