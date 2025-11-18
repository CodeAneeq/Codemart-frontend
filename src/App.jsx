import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { publicRoutes, privateRoutes, adminRoutes } from './routes/router'
import { useSelector } from 'react-redux'



function App() {
  const isLogin = useSelector(state=> state.user.isLogin);
  const user = useSelector(state => state.user.data);
  
  let route;
  if (isLogin && user?.role == 'admin') {
    route = adminRoutes
  } else if (isLogin) {
    route = privateRoutes
  } else {
    route = publicRoutes
  }
  
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
