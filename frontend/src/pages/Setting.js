import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import profileImg from 'assets/piano-cat.png'
import MelodyBackground from 'components/MelodyBackground'
import { api } from 'api'

const SettingStyle = styled('div')({
  width: '640px',
  height: 'auto',
  margin: '50px auto 100px auto',
  display: 'flex',
  flexDirection: 'column',
  '@media(max-width: 740px)': {
    width: 'min(640px, 100% - 100px)',
  },
  '@media(max-width: 480px)': {
    width: 'min(640px, 100% - 50px)',
  },
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

  useEffect(() => {
    setUserName(state.nickname)
    setUserProfile(state.imageUrl)
  }, [])

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

  const onSaveProfile = async () => {
    await updateUserInfo()

    if (userProfile != profileImg) {
      alert(userProfile)
    }
  }

  const updateUserInfo = async () => {
    try {
      const data = {
        address: state.account,
        imageUrl: '',
        nickname: userName,
      }
      const res = await api.put('/user', data)
      const imageUrl = res.data.imageUrl
      const nickname = res.data.nickname
      setUserName(nickname === '' ? '몰?루' : nickname)
      setUserProfile(imageUrl === '' ? profileImg : imageUrl)
      state.nickname = nickname === '' ? '몰?루' : nickname
      state.imageUrl = imageUrl === '' ? profileImg : imageUrl
      alert('변경 완료!')
      navigate('/account')
    } catch (e) {
      console.error(e)
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <IconButton
                  sx={{ paddingLeft: '0px' }}
                  to="/account"
                  component={Link}
                >
                  <ArrowBackIosNewIcon
                    sx={{
                      fontSize: '36px',
                      '@media(max-width: 600px)': {
                        fontSize: '26px',
                      },
                      '@media(max-width: 480px)': {
                        fontSize: '20px',
                      },
                    }}
                  />
                </IconButton>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '40px',
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontWeight: 'bold',
                    '@media(max-width: 600px)': {
                      fontSize: '30px',
                    },
                    '@media(max-width: 480px)': {
                      fontSize: '24px',
                    },
                  }}
                >
                  Profile Edit
                </Typography>
              </Box>
            </Box>

            <Box>
              <Button
                variant="contained"
                onClick={onSaveProfile}
                sx={{
                  '@media(max-width: 600px)': {
                    padding: '2px 0px',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    '@media(max-width: 600px)': {
                      fontSize: '14px',
                    },
                    '@media(max-width: 480px)': {
                      fontSize: '12px',
                    },
                  }}
                >
                  Save
                </Typography>
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
                <img
                  src={userProfile}
                  style={{ width: '100%', height: 'auto' }}
                />
                {/* </label> */}
              </Box>
              <Box>
                <label htmlFor="profile-img">
                  <Input
                    accept="image/*"
                    id="profile-img"
                    type="file"
                    onChange={handleUserProfile}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'lowercase',
                      fontWeight: 'bold',
                      fontSize: '12px',
                    }}
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              </Box>
            </Stack>

            <Stack spacing={1} sx={{ width: '-webkit-fill-available' }}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  UserName
                </Typography>
              </Box>
              <Box>
                <TextField
                  onChange={handleUserName}
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    '@media(max-width: 480px)': {
                      display: 'none',
                    },
                  }}
                  variant="outlined"
                  placeholder="Enter username"
                  value={userName}
                  fullWidth
                />
                <TextField
                  onChange={handleUserName}
                  sx={{
                    display: 'none',
                    color: 'rgba(0, 0, 0, 0.87)',
                    '@media(max-width: 480px)': {
                      display: 'block',
                    },
                  }}
                  size="small"
                  variant="outlined"
                  placeholder="Enter username"
                  value={userName}
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
                sx={{
                  color: 'rgba(0, 0, 0, 0.87)',
                  '& .MuiOutlinedInput-root': {
                    paddingRight: '0px',
                  },
                  '@media(max-width: 480px)': {
                    display: 'none',
                  },
                }}
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
              <TextField
                sx={{
                  display: 'none',
                  color: 'rgba(0, 0, 0, 0.87)',
                  '& .MuiOutlinedInput-root': {
                    paddingRight: '0px',
                  },
                  '@media(max-width: 480px)': {
                    display: 'block',
                  },
                }}
                size="small"
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
