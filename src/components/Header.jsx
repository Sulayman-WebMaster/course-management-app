import React from 'react'
import NavMenu from './NavMenu'

const Header = () => {
 
  return (
    <div>
      <div className='p-4 bg-white shadow-md flex  items-center justify-between'>
        <div>
          <h1 className='sofia-regular text-3xl md:text-5xl'>Shikhun</h1>
      <p className=' text-[12px] md:text-base'>Learn Skills from Anywhere.</p>
        </div>
        
        {/* <div>
          <div className='md:hidden flex items-center space-x-2'>
            <MdMenu className='text-4xl text-gray-700 cursor-pointer' />
          </div>
          <nav className=' hidden md:flex space-x-4'>
            <a href="/" className='text-gray-700 hover:text-blue-500'>Home</a>
            <a href="/courses" className='text-gray-700 hover:text-blue-500'>Courses</a>
            <a href="/about" className='text-gray-700 hover:text-blue-500'>About Us</a>
            <a href="/contact" className='text-gray-700 hover:text-blue-500'>Contact</a>
          </nav>
        </div> */}
        <NavMenu/> 

        <div className='hidden md:flex items-center space-x-4'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Login
          </button>
          <button className='ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300'>
            Register
          </button>
        </div>

      </div>
    </div>

  )
}

export default Header