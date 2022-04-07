import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/main'
import LogoOnlyLayout from './layouts/LogoOnlyLayout'
import Main from './pages/Main'
import Account from './pages/Account'
import Setting from './pages/Setting'
import Items from './pages/Items'
import ItemDetail from './pages/ItemDetail'
import Gacha from './pages/Gacha'
import Admin from './pages/Admin'
import Play from './pages/Play'
import NotFound from './pages/Page404'

export default function Router() {
  return useRoutes([
    // 메인 페이지
    {
      path: '/main',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/main" replace /> },
        { path: '', element: <Main /> },
      ],
    },
    // 에러 페이지
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/main" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // 마이 페이지
    {
      path: '/account',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/account" replace /> },
        { path: '', element: <Account /> },
        { path: 'setting', element: <Setting /> },
      ],
    },
    // NFT 조회 페이지
    {
      path: '/items',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/items" replace /> },
        { path: '', element: <Items /> },
        { path: ':tokenId', element: <ItemDetail /> }, // NFT 상세 조회 페이지
      ],
    },
    // 멜로디 발급 페이지
    {
      path: '/gacha',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/gacha" replace /> },
        { path: '', element: <Gacha /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    // 관리자 페이지
    {
      path: '/admin',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/admin" replace /> },
        { path: '', element: <Admin /> },
      ],
    },
    // 멜로디 놀이터 페이지
    {
      path: '/play',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/play" replace /> },
        { path: '', element: <Play /> },
      ],
    },
  ])
}
