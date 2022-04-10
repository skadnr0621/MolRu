import Box from '@mui/material/Box'
import GachaBg from 'assets/gacha-bg.png'

const MelodyBackground = () => {
  return (
    <Box
      component="img"
      src={GachaBg}
      sx={{
        width: '100%',
        objectFit: 'cover',
        height: 'min(100%, 640px)',
        position: 'absolute',
        zIndex: '-100',
      }}
    />
  )
}

export default MelodyBackground
