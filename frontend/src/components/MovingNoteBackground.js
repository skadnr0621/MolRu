import Container from '@mui/material/Container'
import PlayNote from 'assets/play-note.gif'

const MelodyBackground = () => {
  return (
    <Container
      maxWidth="sm"
      component="img"
      src={PlayNote}
      sx={{
        position: 'absolute',
        zIndex: '-50',
      }}
    />
  )
}

export default MelodyBackground
