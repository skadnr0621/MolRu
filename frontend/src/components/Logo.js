import Box from '@mui/material/Box'
import logo from '../assets/logo.png'

const Logo = ({ height }) => {
  return (
    <Box
      component="img"
      src={logo}
      sx={{
        display: 'flex',
        width: 'fit-content',
        height: height,
        paddingRight: '189px',
        paddingLeft: '16px',
      }}
    />
  )
}

export default Logo
