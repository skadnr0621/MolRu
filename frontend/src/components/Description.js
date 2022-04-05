import React from 'react'
import { styled } from '@mui/material/styles'
import DescriptionContent from './DescriptionContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Description = () => {
  const descriptions = [
    {
      icon: `<AccountBalanceWalletOutlinedIcon />`,
      title: `지갑 설정`,
      content: `지갑을 생성한 후,<br />오른쪽 상단 모서리에 있는 지갑 아이콘을<br />클릭하여 MOLRU에 연결하세요.`,
    },
    {
      icon: `<AccountBalanceWalletOutlinedIcon />`,
      title: `NFT 생성`,
      content: `Create 를 클릭하여<br />멜로디 NFT 뽑기를 합니다.<br />이때, 멜로디는 무작위로 생성됩니다.`,
    },
    {
      icon: `<AccountBalanceWalletOutlinedIcon />`,
      title: `NFT 판매`,
      content: `마이 페이지 > NFT 목록 > 소유한 NFT 에서<br />원하는 NFT를 판매할 수 있습니다.`,
    },
  ]

  const DescContainer = styled('div')({
    width: '100%',
    maxWidth: '1080px',
    padding: '60px 0px',
    display: 'flex',
    flexDirection: 'column',
    margin: '50px auto',
  })

  return (
    <Box sx={{ backgroundColor: '#FAFAFA', width: '100%' }}>
      <DescContainer>
        <Stack spacing={7} sx={{ width: '100%' }}>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '28px',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              NFT 생성 및 판매
            </Typography>
          </Box>

          <Grid container sx={{ width: '100%' }}>
            {descriptions.map((value, index) => (
              <DescriptionContent
                key={index}
                icon={value.icon}
                title={value.title}
                content={value.content}
              />
            ))}
          </Grid>
        </Stack>
      </DescContainer>
    </Box>
  )
}

export default Description
