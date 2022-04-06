import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import ItemsList from 'components/ItemsList'
import Page404 from 'pages/Page404'
import AccountActivity from './AccountActivity'

const AccountTabs = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        mt: 3,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.68)',
        boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
        borderRadius: '10px',
      }}
    >
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab
          label="My Collection"
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            textTransform: 'none',
            '@media(max-width: 600px)': {
              fontSize: '16px',
            },
            '@media(max-width: 480px)': {
              fontSize: '14px',
            },
          }}
        />
        <Tab
          label="Activity"
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            textTransform: 'none',
            '@media(max-width: 600px)': {
              fontSize: '16px',
            },
            '@media(max-width: 480px)': {
              fontSize: '14px',
            },
          }}
        />
        <Tab
          label="Play"
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            textTransform: 'none',
            '@media(max-width: 600px)': {
              fontSize: '16px',
            },
            '@media(max-width: 480px)': {
              fontSize: '14px',
            },
          }}
        />
      </Tabs>
      {value === 0 ? (
        <ItemsList />
      ) : value === 1 ? (
        <Box
          sx={{
            padding: '0px 36px 36px 36px',
            '@media(max-width: 600px)': {
              padding: '0px 28px 36px 28px',
            },
            '@media(max-width: 480px)': {
              padding: '0px 16px 36px 16px',
            },
          }}
        >
          <AccountActivity />
        </Box>
      ) : (
        <Page404 />
      )}
    </Box>
  )
}

export default AccountTabs
