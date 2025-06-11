import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from '../Provider/AuthProvider';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user,handleLogout} = useContext(AuthContext);

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
            <Link to="/my-courses" className="text-gray-700 hover:text-[#FE7743] transition">My Courses</Link>
            <Link to="/my-enrollments" className="text-gray-700 hover:text-[#FE7743] transition">My Enrollments</Link>
           
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
           <DropdownMenu >
                                  <DropdownMenuTrigger asChild>
                                      <Avatar className="cursor-pointer w-12 h-12">
                                          <AvatarImage
                                              src={user?.photoURL || "https://i.postimg.cc/WpB7mWdy/60111.jpg"}
                                              alt={user?.displayName || "User"}
                                          />
                                          <AvatarFallback>{user?.displayName ? user.displayName[0] : "N"}</AvatarFallback>
                                      </Avatar>
                                  </DropdownMenuTrigger>
          
                                  <DropdownMenuContent className="w-56 mt-2 mr-28">
                                      <DropdownMenuLabel>Account</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <div className="px-4 py-2 text-sm">
                                          <p className="font-medium">{user?.displayName || "Your Name"}</p>
                                          <p className="text-gray-500">{user?.email}</p>
                                      </div>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                          onClick={handleLogout}
                                          className="text-[#FE7743] cursor-pointer"
                                      >
                                          Logout
                                      </DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
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