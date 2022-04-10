import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/context'
import AccountInfo from 'components/AccountInfo'

const Account = () => {
  const { state, actions } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.account) {
      navigate('/main')
    }
  })

  return (
    <>
      <AccountInfo />
    </>
  )
}

export default Account
