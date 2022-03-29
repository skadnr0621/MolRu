import React from 'react'
import FooterItem from 'components/FooterItem'
import Logo from 'components/Logo'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'

const Footer = () => {
  const FooterStyle = styled('div')({
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: 'auto',
    bottom: '0px',
    position: 'fixed',
    paddingTop: '40px',
    paddingBottom: '50px',
  })

  const items = [
    {
      Explore: [
        '전체',
        '화남',
        '밝음',
        '차분함',
        '어두움',
        '극적',
        '펑키',
        '행복',
        '낭만적',
        '슬픔',
      ],
    },
    { Gacha: ['Gacha'] },
    { 'My Account': ['Profile', 'NFT List', 'Setting'] },
    { Developer: ['김남욱', '오용록', '이상윤', '이호열', '임채은'] },
  ]

  return (
    <FooterStyle>
      {/* <Logo height="45px" /> */}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          justifyContent: 'space-evenly',
        }}
      >
        {items.map((item) => (
          <FooterItem item={item} />
        ))}
      </Box>
    </FooterStyle>
  )
}

export default Footer
