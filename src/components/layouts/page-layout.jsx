import React from 'react'
import TopBar from '../../components/headers/top-bar.jsx'
import Navbar from '../../components/headers/navbar.jsx';
import Footer from '../../components/footer/footer.jsx'

const PageLayout = ({children}) => {
  return (
    <>
    <TopBar></TopBar>
    <Navbar></Navbar>
    {children}
    <Footer></Footer>
    </>
  )
}

export default PageLayout