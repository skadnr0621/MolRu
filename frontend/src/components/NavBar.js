import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const categories = [
  '전체',
  '화남',
  '밝음',
  '차분함',
  '어두움',
  '극적',
  '펑키',
  '행복',
  '낭만적',
  '슬픔',
]

// const useStyles = makeStyles({
//   root: {
//     backgroundColor: 'red',
//     color: (props) => props.color,
//   },
// });

const NavBar = () => {
  const NavBarStyle = styled('div')({
    display: 'flex',

    '@media(max-width: 905px)': {
      flexDirection: 'column',
      '.navbar-div': {
        padding: '10px 0px',
        width: '100%',
      },
      // flexDirection: 'column',
      // '#more-menu': {
      //   display: 'inline-block',
      // },
    },
  })

  // const isTablet = useMediaQuery('(max-width: 905px)') // 905px 이하인 경우

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <NavBarStyle>
      <Button
        className="navbar-div"
        onClick={handleClick}
        sx={{ padding: '0px 20px', fontWeight: 'bold', fontSize: '16px' }}
        to={`/items?category=전체&status=all`}
        component={Link}
      >
        Explore
      </Button>

      <Button
        className="navbar-div"
        to="/gacha"
        component={Link}
        sx={{ padding: '0px 20px', fontWeight: 'bold', fontSize: '16px' }}
      >
        Gacha
      </Button>

      <Button
        className="navbar-div"
        to="/404"
        component={Link}
        sx={{ padding: '0px 20px', fontWeight: 'bold', fontSize: '16px' }}
      >
        Play
      </Button>
    </NavBarStyle>
  )
}

export default NavBar
