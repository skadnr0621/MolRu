import React, { useEffect } from 'react'
import { makeStyles, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'

const SearchBar = ({ top100Films }) => {
  const SearchBarStyle = styled('div')({
    display: 'flex',
    height: '72px',
    width: '100%',
    maxWidth: '768px',
    alignItems: 'center',
    margin: '0px 16px',

    '@media(max-width: 480px)': {
      display: 'none',
    },
  })

  return (
    <SearchBarStyle id="search-bar">
      <Autocomplete
        sx={{ width: 'inherit' }}
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
    </SearchBarStyle>
  )
}

export default SearchBar

//  <Autocomplete
//   freeSolo
//   id="free-solo-2-demo"
//   disableClearable
//   options={top100Films.map((option) => option.title)}
//   renderInput={(params) => (
//     <TextField
//       {...params}
//       label="Search input"
//       InputProps={{
//         ...params.InputProps,
//         type: 'search',
//       }}
//     />
//   )}
// />
