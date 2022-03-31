import React from 'react'
import Box from '@mui/material/Box';

import Intro from './mainComponent/Intro';
import Ranking from './mainComponent/Ranking';

const Main = () => {

  return (
    <Box sx={{
      height: '100%',
      width: '100%',
    }}>
      <Intro/>
      <Ranking />
    </Box>
  )
}

export default Main
