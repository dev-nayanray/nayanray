import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contact API
export const submitContactMessage = async (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

// Proposal API
export interface ProposalData {
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
}

export const BUDGET_RANGES = ["Under $1k", "$1k–5k", "$5k–15k", "$15k+", "Not sure yet"];
export const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Flexible"];

export const submitProposal = async (data: ProposalData) => {
  const response = await api.post('/proposals', data);
  return response.data;
};

export default api;
