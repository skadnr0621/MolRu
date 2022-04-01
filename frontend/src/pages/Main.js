import React from 'react'
import Box from '@mui/material/Box';

import Intro from './mainComponent/Intro';
import Ranking from './mainComponent/Ranking';
import Description from './mainComponent/Description';
import Category from './mainComponent/Category';

const Main = () => {

  return (
    <Box sx={{
      height: 'auto',
      width: '100%',
    }}>
      <Intro />
      <Ranking />
      <Description />
      <Category />
    </Box>
  )
}

export default Main
