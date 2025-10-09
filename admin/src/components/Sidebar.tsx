import React from 'react';
import { FaTachometerAlt, FaProjectDiagram, FaBlog, FaServicestack, FaEnvelope, FaUsers } from 'react-icons/fa';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { key: 'dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { key: 'projects', icon: FaProjectDiagram, label: 'Projects' },
    { key: 'blog', icon: FaBlog, label: 'Blog Posts' },
    { key: 'services', icon: FaServicestack, label: 'Services' },
    { key: 'contacts', icon: FaEnvelope, label: 'Contact Messages' },
    { key: 'users', icon: FaUsers, label: 'Users' },
  ];

  return (
    <nav className="w-64 bg-white shadow-sm min-h-screen dark:bg-gray-800 dark:shadow-lg">
      <div className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveTab(item.key)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                  activeTab === item.key
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
