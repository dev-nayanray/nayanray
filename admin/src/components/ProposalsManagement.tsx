import React from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import Modal from './Modal';
import type { Proposal, ProposalStatus } from '../services/api';

interface ProposalsManagementProps {
  proposals: Proposal[];
  loading: boolean;
  error: string;
  searchProposals: string;
  setSearchProposals: (value: string) => void;
  openViewModal: (proposal: Proposal) => void;
  handleDeleteProposal: (id: number) => void;
  handleUpdateProposalStatus: (id: number, status: ProposalStatus) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  viewingProposal: Proposal | null;
}

const STATUS_LABELS: Record<ProposalStatus, string> = {
  new: 'New',
  reviewed: 'Reviewed',
  in_discussion: 'In Discussion',
  accepted: 'Accepted',
  declined: 'Declined',
};

const STATUS_STYLES: Record<ProposalStatus, string> = {
  new: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300',
  reviewed: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
  in_discussion: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  accepted: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  declined: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
};

const StatusBadge: React.FC<{ status: ProposalStatus }> = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
    {STATUS_LABELS[status]}
  </span>
);

const ProposalsManagement: React.FC<ProposalsManagementProps> = ({
  proposals,
  loading,
  error,
  searchProposals,
  setSearchProposals,
  openViewModal,
  handleDeleteProposal,
  handleUpdateProposalStatus,
  isModalOpen,
  closeModal,
  viewingProposal,
}) => {
  const filtered = proposals.filter(
    (p) =>
      p.name.toLowerCase().includes(searchProposals.toLowerCase()) ||
      p.email.toLowerCase().includes(searchProposals.toLowerCase()) ||
      (p.serviceName || '').toLowerCase().includes(searchProposals.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Proposals</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search proposals..."
          value={searchProposals}
          onChange={(e) => setSearchProposals(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-surface-100 bg-surface-0 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
      {loading && <p className="text-surface-900/60 dark:text-white/50">Loading...</p>}
      {error && <p className="text-rose-600 dark:text-rose-400">{error}</p>}
      <div className="bg-surface-0 dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-white/5 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-100 dark:divide-white/5">
            <thead className="bg-surface-50 dark:bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-900/50 dark:text-white/40 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-900/50 dark:text-white/40 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-900/50 dark:text-white/40 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-900/50 dark:text-white/40 uppercase tracking-wider">Timeline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-900/50 dark:text-white/40 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-900/50 dark:text-white/40 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-900/50 dark:text-white/40 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-white/5">
              {filtered.map((proposal) => (
                <tr key={proposal.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                    <div className="font-medium">{proposal.name}</div>
                    <div className="text-surface-900/50 dark:text-white/40 text-xs">{proposal.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900/70 dark:text-white/60">
                    {proposal.serviceName || 'General inquiry'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900/70 dark:text-white/60">{proposal.budgetRange}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900/70 dark:text-white/60">{proposal.timeline}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={proposal.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900/50 dark:text-white/40">
                    {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openViewModal(proposal)}
                      className="text-brand-600 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200 mr-4 inline-flex items-center gap-1.5"
                    >
                      <FaEye /> <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProposal(proposal.id!)}
                      className="text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300 inline-flex items-center gap-1.5"
                    >
                      <FaTrash /> <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-surface-900/40 dark:text-white/30">
                    No proposals yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Proposal Details">
        {viewingProposal && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-surface-900/40 dark:text-white/30 text-xs uppercase tracking-wide mb-1">Name</p>
                <p className="text-surface-900 dark:text-white font-medium">{viewingProposal.name}</p>
              </div>
              <div>
                <p className="text-surface-900/40 dark:text-white/30 text-xs uppercase tracking-wide mb-1">Email</p>
                <p className="text-surface-900 dark:text-white font-medium">{viewingProposal.email}</p>
              </div>
              {viewingProposal.phone && (
                <div>
                  <p className="text-surface-900/40 dark:text-white/30 text-xs uppercase tracking-wide mb-1">Phone</p>
                  <p className="text-surface-900 dark:text-white font-medium">{viewingProposal.phone}</p>
                </div>
              )}
              {viewingProposal.company && (
                <div>
                  <p className="text-surface-900/40 dark:text-white/30 text-xs uppercase tracking-wide mb-1">Company</p>
                  <p className="text-surface-900 dark:text-white font-medium">{viewingProposal.company}</p>
                </div>
              )}
              <div>
                <p className="text-surface-900/40 dark:text-white/30 text-xs uppercase tracking-wide mb-1">Service</p>
                <p className="text-surface-900 dark:text-white font-medium">{viewingProposal.serviceName || 'General inquiry'}</p>
              </div>
              <div>
                <p className="text-surface-900/40 dark:text-white/30 text-xs uppercase tracking-wide mb-1">Project Type</p>
                <p className="text-surface-900 dark:text-white font-medium">{viewingProposal.projectType || '—'}</p>
              </div>
              <div>
                <p className="text-surface-900/40 dark:text-white/30 text-xs uppercase tracking-wide mb-1">Budget</p>
                <p className="text-surface-900 dark:text-white font-medium">{viewingProposal.budgetRange}</p>
              </div>
              <div>
                <p className="text-surface-900/40 dark:text-white/30 text-xs uppercase tracking-wide mb-1">Timeline</p>
                <p className="text-surface-900 dark:text-white font-medium">{viewingProposal.timeline}</p>
              </div>
            </div>

            <div>
              <p className="text-surface-900/40 dark:text-white/30 text-xs uppercase tracking-wide mb-1">Description</p>
              <p className="text-surface-900 dark:text-white/90 whitespace-pre-wrap leading-relaxed">{viewingProposal.description}</p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-surface-900/40 dark:text-white/30 mb-1.5">Status</label>
              <select
                value={viewingProposal.status}
                onChange={(e) => handleUpdateProposalStatus(viewingProposal.id!, e.target.value as ProposalStatus)}
                className="w-full rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {(Object.keys(STATUS_LABELS) as ProposalStatus[]).map((status) => (
                  <option key={status} value={status}>{STATUS_LABELS[status]}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProposalsManagement;
