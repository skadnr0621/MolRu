import React, { useCallback, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import WindowSharpIcon from '@mui/icons-material/WindowSharp'
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp'

const ItemsListFilter = () => {
  const [sort, setSort] = useState('')

  const handleSort = (event) => {
    alert(event.target.value)
    setSort(event.target.value)
  }

  const [grid, setGrid] = React.useState('large')

  const handleGrid = (event, newGrid) => {
    alert(newGrid)
    setGrid(newGrid)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '68px',
        margin: '16px 0px 10px',
      }}
    >
      <Box mr="16px" sx={{ width: 'inherit' }}>
        <Autocomplete
          sx={{ width: 'auto' }}
          size="small"
          freeSolo
          options={searchArray}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
      </Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Box>
          <FormControl sx={{ minWidth: '200px' }} size="small">
            <InputLabel>Sort by</InputLabel>
            <Select value={sort} onChange={handleSort} label="Sort by">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {sortArray.map((value, index) => (
                <MenuItem value={value[0]} key={index}>
                  {value[1]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <ToggleButtonGroup
            value={grid}
            exclusive
            onChange={handleGrid}
            size="small"
          >
            <ToggleButton value="large">
              <WindowSharpIcon />
            </ToggleButton>
            <ToggleButton value="small">
              <GridOnSharpIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>
    </Box>
  )
}

const searchArray = ['몰루']
const sortArray = [
  ['recently created', 'Recently Created'],
  ['recently sold', 'Recently Sold'],
  ['oldest', 'Oldest'],
  ['lowest', 'Price: Low to High'],
  ['highest', 'Price: Hight to Low'],
  ['most viewed', 'Most Viewed'],
  ['most favorited', 'Most Favorited'],
]

export default ItemsListFilter
