import React from 'react'
import { Outlet } from 'react-router-dom'

const LogoOnlyLayout = () => {
  return (
    <div>
      LogoOnlyLayout
      <Outlet />
    </div>
  )
}

export default LogoOnlyLayout
