import React from 'react'
import { useState, useRef } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import moment from 'moment'
import { api } from 'api'

import Web3 from 'web3'
import ABI from '../common/ABI'
import { ConstructionOutlined } from '@mui/icons-material'

const Admin = () => {
  const styles = {
    boxContainer: {
      width: '650px',
      borderRadius: '10px',
      border: '1px solid black',
      margin: '20px',
      padding: '20px 0px 20px 20px',
    },

    inputField: {
      margin: '20px 0px 0px 20px',
    },

    buttonStyle: {
      margin: '10px 0px 0px 20px',
    },

    errorMsg: {
      color: 'red',
      fontSize: '20px',
    },
  }

  const Input = styled('input')({
    display: 'none',
  })

  const [svgItem, setSvgItem] = useState('')
  const [wavItem, setWavItem] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [category, setCategory] = useState('')

  const [svgItemName, setSvgItemName] = useState('')
  const [wavItemName, setWavItemName] = useState('')

  const [titleError, setTitleError] = useState(true)
  const [privateKeyError, setPrivateKeyError] = useState(true)
  const [categoryError, setCategoryError] = useState(true)
  const [svgError, setSvgError] = useState(true)
  const [wavError, setWavError] = useState(true)

  const svg = useRef()
  const wav = useRef()

  const handleSvgClick = () => {
    svg.current.click()
  }
  const handleWavClick = () => {
    wav.current.click()
  }

  // 아이템 업로드 핸들링

  const handleTitle = (event) => {
    setTitle(event.target.value)

    if (event.target.value != '') {
      setTitleError(false)
    } else {
      setTitleError(true)
    }
  }

  const handleDescription = (event) => {
    setDescription(event.target.value)
  }

  const handlePrivKey = (event) => {
    setPrivateKey(event.target.value)

    if (event.target.value != '') {
      setPrivateKeyError(false)
    } else {
      setPrivateKeyError(true)
    }
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    setCategoryError(false)
  }

  const handleSvgItem = (value) => {
    setSvgItem(value)

    if (value !== '') {
      setSvgItemName(value.name)
      setSvgError(false)
    } else {
      setSvgItemName('')
      setSvgError(true)
    }
  }

  const handleWavItem = (value) => {
    setWavItem(value)

    if (value !== '') {
      setWavItemName(value.name)
      setWavError(false)
    } else {
      setWavItemName('')
      setWavError(true)
    }
  }

  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      process.env.REACT_APP_ETHEREUM_RPC_URL,
    ),
  )

  const addItem = async () => {
    if (
      titleError ||
      privateKeyError ||
      categoryError ||
      svgError ||
      wavError
    ) {
      alert('Check miss input!!!')
    } else {
      // TODO : MINTING 기능 추가
      alert('Ready to mint!!!')

      try {
        const sender = web3.eth.accounts.privateKeyToAccount(
          privateKey.startsWith('0x') ? privateKey : '0x' + privateKey,
        )
        console.log('sender : ', sender)
        web3.eth.accounts.wallet.add(sender)
        web3.eth.defaultAccount = sender.address
        const senderAddress = sender.address

        const formData = new FormData()
        formData.append('image', svgItem)
        formData.append('audio', wavItem)
        formData.append('tokenCA', process.env.REACT_APP_NFT_CA)
        formData.append('tokenTitle', title)
        formData.append('tokenDescription', description)
        formData.append('ownerAddress', senderAddress)
        formData.append('category', category)

        // register token in DB
        var resp = await api
          .post('/nft', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .catch((err) => console.log('Error while POST /nft', err))
        console.log(resp)

        const nft = resp.data

        // token creation transaction
        const ssafyNftContract = new web3.eth.Contract(
          ABI.CONTRACT_ABI.NFT_ABI,
          process.env.REACT_APP_NFT_CA,
        )

        await ssafyNftContract.methods
          .create(senderAddress, process.env.REACT_APP_API_URL + nft.imagePath)
          .send({ from: senderAddress, gas: 3000000 })
          .then((result) => console.log('create result', result))
          .catch((err) =>
            console.error('Error while ssafyNftContract create', err),
          )

        const res = await ssafyNftContract
          .getPastEvents('Transfer', { fromBlock: 'latest' })
          .then(async (result) => {
            console.log('event Transfer result', result)
            const returnValues = result[result.length - 1].returnValues
            const tokenId = returnValues.tokenId
            await api
              .put(`/nft/${nft.nftId}?tokenId=${tokenId}`)
              .catch((err) =>
                console.error('Error while PATCH /nft/:nftId', err),
              )
            return result
          })
          .catch((err) =>
            console.error(
              'Error while ssafyNftContract getPastEvents Transfer',
              err,
            ),
          )

        const ti = res[0].returnValues.tokenId

        const saleFactory = new web3.eth.Contract(
          ABI.CONTRACT_ABI.SALE_FACTORY_ABI,
          process.env.REACT_APP_SALE_FACTORY_CA,
        )

        const currencyAddress = process.env.REACT_APP_ERC20_CA
        const nftAddress = process.env.REACT_APP_NFT_CA

        await saleFactory.methods
          .createSale(
            ti, // uint256 itemId,
            1, // uint256 minPrice,
            100, // uint256 purchasePrice,
            parseInt((moment() / 1000).toFixed(0)), // uint256 startTime,
            2147483646, // uint256 endTime,
            currencyAddress, // address currencyAddress,
            nftAddress, // address nftAddress
          )
          .send({ from: senderAddress, gas: 3000000 })
          .then((result) => console.log('createSale result', result))
          .catch((err) => console.log('createSale error', err))

        await saleFactory
          .getPastEvents('NewSale', { fromBlock: 'latest' })
          .then(async (result) => {
            console.log('event NewSale', result)
            const pubKey = result[0].returnValues._owner
            const saleCA = result[0].returnValues._saleContract
            console.log('saleCA :', saleCA)
            // console.log("NewSale result ", pubKey, saleCA);

            // 4. Sale 컨트랙트가 판매자를 대신하여 NFT를 전송할 수 있도록 Sale 컨트랙트에 NFT 전송
            // const sale = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.SALE_ABI, saleCA);
            const ssafyNft = new web3.eth.Contract(
              ABI.CONTRACT_ABI.NFT_ABI,
              nftAddress,
            )
            // await ssafyNft.methods
            //   .ownerOf(tokenId)
            //   .call()
            //   .then((result) => console.log("Before transfer : ", result));

            // await ssafyNft.methods.transferFrom(senderAddress, saleCA, tokenId).send({ from: senderAddress, gas: 3000000 });
            await ssafyNft.methods
              .approve(saleCA, ti)
              .send({ from: senderAddress, gas: 3000000 })
              .catch((err) => console.log('NFT approve error', err))

            // await ssafyNft.methods
            //   .ownerOf(tokenId)
            //   .call()
            //   .then((result) => console.log("After transfer : ", result));

            const reqBody = {
              tokenId: ti,
              sellerAddress: pubKey,
              saleContractAddress: saleCA,
              cashContractAddress: process.env.REACT_APP_ERC20_CA,
              completedAt: new Date('2038-01-18 23:50:59.624319'),
            }

            await api
              .post(`/sale`, reqBody)
              .then((result) => {
                console.log(result)
              })
              .catch((err) => console.log('registerSaleInfo error', err))
          })
      } catch (err) {
        console.error('Error at Admin > addItem', err)
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Box>
      <h1 style={styles.inputField}>관리자 민팅 페이지</h1>
      <Box style={styles.boxContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <div style={styles.inputField}>
              <TextField
                label="token title"
                id="outlined-size-small"
                size="small"
                onChange={handleTitle}
              />
              {titleError && <div style={styles.errorMsg}>no title input</div>}
            </div>

            <div style={styles.inputField}>
              <TextField
                label="token description"
                id="outlined-size-small"
                size="small"
                onChange={handleDescription}
              />
            </div>

            <div style={styles.inputField}>
              <TextField
                label="private key"
                id="outlined-size-small"
                size="small"
                onChange={handlePrivKey}
              />
              {privateKeyError && (
                <div style={styles.errorMsg}>no privateKey input</div>
              )}
            </div>

            <div style={styles.inputField}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={category}
                label="category"
                onChange={handleCategoryChange}
              >
                <MenuItem value={'ANGRY'}>화남</MenuItem>
                <MenuItem value={'BRIGHT'}>밝음</MenuItem>
                <MenuItem value={'QUITE'}>차분</MenuItem>
                <MenuItem value={'DARK'}>어두움</MenuItem>
                <MenuItem value={'EXTREME'}>극적</MenuItem>
                <MenuItem value={'FUNKY'}>펑키</MenuItem>
                <MenuItem value={'HAPPY'}>행복</MenuItem>
                <MenuItem value={'ROMANCE'}>낭만적</MenuItem>
                <MenuItem value={'SAD'}>슬픔</MenuItem>
              </Select>
              {categoryError && (
                <div style={styles.errorMsg}>no category input</div>
              )}
            </div>

            <div style={styles.inputField}>
              <TextField
                sx={{ width: '400px' }}
                type="text"
                label="이미지 (업로드 확장자 형식: svg)"
                value={svgItemName}
                disabled
              />
              <Input
                type="file"
                accept="image/svg+xml"
                ref={svg}
                onChange={(e) =>
                  e.target.files.length !== 0
                    ? handleSvgItem(e.target.files[0])
                    : handleSvgItem('')
                }
              />
              <Button
                style={styles.buttonStyle}
                variant="contained"
                component="span"
                onClick={handleSvgClick}
              >
                SVG upload
              </Button>
              {svgError && <div style={styles.errorMsg}>no svg input</div>}
            </div>

            <div style={styles.inputField}>
              <TextField
                sx={{ width: '400px' }}
                type="text"
                label="사운드 파일 (업로드 확장자 형식: wav)"
                value={wavItemName}
                disabled
              />
              <Input
                type="file"
                accept="audio/wav"
                ref={wav}
                onChange={(e) =>
                  e.target.files.length !== 0
                    ? handleWavItem(e.target.files[0])
                    : handleWavItem('')
                }
              />
              <Button
                style={styles.buttonStyle}
                variant="contained"
                component="span"
                onClick={handleWavClick}
              >
                wav upload
              </Button>
              {wavError && <div style={styles.errorMsg}>no wav input</div>}
            </div>
          </div>
          <div style={styles.inputField}>
            <Button
              sx={{ mt: 5, width: '550px', fontSize: 18 }}
              size="large"
              type="submit"
              variant="contained"
              onClick={addItem}
            >
              등록
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  )
}

export default Admin
