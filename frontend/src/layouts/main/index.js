import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Box from '@mui/material/Box'

const MainLayout = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default MainLayout
