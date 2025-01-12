import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, User, Briefcase, LogOut } from 'lucide-react'; // Import LogOut icon
import { Link } from 'react-router-dom';
const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/home' },
  { label: 'Profile', icon: <User className="w-5 h-5" />, href: '/profile' },
  { label: 'Portfolio', icon: <Briefcase className="w-5 h-5" />, href: '/portfolio' },
];

export default function Sidebar({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-40 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}
      >
        <div className="p-6 flex-grow">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">StockTracker</h1>
          <nav>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                
                    <span className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md p-3 transition-colors">
                      {item.icon}
                      {
                        <Link to={item.href}>
                        <button>
                          {item.label}
                        </button>
                      </Link>
                      }

                    </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout button at the bottom */}
        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md p-3 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
