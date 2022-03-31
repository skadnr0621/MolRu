import React from 'react'
import { styled } from '@mui/material/styles'

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
                backgroundColor: 'pink',
                width: 'min(1280px, 100% - 40px)',
            }}>
                랭킹 페이지입니다.
            </div>
        </RankingContainer>
    )
}

export default Ranking
