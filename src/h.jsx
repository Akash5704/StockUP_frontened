import React, { useState } from 'react';
import Sidebar from './pages/Side';
import Profile from './pages/Profile';
import Dashboard from './pages/dash';
import Portfolio from './pages/Portfolio';
import { useNavigate } from 'react-router-dom';
function H() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate()
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'portfolio':
        return <Portfolio />;
      default:
        return <Dashboard />;
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem('User'); // Clear session
    sessionStorage.removeItem('User'); // Optional: Clear user-specific data
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
      />
      <div 
        className={`
          flex-1 transition-all duration-300 
          ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
          mt-16 md:mt-0
        `}
      >
        {renderPage()}
      </div>
    </div>
  );
}

export default H;