import React from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const Ranking = () => {
    const RankingContainer = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        height: '766px',
        wordBreak: 'break-all',
    })

    return (
        <RankingContainer>
            <div style={{
                width: 'min(1280px, 100% - 40px)',
            }}>
                <Typography
                    sx={{
                        marginTop: '350px',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '04111D',
                    }}
                >
                    랭킹 페이지 준비중입니다.
                </Typography>
            </div>
        </RankingContainer>
    )
}

export default Ranking
