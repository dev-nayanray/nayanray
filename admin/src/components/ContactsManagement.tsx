import React from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import Modal from './Modal';
import ContactForm from './ContactForm';
import type { ContactMessage } from '../services/api';

interface ContactsManagementProps {
  contacts: ContactMessage[];
  loading: boolean;
  error: string;
  searchContacts: string;
  setSearchContacts: (value: string) => void;
  openEditModal: (contact: ContactMessage) => void;
  handleDeleteContact: (id: number) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  viewingContact: ContactMessage | null;
}

const ContactsManagement: React.FC<ContactsManagementProps> = ({
  contacts,
  loading,
  error,
  searchContacts,
  setSearchContacts,
  openEditModal,
  handleDeleteContact,
  isModalOpen,
  closeModal,
  viewingContact,
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Messages</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchContacts}
          onChange={(e) => setSearchContacts(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      {loading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {contacts.filter(c => c.name.toLowerCase().includes(searchContacts.toLowerCase()) || c.email.toLowerCase().includes(searchContacts.toLowerCase()) || c.subject.toLowerCase().includes(searchContacts.toLowerCase())).map((contact) => (
              <tr key={contact.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {contact.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {contact.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {contact.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {new Date(contact.createdAt || '').toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(contact)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4 flex items-center space-x-1"
                  >
                    <FaEye />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id!)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center space-x-1"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Contact Message Details">
        {viewingContact && (
          <ContactForm
            initialData={viewingContact}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default ContactsManagement;
