import React from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from './Modal';
import BlogForm from './BlogForm';
import type { BlogPost } from '../services/api';

interface BlogManagementProps {
  blogPosts: BlogPost[];
  loading: boolean;
  error: string;
  searchBlog: string;
  setSearchBlog: (value: string) => void;
  openAddModal: () => void;
  openEditModal: (blogPost: BlogPost) => void;
  handleDeleteBlogPost: (id: number) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  editingBlogPost: BlogPost | null;
  handleSaveBlogPost: (blogPost: BlogPost) => void;
}

const BlogManagement: React.FC<BlogManagementProps> = ({
  blogPosts,
  loading,
  error,
  searchBlog,
  setSearchBlog,
  openAddModal,
  openEditModal,
  handleDeleteBlogPost,
  isModalOpen,
  closeModal,
  editingBlogPost,
  handleSaveBlogPost,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <FaPlus />
          <span>Add Post</span>
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchBlog}
          onChange={(e) => setSearchBlog(e.target.value)}
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {blogPosts.filter(p => p.title.toLowerCase().includes(searchBlog.toLowerCase()) || p.author.toLowerCase().includes(searchBlog.toLowerCase()) || p.category.toLowerCase().includes(searchBlog.toLowerCase())).map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {post.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {post.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {post.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(post)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4 flex items-center space-x-1"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteBlogPost(post.id!)}
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
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingBlogPost ? 'Edit Blog Post' : 'Add Blog Post'}>
        <BlogForm
          initialData={editingBlogPost || undefined}
          onSubmit={handleSaveBlogPost}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default BlogManagement;
