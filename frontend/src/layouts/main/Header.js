import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from 'components/Logo'
import NavBar from 'components/NavBar'
import AccountBar from 'components/AccountBar'
import SearchBar from 'components/SearchBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { makeStyles, styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
]

const Header = () => {
  const isMobile = useMediaQuery('(max-width: 480px)') // 480px 이하인 경우
  const isTablet = useMediaQuery('(max-width: 905px)') // 905px 이하인 경우

  const HeaderStyle = styled('div')({
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
    width: '100%',
    height: 'auto',
    top: '0px',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'row',
    zIndex: '110',
    alignItems: 'center',
    justifyContent: 'space-between',
    '#nav-account-menu': {
      display: 'flex',
    },

    '@media(max-width: 905px)': {
      flexDirection: 'column',
      '#more-menu': {
        display: 'flex',
      },
      '#nav-account-menu': {
        flexDirection: 'column',
        width: '100%',
        display: 'none',
      },
    },

    '@media(max-width: 480px)': {
      '#header-container': { justifyContent: 'space-between' },
      '#icon-container': {
        display: 'flex',
      },
      '#search-btn': {
        display: 'flex',
      },
    },
  })

  const toggleMenu = () => {
    const el = document.querySelector('#nav-account-menu')

    if (el.style.display == 'flex') {
      el.style.display = 'none'
    } else {
      el.style.display = 'flex'
    }
  }

  const toggleSearch = () => {
    const el = document.querySelector('#search-container')

    if (el.style.display == 'flex') {
      el.style.display = 'none'
      document.querySelector('#header-container').style.display = 'flex'
      document.querySelector('#icon-container').style.display = 'flex'
    } else {
      el.style.display = 'flex'
      document.querySelector('#header-container').style.display = 'none'
      document.querySelector('#icon-container').style.display = 'none'
      document.querySelector('#nav-account-menu').style.display = 'none'
    }
  }

  return (
    <HeaderStyle>
      <Box
        id="header-container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Link to={`/main`}>
          <Logo height="72px" />
        </Link>

        <SearchBar top100Films={top100Films} />

        <Box id="icon-container">
          <IconButton
            id="search-btn"
            sx={{
              width: '45px',
              height: '45px',
              marginRight: '16px',
              display: 'none',
            }}
            onClick={toggleSearch}
          >
            <SearchIcon
              sx={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '36px' }}
            />
          </IconButton>

          <IconButton
            id="more-menu"
            sx={{
              width: '45px',
              height: '45px',
              marginRight: '16px',
              display: 'none',
            }}
            onClick={toggleMenu}
          >
            <MenuIcon sx={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '36px' }} />
          </IconButton>
        </Box>
      </Box>

      <Box id="nav-account-menu">
        <NavBar />
        <AccountBar />
      </Box>

      <Box
        id="search-container"
        sx={{
          display: 'none',
          height: '72px',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <IconButton
          id="search-btn"
          sx={{
            width: '36px',
            height: '36px',
            marginLeft: '6px',
          }}
          onClick={toggleSearch}
        >
          <CloseIcon sx={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '24px' }} />
        </IconButton>
        <Autocomplete
          size="small"
          sx={{ width: 'inherit', marginRight: '16px' }}
          id="free-solo-demo"
          freeSolo
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => <TextField {...params} label="freeSolo" />}
        />
      </Box>
    </HeaderStyle>
  )
}

export default Header
