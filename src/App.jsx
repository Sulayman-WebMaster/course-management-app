import React from 'react'
import { Outlet } from 'react-router';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import CustomCursor from './components/CustomCursor.jsx';

const App = () => {
  return (

    <>
      <ToastContainer />
      <CustomCursor/>

       <div className='w-full shadow-md bg-gradient-to-br from-white to-blue-50   sticky top-0  z-50'>
        <Header />        
      </div>

      <div className='mx-auto max-w-7xl montserrat-base bg-white min-h-screen'>
        <Outlet />
      </div>
      <div className='w-full shadow-md'>
        <Footer />
      </div>



    </>

  )
}

export default App