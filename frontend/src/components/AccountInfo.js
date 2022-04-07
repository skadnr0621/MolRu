import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from 'contexts/context'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AccountTabs from './AccountTabs'
import MelodyBackground from './MelodyBackground'

const AccountInfo = () => {
  const { state, actions } = useContext(AppContext)

  const onLogout = () => {
    alert('로그아웃')
    actions.handleConnect()
  }

  const onCopyAccount = () => {
    var copyText = document.getElementById('wallet-address').value

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        alert(`복사 성공!`)
      })
      .catch(() => {
        alert(`복사 실패!`)
      })
  }

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
          '@media(max-width: 600px)': {
            width: '100px',
            height: '100px',
          },
          '@media(max-width: 480px)': {
            width: '80px',
            height: '80px',
          },
        }}
      >
        <img src={state.imageUrl} style={{ width: '100%', height: 'auto' }} />
        {/* </label> */}
      </Box>
      <Typography
        sx={{
          // m: 1,
          fontWeight: 'bold',
          fontSize: '30px',
          color: 'rgba(0, 0, 0, 0.87)',
          '@media(max-width: 600px)': {
            fontSize: '24px',
          },
          '@media(max-width: 480px)': {
            fontSize: '20px',
          },
        }}
      >
        {state.nickname}
      </Typography>
      <Box sx={{ m: 2 }}>
        <TextField
          sx={{
            backgroundColor: 'white',
            color: 'rgba(0, 0, 0, 0.87)',
            '& .MuiOutlinedInput-root': {
              paddingRight: '0px',
            },
          }}
          id="wallet-address"
          size="small"
          variant="outlined"
          value={state.account}
          InputProps={{
            disabled: true,
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={onCopyAccount}>
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Box>

      <Stack direction="row" spacing={5}>
        <Button
          variant="contained"
          sx={{ textTransform: 'none' }}
          to="/account/setting"
          component={Link}
        >
          <Typography sx={{ fontWeight: 'bold' }}>edit</Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            border: '1px solid rgba(0, 0, 0, 0.38)',
          }}
          onClick={onLogout}
        >
          <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.38)' }}>
            logout
          </Typography>
        </Button>
      </Stack>

      <AccountTabs />
    </Container>
  )
}

export default AccountInfo
