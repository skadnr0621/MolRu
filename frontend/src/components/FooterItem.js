// import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'

const FooterItem = ({ item }) => {
  const key = Object.keys(item)
  const values = item[key]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100px',
      }}
    >
      <Link href="#" underline="none" mb="30px" sx={{ fontWeight: 'bold' }}>
        {key}
      </Link>
      <Stack spacing={2}>
        {values.map((value) => (
          <Link href="#" underline="hover">
            {value}
          </Link>
        ))}
      </Stack>
    </Box>
  )
}

export default FooterItem
