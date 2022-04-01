import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import IconButton from '@mui/material/IconButton'

const AccountDrawer = () => {
  const [account, setAccount] = useState('')

  const handleLogin = async () => {
    if (account) {
      setAccount('')
    } else {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })

          setAccount(accounts[0])
        } else {
          alert('Install Metamask!')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <Box
      sx={{
        width: '360px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      role="presentation"
    >
      {/* 로그인 ON*/}
      {account && (
        <>
          <Box
            sx={{
              display: 'flex',
              padding: '20px',
              alignItems: 'center',
              alignSelf: 'stretch',
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button sx={{ padding: '0px' }}>
                <Box
                  sx={{
                    height: '30px',
                    width: '30px',
                    marginRight: '10px',
                  }}
                >
                  <AccountCircleIcon
                    sx={{ fontSize: '30px', color: 'rgba(0, 0, 0, 0.60)' }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: 'rgba(0, 0, 0, 0.87)',
                    }}
                  >
                    My wallet
                  </Typography>
                </Box>
              </Button>
            </Box>
            <Box>
              <Button
                sx={{
                  padding: '0px',
                  fontWeight: 'bold',
                  color: 'rgba(0, 0, 0, 0.38)',
                }}
              >
                0x97...17dc
              </Button>
            </Box>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Card
              sx={{
                margin: '20PX',
                border: '1px solid rgba(0,0,0, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton sx={{ padding: '5Px' }}>
                  <AutorenewRoundedIcon sx={{ fontSize: '20px' }} />
                </IconButton>
              </Box>

              <CardContent
                sx={{ textAlign: 'center', padding: '0px 20px 20px 20px' }}
              >
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.38)',
                    fontWeight: 'bold',
                    fontSize: '15px',
                  }}
                >
                  Total balance
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  $ 0.00 USD
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  width: '100%',
                  // backgroundColor: '#212121',
                  borderTop: '1px solid rgba(0,0,0, 0.1)',

                  padding: '0px',
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    padding: '12px 0px',
                    borderRadius: '0px 0px 4px 4px ',
                    backgroundColor: '#424242',
                    '&:hover': {
                      transition: 'all 0.2s ease 0s',
                      boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
                      backgroundColor: '#BDBDBD',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                    Add Funds
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          </Box>

          <Box>
            <Link
              underline="hover"
              sx={{ color: 'rgba(32, 129, 226, 0.6)' }}
              //   href=""
              onClick={handleLogin}
            >
              Logout
            </Link>
          </Box>
        </>
      )}

      {/* 로그인 OFF*/}
      {!account && (
        <>
          <Box
            sx={{
              display: 'flex',
              padding: '20px',
              alignItems: 'center',
              alignSelf: 'stretch',
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <Box
              sx={{
                height: '30px',
                width: '30px',
                marginRight: '10px',
              }}
            >
              <AccountCircleIcon
                sx={{ fontSize: '30px', color: 'rgba(0, 0, 0, 0.60)' }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: 'rgba(0, 0, 0, 0.87)',
                }}
              >
                My wallet
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              height: '46px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              margin: '20px',
            }}
          >
            <Button
              sx={{
                width: 'inherit',
                height: 'inherit',
                margin: '20px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                boxShadow: 'rgb(4 17 29 / 10%) 0px 0px 8px 0px',
              }}
              onClick={handleLogin}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{ height: '46px', display: 'flex', alignItems: 'center' }}
                >
                  <img
                    alt="metamask"
                    src={require(`assets/metamask.png`)}
                    height="26px"
                    style={{ display: 'block' }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.87)' }}
                  >
                    Metamask
                  </Typography>
                </Box>
              </Stack>
            </Button>
          </Box>

          <Box>
            <Link
              underline="hover"
              target="_blank"
              href="https://metamask.io/download/"
              sx={{ color: 'rgb(32, 129, 226)' }}
            >
              Create Metamask
            </Link>
          </Box>
        </>
      )}
    </Box>
  )
}

export default AccountDrawer