import React from 'react'
import Box from '@mui/material/Box'

import Intro from 'components/Intro'
import MolruVideo from 'components/MolruVideo'
import Description from 'components/Description'
import Category from 'components/Category'

const Main = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
      }}
    >
      <Intro />
      <MolruVideo />
      <Description />
      <Category />
    </Box>
  )
}

export default Main
