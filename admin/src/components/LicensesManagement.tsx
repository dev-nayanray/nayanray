import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaKey, FaPlus, FaCopy, FaCheck, FaSearch, FaSync,
  FaCalendarAlt, FaRocket, FaEnvelope, FaExternalLinkAlt,
} from 'react-icons/fa';
import { licensesAPI, getErrorMessage } from '../services/api';
import type { License, CreateLicenseData } from '../services/api';
import Modal from './Modal';

const LicensesManagement: React.FC = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdKey, setCreatedKey] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Create form state
  const [formData, setFormData] = useState<CreateLicenseData>({
    email: '',
    plan: 'business',
    billingCycle: 'yearly',
    customerName: '',
  });

  const fetchLicenses = async () => {
    setLoading(true);
    setError('');
    try {
      const { licenses: data } = await licensesAPI.getAll();
      setLicenses(data || []);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to fetch licenses'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const result = await licensesAPI.create(formData);
      setCreatedKey(result.license_key);
      setFormData({ email: '', plan: 'business', billingCycle: 'yearly', customerName: '' });
      fetchLicenses();
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to create license'));
    } finally {
      setCreating(false);
    }
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerify = async (key: string) => {
    try {
      const result = await licensesAPI.verify(key);
      if (result.valid) {
        alert(`License ${key} is valid. Plan: ${result.plan}, Expires: ${result.expires_on}`);
      } else {
        alert(`License ${key} is NOT valid.`);
      }
    } catch (err: unknown) {
      alert(getErrorMessage(err, 'Verification failed'));
    }
  };

  const filtered = licenses.filter(
    (l) =>
      l.licenseKey.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  const planColors: Record<string, string> = {
    personal: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    business: 'bg-brand-500/10 text-brand-600 dark:text-brand-300',
    agency: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  };

  const statusColors: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    expired: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    suspended: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    refunded: 'bg-surface-500/10 text-surface-600 dark:text-white/40',
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Licenses</h2>
          <p className="text-xs text-surface-900/40 dark:text-white/40 mt-0.5">
            {licenses.length} total · {licenses.filter((l) => l.status === 'active').length} active
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-900/30 dark:text-white/30" />
            <input
              type="text"
              placeholder="Search licenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search licenses"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <FaPlus className="w-3 h-3" />
            New License
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-sm text-rose-600 dark:text-rose-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 rounded-full border-3 border-brand-500/20 border-t-brand-500 animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="inline-flex p-4 rounded-2xl bg-surface-100 dark:bg-white/5 mb-4">
            <FaKey className="w-6 h-6 text-surface-900/30 dark:text-white/30" />
          </div>
          <p className="text-surface-900/40 dark:text-white/40 text-sm">
            {search ? 'No licenses match your search.' : 'No licenses yet. Create one to get started.'}
          </p>
        </div>
      )}

      {/* Licenses grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid gap-4">
          {filtered.map((license, idx) => (
            <motion.div
              key={license.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.04, 0.2) }}
              className="bg-surface-0 dark:bg-surface-900/60 rounded-2xl p-5 border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Key + badges */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shrink-0">
                    <FaKey className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-mono font-bold text-brand-600 dark:text-brand-300 select-all truncate">
                        {license.licenseKey}
                      </code>
                      <button
                        onClick={() => handleCopy(license.licenseKey)}
                        className="p-1 rounded text-surface-900/40 dark:text-white/40 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                        aria-label="Copy license key"
                      >
                        {copiedKey === license.licenseKey ? (
                          <FaCheck className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <FaCopy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${planColors[license.plan] || planColors.business}`}>
                        {license.plan}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusColors[license.status] || statusColors.active}`}>
                        {license.status}
                      </span>
                      {license.activationsCount > 0 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-surface-100 dark:bg-white/5 text-surface-900/50 dark:text-white/40">
                          {license.activationsCount}/{license.maxActivations} sites
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <FaEnvelope className="w-3 h-3 text-surface-900/30 dark:text-white/30 shrink-0" />
                    <span className="text-surface-900/50 dark:text-white/40 truncate">{license.email}</span>
                  </div>
                  {license.customerName && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-surface-900/50 dark:text-white/40 truncate">{license.customerName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="w-3 h-3 text-surface-900/30 dark:text-white/30 shrink-0" />
                    <span className="text-surface-900/50 dark:text-white/40">{license.purchasedOn || '—'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="w-3 h-3 text-surface-900/30 dark:text-white/30 shrink-0" />
                    <span className="text-surface-900/50 dark:text-white/40">{license.expiresOn || '—'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleVerify(license.licenseKey)}
                    className="p-2 rounded-lg bg-surface-50 dark:bg-white/5 text-surface-900/50 dark:text-white/40 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                    title="Verify license"
                  >
                    <FaSync className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Activations list */}
              {license.activations && license.activations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-surface-100 dark:border-white/5 space-y-2">
                  <p className="text-[10px] uppercase tracking-wider text-surface-900/30 dark:text-white/30 font-semibold mb-2">
                    Activated Sites
                  </p>
                  {license.activations.map((act, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <FaExternalLinkAlt className="w-3 h-3 text-surface-900/30 dark:text-white/30 shrink-0" />
                        <span className="text-surface-900/60 dark:text-white/50 truncate">{act.site}</span>
                      </div>
                      <span className="text-surface-900/30 dark:text-white/30 shrink-0">{act.activatedOn}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Create License Modal */}
      <Modal isOpen={showCreateModal} onClose={() => { setShowCreateModal(false); setCreatedKey(''); }} title={createdKey ? 'License Created' : 'Create New License'}>
        {createdKey ? (
          <div className="text-center py-4">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 mb-4">
              <FaCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="text-sm text-surface-900/60 dark:text-white/50 mb-3">License key created successfully!</p>
            <div className="bg-surface-50 dark:bg-white/5 rounded-xl p-4 mb-4">
              <code className="text-lg font-mono font-bold text-brand-600 dark:text-brand-300 select-all">{createdKey}</code>
            </div>
            <button
              onClick={() => { handleCopy(createdKey); }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-300 text-sm font-medium rounded-xl hover:bg-brand-500/20 transition-colors"
            >
              {copiedKey === createdKey ? <FaCheck className="w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
              {copiedKey === createdKey ? 'Copied!' : 'Copy Key'}
            </button>
            <button
              onClick={() => { setShowCreateModal(false); setCreatedKey(''); }}
              className="block mx-auto mt-4 text-sm text-surface-900/40 dark:text-white/40 hover:text-surface-900 dark:hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Customer Email *</label>
              <input
                type="email" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="customer@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Customer Name</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="John Smith"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Plan *</label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                >
                  <option value="personal">Personal (1 site)</option>
                  <option value="business">Business (3 sites)</option>
                  <option value="agency">Agency (10 sites)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Billing Cycle *</label>
                <select
                  value={formData.billingCycle}
                  onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                >
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            {error && (
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-sm text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-5 py-2.5 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white text-sm font-medium rounded-xl border border-surface-100 dark:border-white/10 hover:border-brand-500/40 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] transition-all disabled:opacity-50"
              >
                {creating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FaRocket className="w-3.5 h-3.5" />
                    Create License
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default LicensesManagement;
