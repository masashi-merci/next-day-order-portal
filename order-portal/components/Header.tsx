
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 max-w-4xl flex justify-center items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={onLogoClick}
        >
          <div className="bg-[#1A1A1A] w-9 h-9 rounded-md flex items-center justify-center text-orange-500 shadow-sm transition-transform group-hover:scale-105">
            <i className="fas fa-bolt text-lg"></i>
          </div>
          <span className="text-lg font-bold tracking-tighter text-[#1A1A1A]">
            NEXT-DAY <span className="text-orange-500">ORDER</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
