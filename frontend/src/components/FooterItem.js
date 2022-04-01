// import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'

const FooterItem = ({ item }) => {
  const mainMenu = Object.keys(item)
  const subMenu = item[mainMenu]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100px',
      }}
    >
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
    </Box>
  )
}

export default FooterItem
