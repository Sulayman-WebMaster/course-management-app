import React from 'react';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white bg-gradient-to-br from-white to-blue-50 shadow w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 relative flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-left">
          <h1 className="sofia-regular text-3xl md:text-5xl">Shikhun</h1>
          <p className="text-[12px] md:text-base">Learn Skills from Anywhere.</p>
        </div>

        {/* Center: NavMenu (desktop only) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <NavMenu />
        </div>

        {/* Right: Hamburger (mobile) + UserMenu (desktop) */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger */}
          <div className="block md:hidden">
            <NavMenu />
          </div>

          {/* User menu only on desktop */}
          <div className="hidden md:flex">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
