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
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 shadow-sm sm:text-sm">
          {initialData.name}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 shadow-sm sm:text-sm">
          {initialData.email}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 shadow-sm sm:text-sm">
          {initialData.subject}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <div className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 shadow-sm sm:text-sm">
          {initialData.message}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 shadow-sm sm:text-sm">
          {new Date(initialData.createdAt || '').toLocaleString()}
        </p>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
