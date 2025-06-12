import React  from 'react';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <div>
  <div className="p-4 bg-white shadow-md flex items-center justify-between relative">
   
    <div>
      <h1 className="sofia-regular text-3xl md:text-5xl">Shikhun</h1>
      <p className="text-[12px] md:text-base">Learn Skills from Anywhere.</p>
    </div>

    
    <div className="ml-auto flex items-center space-x-4">
      <div className="md:hidden">
        <NavMenu />
      </div>


      <div className="hidden md:flex items-center space-x-4">
        <NavMenu />
        <UserMenu />
      </div>
    </div>
  </div>
</div>

  );
};

export default Header;
