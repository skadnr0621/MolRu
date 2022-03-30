import React from 'react'
import ItemsFilter from 'components/ItemsFilter'
import ItemsList from 'components/ItemsList'
import Box from '@mui/material/Box'

const Items = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
      }}
    >
      <ItemsFilter />
      <ItemsList />
    </Box>
  )
}

export default Items
