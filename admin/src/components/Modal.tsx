import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-surface-950/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-surface-100 bg-surface-0 shadow-card dark:border-white/10 dark:bg-surface-900"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-surface-100 px-6 py-4 dark:border-white/5">
          <h3 className="text-base font-semibold text-surface-900 dark:text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-surface-900/40 hover:bg-surface-50 hover:text-surface-900 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <div className="scrollbar-thin overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
