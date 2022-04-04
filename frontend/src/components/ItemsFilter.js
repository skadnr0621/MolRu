import React, { useCallback, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import FilterListIcon from '@mui/icons-material/FilterList'
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor: '#FAFAFA',
  padding: theme.spacing(2),
  borderTop: '1px solid #E0E0E0',
}))

const FilterStyle = styled('div')({
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  width: '340px',
  height: 'inherit',
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
})

const FilterOpenStyle = styled('div')({
  backgroundColor: '#ffffff',
  width: '40px',
  height: 'inherit',
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  textAlign: 'center',
  marginTop: '10px',
})

const ItemsFilter = () => {
  // query 속성 값 참고
  const [searchParams, setSearchParams] = useSearchParams()

  const statuses = { all: 0, sale: 1, unsold: 2 }
  const categories = {
    전체: 0,
    화남: 1,
    밝음: 2,
    차분함: 3,
    어두움: 4,
    극적: 5,
    펑키: 6,
    행복: 7,
    낭만적: 8,
    슬픔: 9,
  }

  const [filter, setFilter] = useState(true)
  const [status, setStatus] = useState(searchParams.get('status'))
  const [prices, setPrices] = useState([20, 37])
  const [category, setCategory] = useState(searchParams.get('category'))

  const handleFilter = () => {
    if (filter) {
      alert('필터 닫기')
      document.querySelector('.filter').style.display = 'none'
      document.querySelector('.open-filter').style.display = 'block'
    } else {
      alert('필터 열기')
      document.querySelector('.filter').style.display = 'flex'
      document.querySelector('.open-filter').style.display = 'none'
    }

    setFilter(!filter)
  }

  const handleStatus = (event, value, index) => {
    setSearchParams({ category: category, status: value })
  }

  const handleCategory = (event, value, index) => {
    setSearchParams({ category: value, status: status })
  }

  const handlePrices = (event, newPrices, activeThumb) => {
    if (!Array.isArray(newPrices)) {
      return
    }

    const minDistance = 0

    if (activeThumb === 0) {
      setPrices([Math.min(newPrices[0], prices[1] - minDistance), prices[1]])
    } else {
      setPrices([prices[0], Math.max(newPrices[1], prices[0] + minDistance)])
    }
  }

  const handlePrice = () => {
    alert(`${prices[0]} ${prices[1]}`)
  }

  useEffect(() => {
    // 판매 상태
    document.querySelector('.status').children[
      statuses[status]
    ].style.backgroundColor = '#ffffff'
    document.querySelector('.status').children[
      statuses[searchParams.get('status')]
    ].style.backgroundColor = 'rgba(0, 0, 0, 0.04)'
    setStatus(searchParams.get('status'))

    // 카테고리
    document.querySelector('.category').children[
      categories[category]
    ].style.backgroundColor = ''
    document.querySelector('.category').children[
      categories[searchParams.get('category')]
    ].style.backgroundColor = 'rgba(0, 0, 0, 0.04)'
    setCategory(searchParams.get('category'))
  })

  return (
    <>
      <FilterOpenStyle className="open-filter" sx={{ display: 'none' }}>
        <IconButton onClick={handleFilter}>
          <DoubleArrowOutlinedIcon
            sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.54)' }}
          />
        </IconButton>
      </FilterOpenStyle>
      <FilterStyle className="filter">
        <Box
          sx={{
            height: '64px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 10px 16px 16px',
            backgroundColor: '#EEEEEE',
          }}
        >
          <Stack direction="row" spacing={1}>
            <FilterListIcon
              sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)' }}
            />
            <Typography sx={{ fontWeight: 'bold' }}>Filter</Typography>
          </Stack>

          <IconButton onClick={handleFilter}>
            <ClearOutlinedIcon
              sx={{ fontSize: '22px', color: 'rgba(0, 0, 0, 0.54)' }}
            />
          </IconButton>
        </Box>
        <Accordion sx={{ borderRight: 'none' }}>
          <AccordionSummary
            sx={{ height: '64px', fontWeight: 'bold' }}
            expandIcon={<ExpandMoreIcon />}
          >
            Status
          </AccordionSummary>
          <AccordionDetails
            sx={{ height: '80px', display: 'flex', alignItems: 'center' }}
          >
            <Stack direction="row" spacing={3} className="status">
              {Object.keys(statuses).map((value, index) => (
                <ToggleButton
                  onChange={(event) => handleStatus(event, value, index)}
                  value={value}
                  sx={{ backgroundColor: '#ffffff' }}
                  key={index}
                >
                  {value}
                </ToggleButton>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ borderRight: 'none' }}>
          <AccordionSummary
            sx={{ height: '64px', fontWeight: 'bold' }}
            expandIcon={<ExpandMoreIcon />}
          >
            Price
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <Box>
                <Slider
                  getAriaLabel={() => 'Minimum distance'}
                  value={prices}
                  onChange={handlePrices}
                  valueLabelDisplay="auto"
                  disableSwap
                />
              </Box>
              <Box>
                <Button
                  id="apply-btn"
                  variant="outlined"
                  sx={{ width: '120px', fontWeight: 'bold' }}
                  onClick={handlePrice}
                >
                  Apply
                </Button>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ borderRight: 'none' }}>
          <AccordionSummary
            sx={{ height: '64px', fontWeight: 'bold' }}
            expandIcon={<ExpandMoreIcon />}
          >
            Categories
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0px' }}>
            <MenuList className="category">
              {Object.keys(categories).map((value, index) => (
                <MenuItem
                  sx={{
                    padding: '10px 0px 10px 16px',
                  }}
                  onClick={(event) => handleCategory(event, value, index)}
                  key={index}
                >
                  {value}
                </MenuItem>
              ))}
            </MenuList>
          </AccordionDetails>
        </Accordion>
      </FilterStyle>
    </>
  )
}

export default ItemsFilter
