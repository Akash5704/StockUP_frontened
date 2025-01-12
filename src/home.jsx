import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import Dashboard from './pages/Dashboard';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('User');
    
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate('/');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('User'); // Clear session
    sessionStorage.removeItem('User'); // Optional: Clear user-specific data
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar handleLogout={handleLogout} />
      <main className="lg:ml-64 min-h-screen">
        <Dashboard />
      </main>
    </div>
  );
}
