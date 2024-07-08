import React from 'react'
import { Router, RouterProvider } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes/router'
import { useSelector } from 'react-redux'



function App() {
  const isLogin = useSelector(state=> state.user.isLogin);
  return (
    <>
      <RouterProvider router={isLogin ? privateRoutes : publicRoutes}></RouterProvider>
    </>
  )
}

export default App
