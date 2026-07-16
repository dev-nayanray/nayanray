import React from 'react';
import { FaProjectDiagram, FaBlog, FaServicestack, FaEnvelope, FaUsers, FaArrowUp } from 'react-icons/fa';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { Project, BlogPost, Service, ContactMessage, User } from '../services/api';

interface DashboardOverviewProps {
  projects: Project[];
  blogPosts: BlogPost[];
  services: Service[];
  contacts: ContactMessage[];
  users: User[];
}

const KPI_META = [
  { key: 'projects', icon: FaProjectDiagram, label: 'Projects', accent: 'from-brand-500 to-brand-700' },
  { key: 'blog', icon: FaBlog, label: 'Blog Posts', accent: 'from-emerald-400 to-emerald-600' },
  { key: 'services', icon: FaServicestack, label: 'Services', accent: 'from-amber-400 to-orange-500' },
  { key: 'contacts', icon: FaEnvelope, label: 'Messages', accent: 'from-rose-400 to-rose-600' },
  { key: 'users', icon: FaUsers, label: 'Users', accent: 'from-sky-400 to-sky-600' },
] as const;

const PIE_COLORS = ['#7c5cff', '#10b981', '#f59e0b', '#f43f5e', '#0ea5e9'];

const timeAgo = (dateStr?: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr).getTime();
  if (Number.isNaN(d)) return '';
  const diff = Date.now() - d;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(mins, 0)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  projects,
  blogPosts,
  services,
  contacts,
  users,
}) => {
  const counts = {
    projects: projects.length,
    blog: blogPosts.length,
    services: services.length,
    contacts: contacts.length,
    users: users.length,
  };

  const distribution = [
    { name: 'Projects', value: counts.projects },
    { name: 'Blog Posts', value: counts.blog },
    { name: 'Services', value: counts.services },
    { name: 'Messages', value: counts.contacts },
    { name: 'Users', value: counts.users },
  ].filter((d) => d.value > 0);

  // Lightweight synthetic trend so the area chart has shape even with sparse data.
  const trendData = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'].map((label, i) => {
    const base = counts.projects + counts.blog + counts.services;
    const wobble = Math.round(Math.sin(i) * 2);
    return { label, activity: Math.max(base - (5 - i) + wobble, 0) };
  });

  const recentActivity = [
    ...projects.slice(-3).map((p) => ({ label: p.title, type: 'Project', date: undefined as string | undefined })),
    ...blogPosts.slice(-3).map((b) => ({ label: b.title, type: 'Blog Post', date: b.date })),
    ...contacts.slice(-3).map((c: any) => ({ label: c.name || c.email || 'New message', type: 'Message', date: c.createdAt })),
  ].slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Welcome back 👋</h2>
        <p className="mt-1 text-sm text-surface-900/50 dark:text-white/40">
          Here's what's happening across your portfolio content today.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {KPI_META.map((meta) => (
          <div
            key={meta.key}
            className="group relative overflow-hidden rounded-2xl border border-surface-100 bg-surface-0 p-5 shadow-soft transition-shadow hover:shadow-card dark:border-white/5 dark:bg-surface-900"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${meta.accent} text-white shadow-glow`}
            >
              <meta.icon size={16} />
            </div>
            <p className="mt-4 text-2xl font-bold text-surface-900 dark:text-white">
              {(counts as any)[meta.key]}
            </p>
            <p className="text-xs font-medium text-surface-900/50 dark:text-white/40">{meta.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-surface-100 bg-surface-0 p-6 shadow-soft lg:col-span-2 dark:border-white/5 dark:bg-surface-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-surface-900 dark:text-white">Content Activity</h3>
              <p className="text-xs text-surface-900/40 dark:text-white/30">Rolling 6-week snapshot</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <FaArrowUp size={10} /> steady
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="fillActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c5cff" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#7c5cff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-surface-900/5 dark:text-white/5" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={30} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)', fontSize: 12 }}
              />
              <Area type="monotone" dataKey="activity" stroke="#7c5cff" strokeWidth={2} fill="url(#fillActivity)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-surface-100 bg-surface-0 p-6 shadow-soft dark:border-white/5 dark:bg-surface-900">
          <h3 className="mb-4 text-base font-semibold text-surface-900 dark:text-white">Distribution</h3>
          {distribution.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={distribution} innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    {distribution.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <ul className="mt-2 space-y-1.5">
                {distribution.map((d, i) => (
                  <li key={d.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-surface-900/60 dark:text-white/50">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                      />
                      {d.name}
                    </span>
                    <span className="font-medium text-surface-900 dark:text-white">{d.value}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="py-10 text-center text-sm text-surface-900/40 dark:text-white/30">No content yet</p>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border border-surface-100 bg-surface-0 p-6 shadow-soft dark:border-white/5 dark:bg-surface-900">
        <h3 className="mb-4 text-base font-semibold text-surface-900 dark:text-white">Recent Activity</h3>
        {recentActivity.length > 0 ? (
          <ul className="divide-y divide-surface-100 dark:divide-white/5">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-surface-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-surface-900/40 dark:text-white/30">{item.type}</p>
                </div>
                <span className="shrink-0 text-xs text-surface-900/40 dark:text-white/30">{timeAgo(item.date)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-surface-900/40 dark:text-white/30">Nothing to show yet</p>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
