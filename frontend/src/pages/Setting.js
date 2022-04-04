import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/context'

const Setting = () => {
  const { state, actions } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.account) {
      navigate('/main')
    }
  })

  return <div>Setting</div>
}

export default Setting
