import React from 'react';
import type { ContactMessage } from '../services/api';

interface ContactFormProps {
  initialData: ContactMessage;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialData, onCancel }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Name</label>
        <p className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-50 px-3 py-2 text-sm text-surface-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
          {initialData.name}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Email</label>
        <p className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-50 px-3 py-2 text-sm text-surface-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
          {initialData.email}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Subject</label>
        <p className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-50 px-3 py-2 text-sm text-surface-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
          {initialData.subject}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Message</label>
        <div className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-50 px-3 py-2 text-sm text-surface-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
          {initialData.message}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Date</label>
        <p className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-50 px-3 py-2 text-sm text-surface-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
          {new Date(initialData.createdAt || '').toLocaleString()}
        </p>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-surface-100 text-surface-900/70 hover:bg-surface-50 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
