import React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

import MusicNoteTwoToneIcon from '@mui/icons-material/MusicNoteTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';

const Description = () => {
    const DescContainer = styled('div')({
        height: '766px',
        wordBreak: 'break-all',
        padding: '59px 0px 101px 0px',
      })

    const styles = {
        innerBackground: {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#FCFCFC',
        },

        innerContent: {
            height: '100%',
            textAlign: 'center',
            width: 'min(1280px, 100% - 40px)',
        },

        detailDesc: {
            fontSize: '18px',
            color: '#04111D',
        },

        test: {
            height: '100%',
            margin: '67px 0px 203px 0px',
        }
    }
    return (
        <DescContainer>
            <div style={styles.innerBackground}>
                <div style={styles.innerContent}>
                    <Typography
                        sx={{
                            margin: '73px 0px 67px 0px',
                            fontSize: '36px',
                            fontWeight: 'bold',
                            color: '04111D',
                        }}
                    >
                        NFT 생성 및 판매
                    </Typography>
                    
                    <Grid container spacing={2}>
                        <Grid item xs={4} style={styles.test}>
                            <AccountBalanceWalletTwoToneIcon fontSize="large" style={{marginBottom: '17px'}}/>
                            <Typography style={styles.detailDesc} sx={{fontWeight: 'bold'}}>
                                지갑설정    
                            </Typography>

                            <Typography style={styles.detailDesc} sx={{marginTop: '15px'}}>
                                지갑을 생성한 후, <br />
                                오른쪽 상단 모서리에 있는 지갑 아이콘을  <br />
                                클릭하여 MOLRU에 연결하세요.
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={4} style={styles.test}>
                            <MusicNoteTwoToneIcon fontSize="large" style={{marginBottom: '17px'}}/>
                            <Typography style={styles.detailDesc} sx={{fontWeight: 'bold'}}>
                                NFT 생성    
                            </Typography>

                            <Typography style={styles.detailDesc} sx={{marginTop: '15px'}}>
                                Create를 클릭하여 <br />
                                멜로디 NFT 뽑기를 합니다.<br />
                                이 때, 멜로디는 무작위로 생성됩니다.
                            </Typography>
                        </Grid>

                        <Grid item xs={4} style={styles.test}>
                            <StorefrontTwoToneIcon fontSize="large" style={{marginBottom: '17px'}}/>
                            <Typography style={styles.detailDesc} sx={{fontWeight: 'bold'}}>
                                NFT 판매    
                            </Typography>

                            <Typography style={styles.detailDesc} sx={{marginTop: '21px'}}>
                                마이 페이지 > NFT목록 > 내 NFT에서 <br />
                                원하는 NFT를 판매할 수 있습니다. 
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </DescContainer>
    )
}

export default Description
