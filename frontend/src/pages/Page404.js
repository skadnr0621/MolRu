import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import molru from '../assets/molru1.png'

const Page404 = () => {
  const styles = {
    mainStyle: {
      textAlign: 'center',
      marginTop: '100px',
      padding: '300px 0px 500px 0px',
      backgroundImage: `url(${molru})`,
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  }
  return (
    <Box style={styles.mainStyle} />
  )
}

export default Page404
