import React, { useEffect, useRef, useState } from 'react';
import { FaSignOutAlt, FaBars, FaSearch, FaBell } from 'react-icons/fa';
import ThemeToggle from './ui/ThemeToggle';

interface HeaderProps {
  user: any;
  onLogout: () => void;
  onOpenMobileSidebar: () => void;
  activeLabel: string;
  notifications?: number;
}

const initialsOf = (name?: string) => {
  if (!name) return 'NR';
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const Header: React.FC<HeaderProps> = ({ user, onLogout, onOpenMobileSidebar, activeLabel, notifications = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-surface-100 bg-surface-0/80 backdrop-blur-md dark:border-white/5 dark:bg-surface-900/80">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <button
          onClick={onOpenMobileSidebar}
          className="rounded-lg p-2 text-surface-900/60 hover:bg-surface-50 lg:hidden dark:text-white/60 dark:hover:bg-white/5"
          aria-label="Open menu"
        >
          <FaBars size={16} />
        </button>

        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wide text-surface-900/40 dark:text-white/30">Admin Studio</p>
          <h1 className="truncate text-lg font-semibold text-surface-900 dark:text-white">{activeLabel}</h1>
        </div>

        {/* search — desktop */}
        <div className="ml-auto hidden max-w-sm flex-1 items-center gap-2 rounded-xl border border-surface-100 bg-surface-50 px-3 py-2 text-sm text-surface-900/40 md:flex dark:border-white/5 dark:bg-white/5 dark:text-white/30">
          <FaSearch size={13} />
          <span>Search projects, posts, users…</span>
          <kbd className="ml-auto rounded-md border border-surface-100 bg-surface-0 px-1.5 py-0.5 text-[10px] font-medium text-surface-900/40 dark:border-white/10 dark:bg-white/5 dark:text-white/30">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-1.5 md:ml-3">
          <ThemeToggle />

          <button
            className="relative rounded-lg p-2 text-surface-900/60 hover:bg-surface-50 dark:text-white/60 dark:hover:bg-white/5"
            aria-label="Notifications"
          >
            <FaBell size={15} />
            {notifications > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-rose-500 ring-2 ring-surface-0 dark:ring-surface-900" />
            )}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 hover:bg-surface-50 dark:hover:bg-white/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white">
                {initialsOf(user?.username)}
              </div>
              <span className="hidden text-sm font-medium text-surface-900 sm:block dark:text-white">
                {user?.username || 'Admin'}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-surface-100 bg-surface-0 py-1 shadow-card dark:border-white/10 dark:bg-surface-800">
                <div className="border-b border-surface-100 px-3 py-2 dark:border-white/5">
                  <p className="truncate text-sm font-medium text-surface-900 dark:text-white">{user?.username || 'Admin'}</p>
                  <p className="truncate text-xs text-surface-900/40 dark:text-white/30">{user?.email || 'Signed in'}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                >
                  <FaSignOutAlt size={13} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
