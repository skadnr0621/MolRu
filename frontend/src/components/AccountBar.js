import React, { useState } from 'react'
import AccountDrawer from 'components/AccountDrawer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import Drawer from '@mui/material/Drawer'
import Link from '@mui/material/Link'

const AccountBar = () => {
  const [isDrawer, setDrawer] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setDrawer(open)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '72px',
      }}
    >
      <Button to="/account" component={Link} sx={{ padding: '0px 20px' }}>
        <AccountCircleOutlinedIcon fontSize="large" />
      </Button>
      <Button sx={{ padding: '0px 20px' }} onClick={toggleDrawer(true)}>
        <AccountBalanceWalletOutlinedIcon fontSize="large" />
      </Button>
      <Drawer
        anchor="right"
        open={isDrawer}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.38)',
          },
        }}
      >
        <AccountDrawer />
      </Drawer>
    </Box>
  )
}

export default AccountBar
