import React, { use } from 'react';
import NavMenu from './NavMenu';

import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import UserMenu from './UserMenu';

const Header = () => {
  const { user } = use(AuthContext);
  return (
    <div>
      <div className="p-4 bg-white shadow-md flex items-center justify-between relative">
        {/* Logo + Slogan */}
        <div>
          <h1 className="sofia-regular text-3xl md:text-5xl">Shikhun</h1>
          <p className="text-[12px] md:text-base">Learn Skills from Anywhere.</p>
        </div>

        {/* Nav Menu */}
        <NavMenu />

        {/* Authentication */}
        <UserMenu/>
       
      </div>
    </div>
  );
};

export default Header;
