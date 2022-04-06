import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const DescriptionContent = ({ icon, title, content }) => {
  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={4}
      lg={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={1}>
        <Box sx={{ textAlign: 'center' }}>{icon}</Box>
        <Box>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              color: 'rgba(0, 0, 0, 0.38)',
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Box>
      </Stack>
    </Grid>
  )
}

export default DescriptionContent
