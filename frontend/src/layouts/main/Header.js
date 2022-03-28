import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Logo from 'components/Logo'
import NavBar from 'components/NavBar'
import AccountBar from 'components/AccountBar'
import SearchBar from 'components/SearchBar'
import { Link } from 'react-router-dom'

const Header = () => {
  const HeaderStyle = styled('div')({
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
    maxWidth: '100vw',
    height: '72px',
    top: '0px',
    position: 'sticky',
    display: 'flex',
    flexDirection: 'row',
    zIndex: '110',
    alignItems: 'center',
  })

  return (
    <HeaderStyle>
      <Link to={`/main`}>
        <Logo />
      </Link>

      <SearchBar />

      {/* <Box sx={{ display: 'flex', position: 'absolute', right: '0px' }}> */}
      <Box sx={{ display: 'flex' }}>
        <NavBar />
        <AccountBar />
      </Box>
    </HeaderStyle>
  )
}

export default Header
