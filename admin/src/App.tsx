import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaProjectDiagram, FaBlog, FaServicestack, FaEnvelope, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaEye, FaUsers, FaChartLine } from 'react-icons/fa';
import Login from './components/Login';
import { projectsAPI, blogAPI, servicesAPI, contactsAPI, usersAPI } from './services/api';
import type { Project, BlogPost, Service, ContactMessage, User } from './services/api';
import Modal from './components/Modal';
import ProjectForm from './components/ProjectForm';
import BlogForm from './components/BlogForm';
import ServiceForm from './components/ServiceForm';
import ContactForm from './components/ContactForm';
import UserForm from './components/UserForm';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [viewingContact, setViewingContact] = useState<ContactMessage | null>(null);
  const [searchProjects, setSearchProjects] = useState('');
  const [searchBlog, setSearchBlog] = useState('');
  const [searchServices, setSearchServices] = useState('');
  const [searchContacts, setSearchContacts] = useState('');
  const [searchUsers, setSearchUsers] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token);
      fetchAllData();
    } else {
      localStorage.removeItem('adminToken');
      setUser(null);
      setProjects([]);
      setBlogPosts([]);
      setServices([]);
      setContacts([]);
      setUsers([]);
    }
  }, [token]);

  const fetchAllData = async () => {
    setLoading(true);
    setError('');
    try {
      const [projectsData, blogData, servicesData, contactsData, usersData] = await Promise.all([
        projectsAPI.getAll(),
        blogAPI.getAll(),
        servicesAPI.getAll(),
        contactsAPI.getAll(),
        usersAPI.getAll(),
      ]);
      setProjects(projectsData);
      setBlogPosts(blogData);
      setServices(servicesData);
      setContacts(contactsData);
      setUsers(usersData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token: string, user: any) => {
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const openAddModal = (type: string) => {
    if (type === 'project') setEditingProject(null);
    if (type === 'blog') setEditingBlogPost(null);
    if (type === 'service') setEditingService(null);
    if (type === 'user') setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (type: string, item: any) => {
    if (type === 'project') setEditingProject(item);
    if (type === 'blog') setEditingBlogPost(item);
    if (type === 'service') setEditingService(item);
    if (type === 'contact') setViewingContact(item);
    if (type === 'user') setEditingUser(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setEditingBlogPost(null);
    setEditingService(null);
    setViewingContact(null);
    setEditingUser(null);
  };

  const handleSaveProject = async (project: Project) => {
    setLoading(true);
    setError('');
    try {
      if (editingProject) {
        await projectsAPI.update(editingProject.id!, project);
      } else {
        await projectsAPI.create(project);
      }
      await fetchAllData();
      closeModal();
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setLoading(true);
    setError('');
    try {
      await projectsAPI.delete(id);
      await fetchAllData();
    } catch (err: any) {
      setError(err.message || 'Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBlogPost = async (blogPost: BlogPost) => {
    setLoading(true);
    setError('');
    try {
      if (editingBlogPost) {
        await blogAPI.update(editingBlogPost.id!, blogPost);
      } else {
        await blogAPI.create(blogPost);
      }
      await fetchAllData();
      closeModal();
    } catch (err: any) {
      setError(err.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlogPost = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    setLoading(true);
    setError('');
    try {
      await blogAPI.delete(id);
      await fetchAllData();
    } catch (err: any) {
      setError(err.message || 'Failed to delete blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveService = async (service: Service) => {
    setLoading(true);
    setError('');
    try {
      if (editingService) {
        await servicesAPI.update(editingService.id!, service);
      } else {
        await servicesAPI.create(service);
      }
      await fetchAllData();
      closeModal();
    } catch (err: any) {
      setError(err.message || 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    setLoading(true);
    setError('');
    try {
      await servicesAPI.delete(id);
      await fetchAllData();
    } catch (err: any) {
      setError(err.message || 'Failed to delete service');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    setLoading(true);
    setError('');
    try {
      await contactsAPI.delete(id);
      await fetchAllData();
    } catch (err: any) {
      setError(err.message || 'Failed to delete contact message');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUser = async (user: User) => {
    setLoading(true);
    setError('');
    try {
      if (editingUser) {
        await usersAPI.update(editingUser.id!, user);
      } else {
        await usersAPI.create(user);
      }
      await fetchAllData();
      closeModal();
    } catch (err: any) {
      setError(err.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoading(true);
    setError('');
    try {
      await usersAPI.delete(id);
      await fetchAllData();
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <FaTachometerAlt />
              <span>Nayan Ray Admin</span>
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaTachometerAlt />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeTab === 'projects'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaProjectDiagram />
                  <span>Projects</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('blog')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeTab === 'blog'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaBlog />
                  <span>Blog Posts</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeTab === 'services'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaServicestack />
                  <span>Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeTab === 'contacts'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaEnvelope />
                  <span>Contact Messages</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeTab === 'users'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaUsers />
                  <span>Users</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center">
                      <div className="flex items-center space-x-2">
                        <FaProjectDiagram className="text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Total Projects</h3>
                      </div>
                      <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center">
                      <div className="flex items-center space-x-2">
                        <FaBlog className="text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
                      </div>
                      <p className="text-3xl font-bold text-green-600">{blogPosts.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center">
                      <div className="flex items-center space-x-2">
                        <FaServicestack className="text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Services</h3>
                      </div>
                      <p className="text-3xl font-bold text-purple-600">{services.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center">
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Contact Messages</h3>
                      </div>
                      <p className="text-3xl font-bold text-red-600">{contacts.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center">
                      <div className="flex items-center space-x-2">
                        <FaUsers className="text-indigo-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                      </div>
                      <p className="text-3xl font-bold text-indigo-600">{users.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center">
                      <div className="flex items-center space-x-2">
                        <FaChartLine className="text-yellow-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Other Metric</h3>
                      </div>
                      <p className="text-3xl font-bold text-yellow-600">123</p>
                    </div>
                  </div>
                </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
                  <button
                    onClick={() => openAddModal('project')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>Add Project</span>
                  </button>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchProjects}
                    onChange={(e) => setSearchProjects(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Featured
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects.filter(p => p.title.toLowerCase().includes(searchProjects.toLowerCase()) || p.category.toLowerCase().includes(searchProjects.toLowerCase())).map((project) => (
                        <tr key={project.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {project.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {project.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {project.featured ? 'Yes' : 'No'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openEditModal('project', project)}
                              className="text-blue-600 hover:text-blue-900 mr-4 flex items-center space-x-1"
                            >
                              <FaEdit />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id!)}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1"
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
                <Modal isOpen={isModalOpen} onClose={closeModal} title={editingProject ? 'Edit Project' : 'Add Project'}>
                  <ProjectForm
                    initialData={editingProject || undefined}
                    onSubmit={handleSaveProject}
                    onCancel={closeModal}
                  />
                </Modal>
              </div>
            )}

            {activeTab === 'blog' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Blog Posts</h2>
                  <button
                    onClick={() => openAddModal('blog')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogPosts.filter(p => p.title.toLowerCase().includes(searchBlog.toLowerCase()) || p.author.toLowerCase().includes(searchBlog.toLowerCase()) || p.category.toLowerCase().includes(searchBlog.toLowerCase())).map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {post.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.author}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openEditModal('blog', post)}
                              className="text-blue-600 hover:text-blue-900 mr-4 flex items-center space-x-1"
                            >
                              <FaEdit />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteBlogPost(post.id!)}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1"
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
            )}

            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Services</h2>
                  <button
                    onClick={() => openAddModal('service')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>Add Service</span>
                  </button>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchServices}
                    onChange={(e) => setSearchServices(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Icon
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Features
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {services.filter(s => s.title.toLowerCase().includes(searchServices.toLowerCase()) || s.icon.toLowerCase().includes(searchServices.toLowerCase())).map((service) => (
                        <tr key={service.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {service.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {service.icon}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {Array.isArray(service.features) ? service.features.join(', ') : service.features}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openEditModal('service', service)}
                              className="text-blue-600 hover:text-blue-900 mr-4 flex items-center space-x-1"
                            >
                              <FaEdit />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id!)}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1"
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
                <Modal isOpen={isModalOpen} onClose={closeModal} title={editingService ? 'Edit Service' : 'Add Service'}>
                  <ServiceForm
                    initialData={editingService || undefined}
                    onSubmit={handleSaveService}
                    onCancel={closeModal}
                  />
                </Modal>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Messages</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchContacts}
                    onChange={(e) => setSearchContacts(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contacts.filter(c => c.name.toLowerCase().includes(searchContacts.toLowerCase()) || c.email.toLowerCase().includes(searchContacts.toLowerCase()) || c.subject.toLowerCase().includes(searchContacts.toLowerCase())).map((contact) => (
                        <tr key={contact.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {contact.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contact.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contact.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(contact.createdAt || '').toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openEditModal('contact', contact)}
                              className="text-blue-600 hover:text-blue-900 mr-4 flex items-center space-x-1"
                            >
                              <FaEye />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact.id!)}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1"
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
            )}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Users</h2>
                  <button
                    onClick={() => openAddModal('user')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>Add User</span>
                  </button>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchUsers}
                    onChange={(e) => setSearchUsers(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.filter(u => u.username.toLowerCase().includes(searchUsers.toLowerCase()) || u.email.toLowerCase().includes(searchUsers.toLowerCase()) || u.role.toLowerCase().includes(searchUsers.toLowerCase())).map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openEditModal('user', user)}
                              className="text-blue-600 hover:text-blue-900 mr-4 flex items-center space-x-1"
                            >
                              <FaEdit />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id!)}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1"
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
                <Modal isOpen={isModalOpen} onClose={closeModal} title={editingUser ? 'Edit User' : 'Add User'}>
                  <UserForm
                    initialData={editingUser || undefined}
                    onSubmit={handleSaveUser}
                    onCancel={closeModal}
                  />
                </Modal>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
  