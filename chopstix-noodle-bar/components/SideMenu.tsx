import React from 'react';
import { Screen } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen | string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  
  const handleNavigation = (screen: Screen | string) => {
    onNavigate(screen);
    onClose();
  }

  const menuItems = [
    { label: 'Home', screen: 'home' },
    { label: 'Online Order', screen: 'menu' },
    { label: 'Reviews', screen: 'Reviews' },
    { label: 'Contact Us', screen: 'Contact Us' },
  ];
  
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Side Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-red-600">Chopstix</h2>
        </div>
        <nav className="p-4">
          <ul>
            {menuItems.map(item => (
                 <li key={item.label} className="mb-1">
                    <button 
                        onClick={() => handleNavigation(item.screen)} 
                        className="w-full text-left p-3 rounded text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                        {item.label}
                    </button>
                 </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
