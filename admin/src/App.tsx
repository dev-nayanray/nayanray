import { useState, useEffect } from 'react';
import Login from './components/Login';
import { projectsAPI, blogAPI, servicesAPI, contactsAPI, usersAPI } from './services/api';
import type { Project, BlogPost, Service, ContactMessage, User } from './services/api';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import ProjectsManagement from './components/ProjectsManagement';
import BlogManagement from './components/BlogManagement';
import ServicesManagement from './components/ServicesManagement';
import ContactsManagement from './components/ContactsManagement';
import UsersManagement from './components/UsersManagement';

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
      let savedProject: Project;
      if (editingProject) {
        savedProject = await projectsAPI.update(editingProject.id!, project);
        setProjects(projects.map(p => p.id === editingProject.id ? savedProject : p));
      } else {
        savedProject = await projectsAPI.create(project);
        setProjects([...projects, savedProject]);
      }
      closeModal();
      // Optionally fetch all data in background to sync
      fetchAllData().catch(err => console.error('Failed to sync data:', err));
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
      let savedBlogPost: BlogPost;
      if (editingBlogPost) {
        savedBlogPost = await blogAPI.update(editingBlogPost.id!, blogPost);
        setBlogPosts(blogPosts.map(b => b.id === editingBlogPost.id ? savedBlogPost : b));
      } else {
        savedBlogPost = await blogAPI.create(blogPost);
        setBlogPosts([...blogPosts, savedBlogPost]);
      }
      closeModal();
      // Optionally fetch all data in background to sync
      fetchAllData().catch(err => console.error('Failed to sync data:', err));
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
      let savedService: Service;
      if (editingService) {
        savedService = await servicesAPI.update(editingService.id!, service);
        setServices(services.map(s => s.id === editingService.id ? savedService : s));
      } else {
        savedService = await servicesAPI.create(service);
        setServices([...services, savedService]);
      }
      closeModal();
      // Optionally fetch all data in background to sync
      fetchAllData().catch(err => console.error('Failed to sync data:', err));
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardOverview
                projects={projects}
                blogPosts={blogPosts}
                services={services}
                contacts={contacts}
                users={users}
              />
            )}
            {activeTab === 'projects' && (
              <ProjectsManagement
                projects={projects}
                loading={loading}
                error={error}
                searchProjects={searchProjects}
                setSearchProjects={setSearchProjects}
                openAddModal={() => openAddModal('project')}
                openEditModal={(project) => openEditModal('project', project)}
                handleDeleteProject={handleDeleteProject}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                editingProject={editingProject}
                handleSaveProject={handleSaveProject}
              />
            )}
            {activeTab === 'blog' && (
              <BlogManagement
                blogPosts={blogPosts}
                loading={loading}
                error={error}
                searchBlog={searchBlog}
                setSearchBlog={setSearchBlog}
                openAddModal={() => openAddModal('blog')}
                openEditModal={(post) => openEditModal('blog', post)}
                handleDeleteBlogPost={handleDeleteBlogPost}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                editingBlogPost={editingBlogPost}
                handleSaveBlogPost={handleSaveBlogPost}
              />
            )}
            {activeTab === 'services' && (
              <ServicesManagement
                services={services}
                loading={loading}
                error={error}
                searchServices={searchServices}
                setSearchServices={setSearchServices}
                openAddModal={() => openAddModal('service')}
                openEditModal={(service) => openEditModal('service', service)}
                handleDeleteService={handleDeleteService}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                editingService={editingService}
                handleSaveService={handleSaveService}
              />
            )}
            {activeTab === 'contacts' && (
              <ContactsManagement
                contacts={contacts}
                loading={loading}
                error={error}
                searchContacts={searchContacts}
                setSearchContacts={setSearchContacts}
                openEditModal={(contact) => openEditModal('contact', contact)}
                handleDeleteContact={handleDeleteContact}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                viewingContact={viewingContact}
              />
            )}
            {activeTab === 'users' && (
              <UsersManagement
                users={users}
                loading={loading}
                error={error}
                searchUsers={searchUsers}
                setSearchUsers={setSearchUsers}
                openAddModal={() => openAddModal('user')}
                openEditModal={(user) => openEditModal('user', user)}
                handleDeleteUser={handleDeleteUser}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                editingUser={editingUser}
                handleSaveUser={handleSaveUser}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
