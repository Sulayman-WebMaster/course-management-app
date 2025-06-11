import React, { useState } from 'react';
import { Link } from 'react-router';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white ">
      <div >
        <div className="flex justify-between h-16 relative ">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#FE7743] transition">Home</Link>
            <Link to="/add-course" className="text-gray-700 hover:text-[#FE7743] transition">Add Course</Link>
            <a href="#" className="text-gray-700 hover:text-[#FE7743] transition">Services</a>
            <a href="#" className="text-gray-700 hover:text-[#FE7743] transition">Contact</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* Animated Hamburger Icon */}
              <div className="w-6 h-6 relative">
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-3'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} border-t absolute top-16 right-4 w-1/4 z-30 shadow-lg bg-white  `}>
        <div className="px-2 py-3 space-y-2">
          <a href="#" className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100">Home</a>
          <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">About</a>
          <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Services</a>
          <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Contact</a>
        
        </div>
      </div>
    </nav>
  ); 
};

export default NavMenu;