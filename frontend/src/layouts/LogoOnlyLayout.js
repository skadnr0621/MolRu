import React from 'react'
import { Outlet } from 'react-router-dom'

const LogoOnlyLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default LogoOnlyLayout
