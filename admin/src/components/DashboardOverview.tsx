import React from 'react';
import { FaProjectDiagram, FaBlog, FaServicestack, FaEnvelope, FaUsers, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import type { Project, BlogPost, Service, ContactMessage, User } from '../services/api';

interface DashboardOverviewProps {
  projects: Project[];
  blogPosts: BlogPost[];
  services: Service[];
  contacts: ContactMessage[];
  users: User[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  projects,
  blogPosts,
  services,
  contacts,
  users,
}) => {
  const stats = [
    { icon: FaProjectDiagram, label: 'Total Projects', value: projects.length, color: 'text-blue-600' },
    { icon: FaBlog, label: 'Blog Posts', value: blogPosts.length, color: 'text-green-600' },
    { icon: FaServicestack, label: 'Services', value: services.length, color: 'text-purple-600' },
    { icon: FaEnvelope, label: 'Contact Messages', value: contacts.length, color: 'text-red-600' },
    { icon: FaUsers, label: 'Users', value: users.length, color: 'text-indigo-600' },
    { icon: FaChartLine, label: 'Other Metric', value: 123, color: 'text-yellow-600' },
  ];

  const chartData = [
    { name: 'Projects', value: projects.length, color: '#3B82F6' },
    { name: 'Blog Posts', value: blogPosts.length, color: '#10B981' },
    { name: 'Services', value: services.length, color: '#8B5CF6' },
    { name: 'Contacts', value: contacts.length, color: '#EF4444' },
    { name: 'Users', value: users.length, color: '#6366F1' },
  ];

  const barData = [
    { name: 'Projects', count: projects.length },
    { name: 'Blog Posts', count: blogPosts.length },
    { name: 'Services', count: services.length },
    { name: 'Contacts', count: contacts.length },
    { name: 'Users', count: users.length },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex flex-col justify-center items-center hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 mb-2">
              <stat.icon className={`${stat.color}`} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stat.label}</h3>
            </div>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Content Overview</h3>
          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              cx={200}
              cy={150}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
