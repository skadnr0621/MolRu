import React, { useCallback, useState, useEffect } from 'react'
import ItemsListFilter from 'components/ItemsListFilter'
import ItemCard from 'components/ItemCard'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const ItemsListStyle = styled('div')({
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  width: 'inherit',
  height: 'auto',
  padding: '0px 28px',
  marginBottom: '100px',
})

const ItemsList = () => {
  const [itemsCnt, setItemsCnt] = useState(100)

  // spacing - large: 3, small:
  return (
    <ItemsListStyle>
      <ItemsListFilter />
      <Typography mb="32px" sx={{ height: '24px' }}>
        {itemsCnt} items
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ItemCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ItemCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ItemCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ItemCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ItemCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ItemCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ItemCard />
        </Grid>
      </Grid>
    </ItemsListStyle>
  )
}

export default ItemsList
