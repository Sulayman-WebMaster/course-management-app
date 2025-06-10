import React from 'react'
import { Outlet } from 'react-router';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
   <div className='mx-auto max-w-7xl roboto-regular'>
      <ToastContainer />
     <Header/>
     <Outlet/>
     <Footer/>
    </div>
  )
}

export default App