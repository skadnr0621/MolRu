// import { Link } from 'react-router-dom'
import { makeStyles, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'

const FooterItem = ({ item }) => {
  const FooterItemStyle = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',

    '@media(max-width: 480px)': {
      flexBasis: '100%',
      marginBottom: '60px',
      textAlign: 'center',
    },
  })

  const mainMenu = Object.keys(item)
  const subMenu = item[mainMenu]

  return (
    <FooterItemStyle>
      <Link href="#" underline="none" mb="30px" sx={{ fontWeight: 'bold' }}>
        {mainMenu}
      </Link>
      <Stack spacing={2}>
        {subMenu.map((value, index) => (
          <Link href="#" underline="hover" key={index}>
            {value}
          </Link>
        ))}
      </Stack>
    </FooterItemStyle>
  )
}

export default FooterItem
