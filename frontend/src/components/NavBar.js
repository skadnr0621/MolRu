import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const categories = [
  '전체',
  '화남',
  '밝음',
  '차분함',
  '어두움',
  '극적',
  '펑키',
  '행복',
  '낭만적',
  '슬픔',
]

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '72px',
      }}
    >
      <Button
        onClick={handleClick}
        sx={{ padding: '0px 20px', fontWeight: 'bold', fontSize: '16px' }}
      >
        Explore
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiList-root': {
            padding: '0px',
          },
        }}
      >
        {categories.map((value, index) => (
          <MenuItem
            onClick={handleClose}
            key={index}
            sx={{
              '&:not(:last-child)': {
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              },
              padding: '13px 100px 13px 16px',
            }}
            to={`/items?category=${value}&status=all`}
            component={Link}
          >
            {value}
          </MenuItem>
        ))}
      </Menu>

      <Button
        to="/gacha"
        component={Link}
        sx={{ padding: '0px 20px', fontWeight: 'bold', fontSize: '16px' }}
      >
        Gacha
      </Button>
      <Button
        to="/404"
        component={Link}
        sx={{ padding: '0px 20px', fontWeight: 'bold', fontSize: '16px' }}
      >
        Play
      </Button>
    </Box>
  )
}

export default NavBar
