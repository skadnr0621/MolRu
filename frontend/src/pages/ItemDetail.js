import React from 'react'
import ItemDetailCard from 'components/ItemDetailCard'
import ItemDetailContent from 'components/ItemDetailContent'
import ItemDetailActivity from 'components/ItemDetailActivity'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const ItemDetailStyle = styled('div')({
  width: 'min(1280px, 100% - 100px)',
  height: 'auto',
  margin: '30px auto 60px auto',
  display: 'flex',
  flexDirection: 'column',
})

const ItemDetail = () => {
  return (
    <ItemDetailStyle>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5} md={5} lg={5}>
            <ItemDetailCard isHeader={true} />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7}>
            <ItemDetailContent />
          </Grid>
        </Grid>
      </Box>
      <ItemDetailActivity />
    </ItemDetailStyle>
  )
}

export default ItemDetail
