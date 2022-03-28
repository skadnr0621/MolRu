import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'

const AccountBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '72px',
      }}
    >
      <Button to="/account" component={Link} sx={{ padding: '0px 20px' }}>
        <AccountCircleOutlinedIcon fontSize="large" />
      </Button>
      <Button to="/main" component={Link} sx={{ padding: '0px 20px' }}>
        <AccountBalanceWalletOutlinedIcon fontSize="large" />
      </Button>
    </Box>
  )
}

export default AccountBar
