import React, { useState } from 'react';
import { HamburgerIcon } from './icons/HamburgerIcon';
import { SearchIcon } from './icons/SearchIcon';
import { UserIcon } from './icons/UserIcon';
import { Screen } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  onNavigate: (screen: Screen | string) => void;
  isLoggedIn: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onNavigate, isLoggedIn, searchQuery, setSearchQuery, isSearchVisible }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
        setSearchQuery('');
    }
  }

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm shadow-sm z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={onMenuClick} className="text-gray-600 hover:text-red-600">
              <HamburgerIcon className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
          
          <div onClick={() => onNavigate('home')} className="cursor-pointer absolute left-1/2 -translate-x-1/2">
             <img src="https://drive.google.com/uc?export=view&id=15qfqz9QmkalRbHFAUFsGuP3D-tHNriyJ" alt="Chopstix Logo" className="h-10 object-contain"/>
          </div>

          <div className="flex items-center space-x-4">
            {isSearchVisible && (
              <button onClick={toggleSearch} className="text-gray-600 hover:text-red-600">
                <SearchIcon className="h-6 w-6" />
                <span className="sr-only">Search</span>
              </button>
            )}
            <button onClick={() => onNavigate('login')} className="text-gray-600 hover:text-red-600">
              <UserIcon className="h-6 w-6" />
              <span className="sr-only">{isLoggedIn ? 'My Account' : 'Login'}</span>
            </button>
          </div>
        </div>
      </div>
       {/* Search Bar */}
       <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSearchOpen && isSearchVisible ? 'max-h-20' : 'max-h-0'}`}>
            <div className="container mx-auto px-4 pb-3">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search in store..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;