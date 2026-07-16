import React from 'react';
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaBlog,
  FaServicestack,
  FaEnvelope,
  FaUsers,
  FaChevronLeft,
  FaTimes,
} from 'react-icons/fa';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  contactsCount?: number;
}

const menuItems = [
  { key: 'dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
  { key: 'projects', icon: FaProjectDiagram, label: 'Projects' },
  { key: 'blog', icon: FaBlog, label: 'Blog Posts' },
  { key: 'services', icon: FaServicestack, label: 'Services' },
  { key: 'contacts', icon: FaEnvelope, label: 'Messages' },
  { key: 'users', icon: FaUsers, label: 'Users' },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  contactsCount = 0,
}) => {
  const handleSelect = (key: string) => {
    setActiveTab(key);
    onCloseMobile();
  };

  return (
    <>
      {/* mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-surface-950/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <nav
        className={`fixed z-40 inset-y-0 left-0 flex flex-col border-r border-surface-100 bg-surface-0 shadow-soft transition-all duration-200 ease-out dark:border-white/5 dark:bg-surface-900
          ${collapsed ? 'lg:w-[76px]' : 'lg:w-64'}
          ${mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:static lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center justify-between px-4">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-glow">
              NR
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-surface-900 dark:text-white">Nayan Ray</p>
                <p className="truncate text-xs text-surface-900/50 dark:text-white/40">Admin Studio</p>
              </div>
            )}
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-surface-900/50 hover:bg-surface-100 lg:hidden dark:text-white/50 dark:hover:bg-white/5"
            aria-label="Close menu"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Nav items */}
        <ul className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.key;
            const badge = item.key === 'contacts' && contactsCount > 0 ? contactsCount : null;
            return (
              <li key={item.key} className="relative">
                <button
                  onClick={() => handleSelect(item.key)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all
                    ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                        : 'text-surface-900/60 hover:bg-surface-50 hover:text-surface-900 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white'
                    }
                    ${collapsed ? 'justify-center' : ''}`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand-600" />
                  )}
                  <item.icon
                    className={`shrink-0 ${isActive ? 'text-brand-600 dark:text-brand-300' : ''}`}
                    size={16}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && badge && (
                    <span className="ml-auto rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {badge}
                    </span>
                  )}
                  {collapsed && badge && (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden shrink-0 border-t border-surface-100 p-3 lg:block dark:border-white/5">
          <button
            onClick={onToggleCollapse}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium text-surface-900/50 hover:bg-surface-50 hover:text-surface-900 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <FaChevronLeft
              size={12}
              className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
