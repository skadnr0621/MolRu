import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetailCard from 'components/ItemDetailCard'
import ItemDetailContent from 'components/ItemDetailContent'
import ItemDetailActivity from 'components/ItemDetailActivity'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { api } from '../api/index'

import Web3 from 'web3'
import ABI from '../common/ABI'

const ItemDetailStyle = styled('div')({
  width: 'min(1280px, 100% - 100px)',
  height: 'auto',
  margin: '30px auto 60px auto',
  display: 'flex',
  flexDirection: 'column',
})

const ItemDetail = () => {
  const { tokenCA, tokenId } = useParams()
  const [item, setItem] = useState('')

  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      process.env.REACT_APP_ETHEREUM_RPC_URL,
    ),
  )

  useEffect(() => {
    getItem()
  }, [])

  const getItem = async () => {
    try {
      let resp = await api
        .get(`/nft/${tokenId}`)
        .catch((err) => console.error('Error while GET /item/${tokenId}', err))

      const item = resp.data

      // get additional info from contract
      const ssafyNftContract = new web3.eth.Contract(
        ABI.CONTRACT_ABI.NFT_ABI,
        process.env.REACT_APP_NFT_CA,
      )
      await ssafyNftContract.methods
        .tokenURI(item.tokenId)
        .call()
        .then((result) => {
          item.imagePath = result
        })

      setItem(item)
    } catch (err) {
      console.error('Error at ItemDetailCard > getItem', err)
    }
  }

  return (
    <ItemDetailStyle>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5} md={5} lg={5}>
            <ItemDetailCard isHeader={true} item={item} />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7}>
            <ItemDetailContent item={item} />
          </Grid>
        </Grid>
      </Box>
      <ItemDetailActivity item={item} />
    </ItemDetailStyle>
  )
}

export default ItemDetail
