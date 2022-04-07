import React, { useCallback, useState, useEffect } from 'react'
import noItem from 'assets/no-Item.gif'
import ItemsListFilter from 'components/ItemsListFilter'
import ItemCard from 'components/ItemCard'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useSearchParams } from 'react-router-dom'

import { api } from '../api/index'

import Web3 from 'web3'
import ABI from '../common/ABI'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1000,
      lg: 1280,
      xl: 1800,
    },
  },
})

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
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState('')
  const [itemsCnt, setItemsCnt] = useState(0)

  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      process.env.REACT_APP_ETHEREUM_RPC_URL,
    ),
  )

  useEffect(() => {
    search()
  }, [searchParams])

  const search = async () => {
    try {
      const category = searchParams.get('category')
      const status = searchParams.get('status')
      const address = searchParams.get('address')

      var resp = await api
        .get(`/nft?category=${category}&status=${status}&address=${address}`)
        .catch((err) =>
          console.error('Error while GET /nft?category&status&address', err),
        )
      console.log(resp)

      const items = resp.data
      console.log('items : ', items)
      const ssafyNftContract = new web3.eth.Contract(
        ABI.CONTRACT_ABI.NFT_ABI,
        process.env.REACT_APP_NFT_CA,
      )

      for (var i = 0; i < items.length; ++i) {
        if (items[i].tokenId == null) continue
        items[i].tokenURI = await ssafyNftContract.methods
          .tokenURI(items[i].tokenId)
          .call()
          .catch((err) =>
            // price 채우고
            console.log('Error while ssafyNftContract tokenURI', err),
          )
      }

      setItems(items)
      setItemsCnt(items.length)
    } catch (err) {
      console.error('Error at ItemsList > search', err)
    }
  }

  const ItemsArray = [...Array(items.length)].map((_, index) => {
    return {
      tokenCA: items[index].tokenCA,
      tokenId: items[index].tokenId,
      owner: items[index].address,
      price: items[index].price,
      title: items[index].tokenTitle,
      date: items[index].createdDate,
      img: items[index].tokenURI,
      audio: process.env.REACT_APP_API_URL + items[index].tokenAudio,
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <ItemsListStyle>
        <ItemsListFilter />
        <Typography mb="32px" sx={{ height: '24px' }}>
          {itemsCnt} items
        </Typography>

        {itemsCnt == 0 && (
          <Box
            component="img"
            src={noItem}
            sx={{ width: '50%', margin: '0 auto' }}
          />
        )}

        {itemsCnt > 0 && (
          <Grid container sx={{ margin: '0px', width: 'auto' }}>
            {ItemsArray.map((value, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
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
        )}
      </ItemsListStyle>
    </ThemeProvider>
  )
}

export default ItemsList
