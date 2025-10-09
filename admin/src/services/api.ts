import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Project {
  id?: number;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  githubLink: string;
  technologies: string[];
  category: string;
  icon: string;
  gradient: string;
  featured: boolean;
}

export interface BlogPost {
  id?: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface Service {
  id?: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

// Auth API
export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/admin/projects');
    return response.data;
  },
  create: async (data: Project): Promise<Project> => {
    const response = await api.post('/admin/projects', data);
    return response.data;
  },
  update: async (id: number, data: Project): Promise<Project> => {
    const response = await api.put(`/admin/projects/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/projects/${id}`);
  },
};

// Blog API
export const blogAPI = {
  getAll: async (): Promise<BlogPost[]> => {
    const response = await api.get('/admin/blog');
    return response.data;
  },
  create: async (data: BlogPost): Promise<BlogPost> => {
    const response = await api.post('/admin/blog', data);
    return response.data;
  },
  update: async (id: number, data: BlogPost): Promise<BlogPost> => {
    const response = await api.put(`/admin/blog/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/blog/${id}`);
  },
};

// Services API
export const servicesAPI = {
  getAll: async (): Promise<Service[]> => {
    const response = await api.get('/admin/services');
    return response.data;
  },
  create: async (data: Service): Promise<Service> => {
    const response = await api.post('/admin/services', data);
    return response.data;
  },
  update: async (id: number, data: Service): Promise<Service> => {
    const response = await api.put(`/admin/services/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/services/${id}`);
  },
};

// Contacts API
export const contactsAPI = {
  getAll: async (): Promise<ContactMessage[]> => {
    const response = await api.get('/admin/contacts');
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/contacts/${id}`);
  },
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  create: async (data: User): Promise<User> => {
    const response = await api.post('/admin/users', data);
    return response.data;
  },
  update: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/users/${id}`);
  },
};

export default api;
