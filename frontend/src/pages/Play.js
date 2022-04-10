import React, { useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Sakura from 'assets/sakura.mp4'
import Playground from 'assets/playground.png'

const NoneStyle = styled('div')({
  display: 'none',
  paddingTop: '50px',
  paddingBottom: '100px',

  '@media(max-width: 899px)': {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
})

const PianoStyle = styled('div')({
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '70px',
  paddingBottom: '70px',

  '@media(max-width: 899px)': {
    display: 'none',
  },

  '#bgvid': {
    position: 'fixed',
    top: '50%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    zIndex: '-100',
    transform: 'translateX(-50%) translateY(-50%)',
    backgroundSize: 'cover',
    opacity: '0.2',
  },

  '.piano': {
    position: 'relative',
    minWidth: '850px',
    maxWidth: '850p',
    overflowX: 'aut',
    paddingBottom: '30p',
    background: 'transparent',
  },

  '.key': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  '.key-content': {
    paddingBottom: '10px',
    fontWeight: 'bold',
  },

  '.piano-black-keys': {
    position: 'absolute',
    zIndex: '2',
    left: '57.5px',
    top: '0',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  '.piano-white-keys': {
    maxWidth: '100%',
    overflowX: 'auto',
    display: 'flex',
    paddingBottom: '50px',
  },

  '.white-key': {
    position: 'relative',
    backgroundColor: 'white',
    color: 'black',
    width: '75px',
    minWidth: '75px',
    height: '270px',
    margin: '0 5px',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    boxShadow: '3px 5px 10px rgba(0, 0, 0, 0.3)',
  },

  '.black-key': {
    width: '55px',
    height: '160px',
    backgroundColor: 'black',
    color: 'white',
    zIndex: '2',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    boxShadow: '3px 5px 10px rgba(0, 0, 0, 0.3)',
  },

  '.white-key:hover': {
    backgroundColor: '#E0E0E0',
  },

  '.black-key:hover': {
    backgroundColor: '#E0E0E0',
  },

  '.key-group': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  '.key-group:not(:first-of-type):not(last-child)': {
    margin: '0 57.5px',
  },

  '.key-group:first-of-type': {
    marginRight: '57.5px',
  },

  '.key-group:last-child': {
    marginLeft: '57.5px',
  },

  '.key-group .black-key:not(:first-of-type):not(:last-child)': {
    margin: '0 15px',
  },

  '.key-group .black-key:first-of-type': {
    marginRight: '15px',
  },
  '.key-group .black-key:last-child': {
    marginLeft: '15px',
  },

  '.black-key-hover': {
    backgroundColor: 'rgb(26, 26, 26)',
  },
})

const Play = () => {
  const playSound = (event) => {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`)
    if (!audio) return
    audio.currentTime = 0
    audio.play()

    key.style.backgroundColor = '#E0E0E0'
  }

  const stopSound = () => {
    const whiteKeyArray = document.querySelectorAll('.white-key')
    const blackKeyArray = document.querySelectorAll('.black-key')

    whiteKeyArray.forEach((value) => {
      value.style.backgroundColor = 'white'
    })

    blackKeyArray.forEach((value) => {
      value.style.backgroundColor = 'black'
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', playSound)
    window.addEventListener('keyup', stopSound)
  }, [])

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}
      >
        <img src={Playground} />
        {/* <Typography sx={{ fontSize: '38px', fontWeight: 'bold' }}>
          Molru Playground
        </Typography> */}
      </Box>

      <NoneStyle>
        <Typography>브라우저 너비 900px 이상에서 지원됩니다.</Typography>
      </NoneStyle>

      <PianoStyle>
        <video muted loop autoPlay id="bgvid">
          <source src={Sakura} type="video/mp4" />
        </video>

        <Box className="piano">
          <Box className="piano-white-keys">
            <Box className="key white-key" data-key="65">
              <Typography className="key-content">A</Typography>
            </Box>
            <Box className="key white-key" data-key="83">
              <Typography className="key-content">S</Typography>
            </Box>
            <Box className="key white-key" data-key="68">
              <Typography className="key-content">D</Typography>
            </Box>
            <Box className="key white-key" data-key="70">
              <Typography className="key-content">F</Typography>
            </Box>
            <Box className="key white-key" data-key="71">
              <Typography className="key-content">G</Typography>
            </Box>
            <Box className="key white-key" data-key="72">
              <Typography className="key-content">H</Typography>
            </Box>
            <Box className="key white-key" data-key="74">
              <Typography className="key-content">J</Typography>
            </Box>
            <Box className="key white-key" data-key="75">
              <Typography className="key-content">K</Typography>
            </Box>
            <Box className="key white-key" data-key="76">
              <Typography className="key-content">L</Typography>
            </Box>
            <Box className="key white-key" data-key="186">
              <Typography className="key-content">;</Typography>
            </Box>
          </Box>

          <Box className="piano-black-keys">
            <Box className="key-group">
              <Box className="key black-key" data-key="87">
                <Typography className="key-content">W</Typography>
              </Box>
              <Box className="key black-key" data-key="69">
                <Typography className="key-content">E</Typography>
              </Box>
            </Box>
            <Box className="key-group">
              <Box className="key black-key" data-key="84">
                <Typography className="key-content">T</Typography>
              </Box>
              <Box className="key black-key" data-key="89">
                <Typography className="key-content">Y</Typography>
              </Box>
              <Box className="key black-key" data-key="85">
                <Typography className="key-content">U</Typography>
              </Box>
            </Box>
            <Box className="key-group">
              <Box className="key black-key" data-key="79">
                <Typography className="key-content">O</Typography>
              </Box>
              <Box className="key black-key" data-key="80">
                <Typography className="key-content">P</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <audio
          data-key="65"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/040.wav"
        ></audio>
        <audio
          data-key="87"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/041.wav"
        ></audio>
        <audio
          data-key="83"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/042.wav"
        ></audio>
        <audio
          data-key="69"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/043.wav"
        ></audio>
        <audio
          data-key="68"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/044.wav"
        ></audio>
        <audio
          data-key="70"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/045.wav"
        ></audio>
        <audio
          data-key="84"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/046.wav"
        ></audio>
        <audio
          data-key="71"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav"
        ></audio>
        <audio
          data-key="89"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/048.wav"
        ></audio>
        <audio
          data-key="72"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/049.wav"
        ></audio>
        <audio
          data-key="85"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/050.wav"
        ></audio>
        <audio
          data-key="74"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/051.wav"
        ></audio>
        <audio
          data-key="75"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/052.wav"
        ></audio>
        <audio
          data-key="79"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/053.wav"
        ></audio>
        <audio
          data-key="76"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/054.wav"
        ></audio>
        <audio
          data-key="80"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/055.wav"
        ></audio>
        <audio
          data-key="186"
          src="http://carolinegabriel.com/demo/js-keyboard/sounds/056.wav"
        ></audio>
      </PianoStyle>
    </>
  )
}

export default Play
