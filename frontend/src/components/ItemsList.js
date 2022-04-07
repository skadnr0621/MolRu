import React, { useCallback, useState, useEffect } from 'react'
import ItemsListFilter from 'components/ItemsListFilter'
import ItemCard from 'components/ItemCard'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { useSearchParams } from 'react-router-dom'

import { api } from '../api/index'

import Web3 from 'web3'
import ABI from '../common/ABI'

const ItemsListStyle = styled('div')({
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  width: 'inherit',
  height: 'auto',
  padding: '0px 28px',
  marginBottom: '100px',
})

// const ItemsArray = [
//   {
//     owner: '김남욱',
//     price: '0.01',
//     title: 'Molrudy #1',
//     date: '22.01.01',
//     img: 'molrudy.png',
//     audio: '',
//   },
// ]

const ItemsList = () => {
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState('')
  const [itemsCnt, setItemsCnt] = useState(100)

  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      process.env.REACT_APP_ETHEREUM_RPC_URL,
    ),
  )

  useEffect(() => {
    search()
  }, [])

  const search = async () => {
    try {
      const category = searchParams.get('category')
      const status = searchParams.get('status')
      const address = searchParams.get('address')

      console.log("category", category);
      console.log("status", status);
      console.log("address", address);

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
    } catch (err) {
      console.error('Error at ItemsList > search', err)
    }
  }

  const ItemsArray = [...Array(items.length)].map((_, index) => {
    return {
      owner: items[index].ownerAddress,
      // price: ,
      title: items[index].tokenTitle,
      date: items[index].createdDate,
      img: items[index].imagePath,
      audio: items[index].audioPath,
    }
  })

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
