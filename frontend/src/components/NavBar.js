import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const NavBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '72px',
      }}
    >
      <Button
        to="/items"
        component={Link}
        sx={{ padding: '0px 20px', fontWeight: 'bold', fontSize: '16px' }}
      >
        Explore
      </Button>
      <Button
        to="/gacha"
        component={Link}
        sx={{ padding: '0px 20px', fontWeight: 'bold', fontSize: '16px' }}
      >
        Gacha
      </Button>
      <Button
        to="/404"
        component={Link}
        sx={{ padding: '0px 20px', fontWeight: 'bold', fontSize: '16px' }}
      >
        Play
      </Button>
    </Box>
  )
}

export default NavBar
