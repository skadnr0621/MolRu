import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from 'contexts/context'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Link from '@mui/material/Link'
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import PanToolIcon from '@mui/icons-material/PanTool'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SsfImg from 'assets/ssf.jpg'
import { api } from '../api/index'

import Web3 from 'web3'
import ABI from '../common/ABI'

const AccountActivity = () => {
  const { state, actions } = useContext(AppContext)
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', hide: true },
    {
      field: 'event',
      headerName: 'Event',
      flex: 1,
      headerClassName: 'header',
      renderCell: (params) => {
        switch (params.value) {
          case 'Minted':
            return (
              <>
                <ChildFriendlyIcon sx={{ marginRight: '10px' }} />
                {params.value}
              </>
            )
          case 'List':
            return (
              <>
                <LocalOfferIcon sx={{ marginRight: '10px' }} />
                {params.value}
              </>
            )
          case 'Sale':
            return (
              <>
                <ShoppingCartIcon sx={{ marginRight: '10px' }} />
                {params.value}
              </>
            )
          case 'Transfer':
            return (
              <>
                <SwapHorizIcon sx={{ marginRight: '10px' }} />
                {params.value}
              </>
            )
          case 'Cancel':
            return (
              <>
                <NewReleasesIcon sx={{ marginRight: '10px' }} />
                {params.value}
              </>
            )
          case 'Offer':
            return (
              <>
                <PanToolIcon sx={{ marginRight: '10px' }} />
                {params.value}
              </>
            )
          case 'Expired':
            return (
              <>
                <PanToolIcon sx={{ marginRight: '10px' }} />
                Offer
                <Typography
                  sx={{
                    color: '#DD2C00',
                    fontSize: '12px',
                    marginLeft: '7px',
                  }}
                >
                  {params.value}
                </Typography>
              </>
            )
          case 'Bid Cancel':
            return (
              <>
                <SentimentSatisfiedIcon sx={{ marginRight: '10px' }} />
                {params.value}
              </>
            )
          default:
            return <>{params.value}</>
        }
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      headerClassName: 'header',
      renderCell: (params) => {
        if (params.value) {
          return (
            <Typography>
              <img
                src={SsfImg}
                style={{
                  height: '16px',
                  marginRight: '3px',
                  verticalAlign: 'text-top',
                }}
              />
              {params.value}
            </Typography>
          )
        } else {
          return <>{params.value}</>
        }
      },
    },
    {
      field: 'from',
      headerName: 'From',
      flex: 1,
      headerClassName: 'header',
      renderCell: (params) => (
        <Link underline="hover" href={`account:${params.value}`}>
          {params.value.toString()}
        </Link>
      ),
    },
    {
      field: 'to',
      headerName: 'To',
      flex: 1,
      headerClassName: 'header',
      renderCell: (params) => (
        <Link underline="hover" href={`account:${params.value}`}>
          {params.value.toString()}
        </Link>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      flex: 1,
      headerClassName: 'header',
      // renderCell: (params) => (
      //   // <Link
      //   //   href={`https://etherscan.io/tx/0x5be8f0afe51f09221451919f09e093cb33c6ae43206e2e0fd427a4342862a4e9`}
      //   // >
      //     {params.index.toString()}
      //   // </Link>
      // ),
    },
  ]

  const [activity, setActivity] = useState([])

  const getActivity = async () => {
    console.log(state.account)
    const res = await api.get(`/sale/seller/${state.account}`)
    const arr = res.data
    console.log(arr)
    const r = []
    for (let i = 0; i < arr.length; i++) {
      const d = arr[i].createdAt
      const isGacha = arr[i].buyerAddress
      const a = {
        id: i + 1,
        event: isGacha ? 'Gacha!' : 'Minted',
        price: '100 SSF',
        from: arr[i].sellerAddress,
        to: isGacha || '',
        date: `${d[0]} / ${d[1]} / ${d[2]}`,
      }
      r.push(a)
    }
    setRows(r)
  }

  useEffect(() => {
    getActivity()
  }, [])

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Typography
        sx={{
          padding: '10px 0px',
          fontSize: '22px',
          fontWeight: 'bold',
          '@media(max-width: 600px)': {
            fontSize: '20px',
          },
          '@media(max-width: 480px)': {
            fontSize: '18px',
          },
        }}
      >
        <FormatListBulletedIcon
          sx={{ verticalAlign: 'text-top', marginRight: '8px' }}
        />
        Item Activity
      </Typography>
      <Box
        sx={{
          height: '400px',
          width: '100%',
          '& .header': {
            backgroundColor: '#FAFAFA',
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} sx={{ fontSize: '16px' }} />
      </Box>
    </Box>
  )
}

export default AccountActivity
