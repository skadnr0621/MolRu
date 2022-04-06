import React, { useState, useContext } from 'react'
import { AppContext } from '../contexts/context'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AccountDrawer from 'components/AccountDrawer'
import { makeStyles, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

const AccountBar = () => {
  const AccountBarStyle = styled('div')({
    display: 'flex',
    // '.accuontbar-div': {
    //   padding: '0px 20px',
    // },

    '@media(max-width: 905px)': {
      flexDirection: 'column',
      '.accountbar-div': {
        width: '100%',
        padding: '10px 0px',
      },
    },
  })

  const navigate = useNavigate()
  const location = useLocation()

  const { state, actions } = useContext(AppContext)

  const [isDrawer, setDrawer] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogout = () => {
    handleClose()
    alert('로그아웃')
    actions.handleConnect()
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setDrawer(open)
  }

  const handleClick = (event) => {
    if (state.account) {
      setAnchorEl(event.currentTarget)
    } else {
      setDrawer(true)
    }
  }

  return (
    <AccountBarStyle>
      <Button className="accountbar-div" to="/account" component={Link}>
        {state.account !== '' ? (
          <Box
            component="img"
            src={state.imageUrl}
            sx={{ width: '35px', height: '35px' }}
          ></Box>
        ) : (
          <AccountCircleOutlinedIcon fontSize="large" />
        )}
      </Button>

      {/* <Menu
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiList-root': {
            padding: '0px',
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            padding: '13px 100px 13px 16px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          }}
          to="/account"
          component={Link}
        >
          <PersonIcon sx={{ marginRight: '13px' }} />
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            padding: '13px 100px 13px 16px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          }}
          to="/account/setting"
          component={Link}
        >
          <SettingsIcon sx={{ marginRight: '13px' }} />
          Setting
        </MenuItem>
        <MenuItem onClick={onLogout} sx={{ padding: '13px 100px 13px 16px' }}>
          <LogoutIcon sx={{ marginRight: '13px' }} />
          Logout
        </MenuItem>
      </Menu> */}

      <Button className="accountbar-div" onClick={toggleDrawer(true)}>
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
        <AccountDrawer setDrawer={setDrawer} />
      </Drawer>
    </AccountBarStyle>
  )
}

export default AccountBar
