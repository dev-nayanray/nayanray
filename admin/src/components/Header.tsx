import React from 'react';
import { FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import ThemeToggle from './ui/ThemeToggle';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <FaTachometerAlt />
            <span>Nayan Ray Admin</span>
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, {user?.username}</span>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 flex items-center space-x-2 transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
