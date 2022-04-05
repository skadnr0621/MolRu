import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/context'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import profileImg from 'assets/piano-cat.png'
import MelodyBackground from 'components/MelodyBackground'

const SettingStyle = styled('div')({
  width: 'min(640px, 100% - 200px)',
  height: 'auto',
  margin: '50px auto 100px auto',
  display: 'flex',
  flexDirection: 'column',
})

const Input = styled('input')({
  display: 'none',
})

const Setting = () => {
  const { state, actions } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.account) {
      navigate('/main')
    }
  })

  const [userName, setUserName] = useState('')
  const [userProfile, setUserProfile] = useState(profileImg)

  const handleUserName = (event) => {
    setUserName(event.target.value)
  }

  const handleUserProfile = ({ target }) => {
    const fileReader = new FileReader()

    fileReader.readAsDataURL(target.files[0])
    fileReader.onload = (e) => {
      setUserProfile(() => e.target.result)
    }
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

  const onSaveProfile = () => {
    alert(userName)

    if (userProfile != profileImg) {
      alert(userProfile)
    }
  }

  return (
    <>
      <SettingStyle>
        <Stack spacing={7} sx={{ margin: '0 auto', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '40px',
                  color: 'rgba(0, 0, 0, 0.87)',
                  fontWeight: 'bold',
                }}
              >
                Profile Setting
              </Typography>
            </Box>

            <Box>
              <Button
                variant="contained"
                sx={{ fontWeight: 'bold' }}
                onClick={onSaveProfile}
              >
                Save
              </Button>
            </Box>
          </Box>

          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Stack spacing={1} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
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
                <img
                  src={userProfile}
                  style={{ width: '100%', height: 'auto' }}
                />
                {/* </label> */}
              </Box>
              <Box>
                <label htmlFor="profile-img">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'lowercase',
                      fontWeight: 'bold',
                      fontSize: '12px',
                    }}
                  >
                    <Input
                      accept="image/*"
                      id="profile-img"
                      type="file"
                      onChange={handleUserProfile}
                    />
                    Upload
                  </Button>
                </label>
              </Box>
            </Stack>

            <Stack spacing={1} sx={{ width: '-webkit-fill-available' }}>
              <Box>
                <Typography
                  sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.87)' }}
                >
                  UserName
                </Typography>
              </Box>
              <Box>
                <TextField
                  onChange={handleUserName}
                  sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                  variant="outlined"
                  placeholder="Enter username"
                  fullWidth
                />
              </Box>
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Box sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.87)' }}>
              Wallet Address
            </Box>
            <Box>
              <TextField
                sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                id="wallet-address"
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
          </Stack>
        </Stack>
      </SettingStyle>
    </>
  )
}

export default Setting
