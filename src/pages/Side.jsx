import React, { useState, useEffect } from 'react';
import { LayoutDashboard, User, Briefcase, Menu, X ,LogOut} from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange, isOpen, setIsOpen ,handleLogout}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [setIsOpen]);

  const handleNavigation = (page) => {
    onPageChange(page);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-4 z-30 p-2 rounded-lg bg-gray-800 text-white 
          transition-all duration-300 hover:bg-gray-700
          ${isOpen ? 'left-64 md:left-60' : 'left-4'}
          ${isMobile ? '' : 'md:hidden'}
        `}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white 
          transition-all duration-300 ease-in-out z-20
          ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}
          ${isMobile ? 'shadow-lg' : ''}
        `}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className={`font-bold text-xl ${!isOpen && 'hidden md:hidden'}`}>
            StockUP
          </h2>
          {!isMobile && (
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 hover:bg-gray-700 rounded-lg"
            >
              <Menu size={24} />
            </button>
          )}
        </div>

        <nav className="mt-8">
          <NavItem 
            icon={<LayoutDashboard size={24} />} 
            text="Dashboard" 
            isOpen={isOpen} 
            active={currentPage === 'dashboard'}
            onClick={() => handleNavigation('dashboard')}
          />
          <NavItem 
            icon={<User size={24} />} 
            text="Profile" 
            isOpen={isOpen}
            active={currentPage === 'profile'}
            onClick={() => handleNavigation('profile')}
          />
          <NavItem 
            icon={<Briefcase size={24} />} 
            text="Portfolio" 
            isOpen={isOpen}
            active={currentPage === 'portfolio'}
            onClick={() => handleNavigation('portfolio')}
          />

        </nav>
                  {/* Logout button at the bottom */}
        <div className="mt-auto">
        <NavItem 
            icon={<LogOut size={24} />} 
            text="Logout" 
            isOpen={isOpen} 
            active={false} 
            onClick={handleLogout} 
        />
        </div>

      </div>
    </>
  );
};

const NavItem = ({ icon, text, isOpen, active, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center p-4 cursor-pointer
        ${active ? 'bg-gray-700' : 'hover:bg-gray-700'}
        transition-colors duration-200
      `}
    >
      <div className="min-w-[24px]">{icon}</div>
      {isOpen && (
        <span className="ml-4 whitespace-nowrap overflow-hidden transition-all duration-200">
          {text}
        </span>
      )}
    </div>
  );
};

export default Sidebar;