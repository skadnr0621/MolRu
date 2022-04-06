import Box from '@mui/material/Box'
import logo from '../assets/logo.jpg'

const Logo = ({ height }) => {
  return (
    <Box
      component="img"
      src={logo}
      sx={{
        display: 'flex',
        height: height,
        padding: '16px',
      }}
    />
  )
}

export default Logo
