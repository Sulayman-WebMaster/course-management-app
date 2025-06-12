import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Button from './Button';
import UserMenu from './UserMenu';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div >
        <div className="flex  justify-between h-16 relative ">
         
          <div className="hidden md:flex md:text-[14px] lg:text-base items-center space-x-8">
            <Link to="/" className="text-gray-700   hover:text-[#FE7743] transition">Home</Link>
            <Link to="/add-course" className="text-gray-700 hover:text-[#FE7743] transition">create Course</Link>
            <Link to="/my-enrollments" className="text-gray-700 hover:text-[#FE7743] transition">Enrollments</Link>
            <Link to="/my-courses" className="text-gray-700 hover:text-[#FE7743] transition">Courses</Link>
            <Link to="/show-all" className="text-gray-700 hover:text-[#FE7743] transition">Browse Courses</Link>
          </div>
          <div className="flex items-center md:hidden ">
            <button
              onClick={toggleMenu}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
           
              <div className="w-6 h-6 relative">
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-3'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
              </div>
            </button>
             
          </div>
        </div>
      </div>

    
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} border-t absolute top-16 right-6 w-1/2 z-30 shadow-lg bg-white rounded-md  `}>
        <div className="px-2 py-3 space-y-2">
          {user? (<UserMenu display={" block md:hidden"}/>) : (
            <div className="relative z-10">
                    <div className="relative  md:flex flex-col  lg:flex-row  items-center space-x-4  ">
                        <Link to="/login">
                            <Button onClick={toggleMenu}>Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button onClick={toggleMenu} >Register</Button>
                        </Link>
                    </div>
                </div>
          )}
         <div className='flex flex-col space-y-2 mt-4'>
          <Link to="/" className="text-gray-700 hover:text-[#FE7743] transition">Home</Link>
            <Link to="/add-course" className="text-gray-700 hover:text-[#FE7743] transition">create Course</Link>
            <Link to="/my-enrollments" className="text-gray-700 hover:text-[#FE7743] transition">Enrollments</Link>
            <Link to="/my-courses" className="text-gray-700 hover:text-[#FE7743] transition">Courses</Link>
            <Link to="/show-all" className="text-gray-700 hover:text-[#FE7743] transition">Browse Courses</Link>
         </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;