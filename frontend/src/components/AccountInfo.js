import { useState, useEffect, useContext } from 'react'
import { AppContext } from 'contexts/context'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AccountTabs from './AccountTabs'
import MelodyBackground from './MelodyBackground'

const AccountInfo = () => {
  const { state, actions } = useContext(AppContext)

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MelodyBackground />
      <Box
        sx={{
          m: 2,
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          border: '2px solid rgb(229, 232, 235)',
          display: 'flex',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={state.imageUrl} style={{ width: '100%', height: 'auto' }} />
        {/* </label> */}
      </Box>
      <Typography
        sx={{
          m: 1,
          fontWeight: 'bold',
          fontSize: '30px',
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        {state.nickname}
      </Typography>
      <Box
        sx={{
          mb: 3,
          border: '1px solid #707A83',
          borderRadius: '20px',
          padding: '4px 8px',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#707A83',
          }}
        >
          {state.account}
        </Typography>
      </Box>
      <AccountTabs />
    </Container>
  )
}

export default AccountInfo
