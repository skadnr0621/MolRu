import React from 'react'
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

const rows = [
  {
    id: 1,
    event: 'Minted',
    price: '',
    from: '',
    to: '오용록',
    date: '4 months ago',
    transaction: '',
  },
  {
    id: 2,
    event: 'List',
    price: '0.03',
    from: '오용록',
    to: '',
    date: 'a month ago',
    transaction: '',
  },
  {
    id: 3,
    event: 'Cancel',
    price: '0.03',
    from: '오용록',
    to: '',
    date: 'a month ago',
    transaction: '',
  },
  {
    id: 4,
    event: 'Sale',
    price: '0.06',
    from: '오용록',
    to: '김남욱',
    date: '3 days ago',
    transaction:
      'https://etherscan.io/tx/0x52004620bd6ea9c88b113a45c720ffb85e363cf912a4d364da13846cde68658f',
  },
  {
    id: 5,
    event: 'Transfer',
    price: '',
    from: '오용록',
    to: '김남욱',
    date: '3 days ago',
    transaction:
      'https://etherscan.io/tx/0x52004620bd6ea9c88b113a45c720ffb85e363cf912a4d364da13846cde68658f',
  },
  {
    id: 6,
    event: 'Expired',
    price: '0.01',
    from: '이상윤',
    to: '',
    date: '3 days ago',
    transaction: '',
  },
  {
    id: 7,
    event: 'Offer',
    price: '0.1',
    from: '이호열',
    to: '',
    date: '3 days ago',
    transaction: '',
  },
  {
    id: 8,
    event: 'Bid Cancel',
    price: '0.1',
    from: '이호열',
    to: '',
    date: '3 days ago',
    transaction:
      'https://etherscan.io/tx/0x52004620bd6ea9c88b113a45c720ffb85e363cf912a4d364da13846cde68658f',
  },
]

// valueFormatter, renderCell
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
              src="https://img.icons8.com/color/48/000000/ethereum.png"
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
  {
    field: 'transaction',
    headerName: 'Transaction',
    flex: 1,
    headerClassName: 'header',
    renderCell: (params) => {
      if (params.value) {
        return (
          <Link underline="hover" href={params.value}>
            <OpenInNewIcon sx={{ color: 'rgb(32, 129, 226)' }} />
          </Link>
        )
      } else {
        return ''
      }
    },
  },
]

const ItemDetailActivity = () => {
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

export default ItemDetailActivity
