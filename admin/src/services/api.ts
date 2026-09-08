import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* ------------------------------------------------------------------ */
/*  Token storage — in-memory only (NOT localStorage)                 */
/*                                                                    */
/*  The backend sets an httpOnly cookie for same-origin setups, but  */
/*  cross-origin (admin on Vercel → backend on Render) cookies are    */
/*  often blocked by browsers (Safari ITP, Brave Shields, third-party */
/*  cookie restrictions).                                              */
/*                                                                    */
/*  As a fallback, the login response also returns the token in JSON. */
/*  We store it in a module-level variable (in memory, not localStorage) */
/*  and attach it via Authorization header. This survives page reloads */
/*  within the same session (until /auth/me fails), and is cleared on */
/*  logout.                                                            */
/*                                                                    */
/*  In-memory storage is XSS-safe: even if an attacker runs JS, they  */
/*  can only read the token for the current session — not from       */
/*  localStorage which persists across sessions.                      */
/* ------------------------------------------------------------------ */
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send httpOnly cookies if available
});

// Request interceptor — attach token via Authorization header as fallback
// when the cookie isn't present (cross-origin / blocked cookies)
api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

/* ------------------------------------------------------------------ */
/*  Auth state change callback                                         */
/*                                                                    */
/*  The response interceptor needs to clear auth state on 401 without */
/*  causing an infinite reload loop. We use a mutable callback ref    */
/*  instead of importing the App component directly (circular dep).   */
/*  App.tsx registers its handleLogout via setOnAuthError.            */
/* ------------------------------------------------------------------ */
let onAuthError: (() => void) | null = null;
export const setOnAuthError = (cb: (() => void) | null) => {
  onAuthError = cb;
};

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only trigger auth-error handling on 401 from protected routes —
    // NOT from /auth/me (which legitimately returns 401 when the user
    // isn't logged in yet) or /auth/login (which returns 401 on bad
    // credentials and the Login component handles it inline).
    const url = error.config?.url || "";
    const isAuthCheck = url.includes("/auth/me") || url.includes("/auth/login");

    if (error.response?.status === 401 && !isAuthCheck) {
      // Session is invalid/expired on a protected route.
      // Call the registered callback to clear state + show login screen.
      // This avoids a full page reload (which loses React state and
      // causes a flash). If no callback is registered, fall back to reload.
      if (onAuthError) {
        onAuthError();
      } else {
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export interface Project {
  id?: number;
  title: string;
  description: string;
  images: string[];
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

export type ProposalStatus = 'new' | 'reviewed' | 'in_discussion' | 'accepted' | 'declined';

export interface Proposal {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceId?: number | null;
  serviceName?: string;
  projectType?: string;
  budgetRange: string;
  timeline: string;
  description: string;
  status: ProposalStatus;
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

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token?: string; // present as fallback for cross-origin (blocked cookies)
  user: AuthUser;
}

export const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === 'object' && 'response' in err) {
    const resp = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
    return resp.response?.data?.error || resp.response?.data?.message || resp.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
};

// Auth API
export const authAPI = {
  // Login — backend sets httpOnly cookie AND returns token in JSON.
  // The token is stored in memory as a fallback for cross-origin setups
  // where third-party cookies are blocked.
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    const responseData = response.data;
    // Store token in memory for cross-origin fallback
    if (responseData.token) {
      setAuthToken(responseData.token);
    }
    return responseData;
  },

  // Fetch current user from the httpOnly cookie — called on app mount
  // to populate the user object after a page reload.
  me: async (): Promise<{ user: AuthUser }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout — clears the httpOnly cookie on the server
  // Logout — clears the httpOnly cookie on the server AND clears the
  // in-memory token fallback.
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    setAuthToken(null); // clear in-memory token
  },

  // NOTE: The `register` method was removed for security.
  // /api/auth/register is disabled by default and only works when
  // ENABLE_REGISTER=1 AND zero users exist (first-boot bootstrap).
  // Admin users should be created via the admin panel (UsersManagement)
  // by an existing authenticated admin, or via the seeder with
  // ADMIN_SEED_PASSWORD set.
};

// Upload API
export const uploadAPI = {
  uploadImage: async (
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/admin/upload', formData, {
      onUploadProgress: (evt) => {
        if (onProgress && evt.total) {
          onProgress(Math.round((evt.loaded / evt.total) * 100));
        }
      },
    });
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

// Proposals API
export const proposalsAPI = {
  getAll: async (): Promise<Proposal[]> => {
    const response = await api.get('/admin/proposals');
    return response.data;
  },
  updateStatus: async (id: number, status: ProposalStatus): Promise<Proposal> => {
    const response = await api.patch(`/admin/proposals/${id}/status`, { status });
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/proposals/${id}`);
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
