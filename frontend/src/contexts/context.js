import React, { createContext, useState, useCallback, useEffect } from 'react'
import { api } from 'api'
import Web3 from 'web3'
import ABI from 'common/ABI'
import defaultImg from 'assets/piano-cat.png'

export const AppContext = createContext({
  state: {
    account: '',
    balance: '',
    ssfBalance: '',
    nickname: '',
    imageUrl: '',
  },
  actions: {
    handleConnect: () => {},
    getBalance: () => {},
    getSsfBalance: () => {},
  },
})

export const AppProvider = ({ children }) => {
  // 상태 정의
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [ssfBalance, setSsfBalance] = useState('')
  const [nickname, setNickName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [ssfCA, setSsfCA] = useState(
    '0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333',
  )

  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      process.env.REACT_APP_ETHEREUM_RPC_URL,
    ),
  )

  // 함수 정의
  // 지갑 연동하기
  const handleConnect = async () => {
    if (account) {
      setAccount('')
    } else {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })

          setAccount(() => accounts[0])
          await getUserInfo(accounts[0])
        } else {
          alert('Install Metamask!')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const getUserInfo = async (account) => {
    try {
      const res = await api.get(`/user/${account}`)

      if (res.status === 204) {
        createUserInfo(account)
      } else if (res.status === 200) {
        const imageUrl = res.data.imageUrl
        const nickname = res.data.nickname
        setNickName(nickname === '' ? '몰?루' : nickname)
        setImageUrl(imageUrl === '' ? defaultImg : imageUrl)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const createUserInfo = async (account) => {
    try {
      const data = {
        address: account,
        imageUrl: '',
        nickname: '',
      }
      const res = await api.post('/user', data)
      const imageUrl = res.data.imageUrl
      const nickname = res.data.nickname
      setNickName(nickname === '' ? '몰?루' : nickname)
      setImageUrl(imageUrl === '' ? defaultImg : imageUrl)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    handleConnect()
  }, [])

  useEffect(() => {
    if (account) {
      // getBalance()
      getSsfbalance()
    }
  }, [account])

  // 현재 자산 가져오기
  const getBalance = async () => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      })

      setBalance(balance)
    } catch (e) {
      console.log(e)
    }
  }

  // 현재 SSF 가져오기
  const getSsfbalance = async () => {
    try {
      const ssafyToken = new web3.eth.Contract(
        ABI.CONTRACT_ABI.ERC_ABI,
        process.env.REACT_APP_ERC20_CA,
      )

      console.log(ssafyToken)

      await ssafyToken.methods
        .balanceOf(account)
        .call()
        .then((result) => {
          console.log(result)
          setSsfBalance(result)
        })
        .catch((err) => console.log('ssafyToken balanceOf error', err))
    } catch (e) {
      console.log(e)
    }
  }

  // 상태와 함수를 묶어 value 객체 생성
  const value = {
    state: { account, balance, ssfBalance, nickname, imageUrl },
    actions: { handleConnect },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// const AppConsumer = AppContext.Consumer

// export { AppProvider, AppConsumer }
// export default AppContext
