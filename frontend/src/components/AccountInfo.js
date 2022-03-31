import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AccountTabs from './AccountTabs'

const AccountInfo = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 3,
        mb: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar
        sx={{
          m: 2,
          width: 100,
          height: 100,
          backgroundColor: 'black',
          fontSize: 40,
        }}
      >
        M
      </Avatar>
      <Typography variant="h5" component="div" gutterBottom>
        김남욱
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        0x34df...2312
      </Typography>
      <AccountTabs />
    </Container>
  )
}

export default AccountInfo
