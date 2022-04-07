import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from 'contexts/context'
import MelodyBackground from 'components/MelodyBackground'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import PianoCat from 'assets/piano-cat.png'
import GachaLoadingContainer from 'components/GachaLoadingContainer'
import ItemDetailCard from 'components/ItemDetailCard'
import GachaNoContentContainer from 'components/GachaNoContentContainer'
import Typography from '@mui/material/Typography'
import { api } from 'api'

import Web3 from 'web3'
import ABI from 'common/ABI'

import MoludyImg from 'assets/molrudy.png'
import MoludyAudio from 'assets/molrudy.wav'
const Gacha = () => {
  const { state, actions } = useContext(AppContext)

  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFin, setIsFin] = useState(false)
  const [item, setItem] = useState({
    address: '김남욱',
    price: '0.01',
    tokenTitle: 'Molrudy #1',
    date: '22.01.01',
    tokenURI: MoludyImg,
    audio: MoludyAudio,
  })

  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      process.env.REACT_APP_ETHEREUM_RPC_URL,
    ),
  )

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 3000)
    }
  }, [isLoading])

  const handleGacha = async () => {
    setIsClicked(true)
    setIsLoading(true)
    // TODO: 멜로디 발급 로직 적용
    const gachaDto = {
      adminAddress: process.env.REACT_APP_ADMIN_ADDRESS,
      userAddress: state.account,
    }
    console.log(gachaDto)
    const res = await api.put('/nft/random', gachaDto)
    console.log(res)

    //for dev
    // const ssafyTokenContract = new web3.eth.Contract(
    //   ABI.CONTRACT_ABI.ERC_ABI,
    //   process.env.REACT_APP_ERC20_CA,
    // )

    // const ACCOUNT1 = '0xE86ABC582C6058EB07334A584BAfE3ee16E0C879'
    // const ACCOUNT2 = '0x540da0D33900AF67ab40CaBB40A011c73eb98a45'
    // const ACCOUNT3 = '0x164E833c22B400d3aD5F895d84873D78b05C5715'

    // await ssafyTokenContract.methods
    //   .mint(1000)
    //   .send({ from: ACCOUNT1, gas: 3000000 })
    // await ssafyTokenContract.methods
    //   .forceToTransfer(ACCOUNT1, ACCOUNT2, 250)
    //   .send({ from: ACCOUNT1, gas: 3000000 })
    // await ssafyTokenContract.methods
    //   .forceToTransfer(ACCOUNT1, ACCOUNT3, 250)
    //   .send({ from: ACCOUNT1, gas: 3000000 })

    // await ssafyTokenContract.methods
    //   .balanceOf(ACCOUNT1)
    //   .call({ from: ACCOUNT1 })
    //   .then((result) => console.log('ACCOUNT1 balance : ', result))
    //   .catch((err) => console.log('balanceOf 1 err', err))
    // await ssafyTokenContract.methods
    //   .balanceOf(ACCOUNT2)
    //   .call({ from: ACCOUNT2 })
    //   .then((result) => console.log('ACCOUNT2 balance : ', result))
    //   .catch((err) => console.log('balanceOf 2 err', err))
    // await ssafyTokenContract.methods
    //   .balanceOf(ACCOUNT3)
    //   .call({ from: ACCOUNT3 })
    //   .then((result) => console.log('ACCOUNT3 balance : ', result))
    //   .catch((err) => console.log('balanceOf 3 err', err))

    if (res.status === 204) {
      console.error('NO MELODY')
      setIsFin(true)
      return
    }

    const nftDto = res.data
    console.log(nftDto)

    const ssafyNftContract = new web3.eth.Contract(
      ABI.CONTRACT_ABI.NFT_ABI,
      process.env.REACT_APP_NFT_CA,
    )

    await ssafyNftContract.methods
      .tokenURI(nftDto.tokenId)
      .call()
      .then((result) => {
        nftDto.tokenURI = result
      })

    setItem(nftDto)

    // * 1. Sale 컨트랙트가 구매자의 SSAFY 토큰을 상대방에게 전송할 수 있는 권한을 부여합니다.
    const resp = await api.get(`/sale?tokenId=${nftDto.tokenId}`)

    const sale = resp.data
    const saleContract = new web3.eth.Contract(
      ABI.CONTRACT_ABI.SALE_ABI,
      sale.saleContractAddress,
    )
    const ssafyTokenContract = new web3.eth.Contract(
      ABI.CONTRACT_ABI.ERC_ABI,
      process.env.REACT_APP_ERC20_CA,
    )
    await ssafyTokenContract.methods
      .approve(saleContract._address, 100)
      .send({ from: state.account, gas: 3000000 })
      .then((result) =>
        console.log('ssafyTokenContract approve result', result),
      )
      .catch((err) => console.log('ssafyTokenContract approve error', err))

    // * 2. 정상 호출 후, Sale 컨트랙트의 purchase() 함수를 호출합니다.
    await saleContract.methods
      .purchase()
      .send({ from: state.account, gas: 3000000 })
      .then((result) => console.log('saleContract purchase result', result))
      .catch((err) => console.log('saleContract purchase error', err))

    // * 3. 정상 호출 후 buyer 정보를 백엔드에 업데이트합니다.
    await saleContract
      .getPastEvents('SaleEnded', { fromBlock: 'latest' })
      .then(async (events) => {
        console.log('event SaleEnded', events)
        const evt = events[0]
        const buyer = evt.returnValues.winner
        await api
          .put(`/sale/${nftDto.tokenId}/purchase?buyerAddress=${buyer}`)
          .then((result) => {
            console.log('buyer patch result', result)
          })
          .catch((err) => console.log('buyer patch error', err))
      })
  }

  const handleGachaAgain = () => {
    setIsClicked(false)
    setIsLoading(true)
  }

  return (
    <>
      <MelodyBackground />
      {!isClicked ? (
        <Container
          maxWidth="sm"
          sx={{
            mt: 14,
            mb: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="img" src={PianoCat} sx={{ width: '50%' }}></Box>
          <Button
            variant="contained"
            sx={{ m: 5, width: '50%' }}
            onClick={handleGacha}
          >
            <Typography
              sx={{
                fontSize: '28px',
                fontWeight: 'bold',
                textTransform: 'none',
                '@media(max-width: 600px)': {
                  fontSize: '24px',
                },
                '@media(max-width: 480px)': {
                  fontSize: '20px',
                },
              }}
            >
              Gacha
            </Typography>
          </Button>
        </Container>
      ) : isLoading ? (
        <GachaLoadingContainer />
      ) : isFin ? (
        <GachaNoContentContainer />
      ) : (
        <Container
          sx={{
            mt: 14,
            mb: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 'min(480px, 100% - 36px)',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <ItemDetailCard isHeader={false} item={item} />
          </Box>
          <Box
            sx={{
              width: '100%',
              marginTop: '40px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="contained"
              onClick={handleGachaAgain}
              sx={{ width: '45%' }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '@media(max-width: 360px)': {
                    fontSize: '16px',
                  },
                }}
              >
                더 뽑기
              </Typography>
            </Button>
            <Button
              component={Link}
              to={`/items/${item.tokenCA}/${item.tokenId}`}
              variant="outlined"
              sx={{ width: '45%' }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '@media(max-width: 360px)': {
                    fontSize: '16px',
                  },
                }}
              >
                상세정보
              </Typography>
            </Button>
          </Box>
        </Container>
      )}
    </>
  )
}

export default Gacha
