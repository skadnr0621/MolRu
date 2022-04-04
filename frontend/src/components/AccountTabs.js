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
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="My collection" />
        <Tab label="Activity" />
        <Tab label="Play" />
      </Tabs>
      {value === 0 ? (
        <ItemsList />
      ) : value === 1 ? (
        <AccountActivity />
      ) : (
        <Page404 />
      )}
    </Box>
  )
}

export default AccountTabs
