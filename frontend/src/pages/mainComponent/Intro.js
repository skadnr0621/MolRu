import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import molrudy from '../../assets/molrudy.png'

const Intro = () => {
    const MainPageStyle = styled('div')({
        height: '766px',
        wordBreak: 'break-all',
        backgroundImage: `url(${molrudy})`,
        backgroundSize: '100% 766px',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
      })
    
      const styles = {
        introduce: {
          fontWeight: 'bold',
        },
    
        buttonBlack: {
          width: '210px',
          height: '64px',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: 'black',
        },
    
        buttonWhite: {
          marginLeft: '25px',
          width: '210px',
          height: '64px',
          fontSize: '20px',
          fontWeight: 'bold',
          textColor: 'black',
          backgroundColor: 'white',
    
        }
      }

    return (
        <MainPageStyle>
            <Box component="div" style={{
                backgroundColor:'yellow',
                width: 'min(1280px, 100% - 40px)',
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}/>
                    <Grid item xs={7}>
                        <div>
                            <Typography
                                sx={{
                                margin: '176px 0px 86px 0px',
                                fontSize: '40px',
                                fontWeight: 'bold',
                                color: '04111D',
                                }}
                            >멜로디 NFT를 수집하고 판매해보세요</Typography>
                            <Typography
                                sx={{
                                margin: '0px 0px 80px 0px',
                                fontSize: '20px',
                                }}          
                            >MOLRU는 세계 최초의 멜로디 NFT 마켓 플레이스입니다.</Typography>
                            <div>
                                <Button style={styles.buttonBlack}>Explore</Button>
                                <Button style={styles.buttonWhite}>Gacha</Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={require('../../assets/molruNFT.png')} style={{
                            marginTop: '80px',
                            width: '360px',
                            height: '400px',
                        }}></img>
                    </Grid>
                </Grid>
            </Box>
        </MainPageStyle>
    )
}

export default Intro
