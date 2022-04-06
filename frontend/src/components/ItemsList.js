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

const ItemsArray = [
  {
    owner: '김남욱',
    price: '0.01',
    title: 'Molrudy #1',
    date: '22.01.01',
    img: 'molrudy.png',
    audio: '',
  },
]

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
        {ItemsArray.map((value, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              key={index}
              owner={value.owner}
              price={value.price}
              title={value.title}
              date={value.date}
              img={value.img}
              audio={value.audio}
            />
          </Grid>
        ))}
      </Grid>
    </ItemsListStyle>
  )
}

export default ItemsList
