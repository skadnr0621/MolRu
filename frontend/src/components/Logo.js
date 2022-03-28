import Box from '@mui/material/Box'
import logo from '../assets/logo.png'

const Logo = () => {
  return (
    <Box
      component="img"
      src={logo}
      sx={{
        display: 'flex',
        height: '72px',
        paddingRight: '189px',
        paddingLeft: '16px',
      }}
    />
  )
}

export default Logo
