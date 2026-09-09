import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaStar, FaSearch, FaImage } from 'react-icons/fa';
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
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'featured'>('all');

  const filtered = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchBlog.toLowerCase()) ||
      post.author.toLowerCase().includes(searchBlog.toLowerCase()) ||
      post.category.toLowerCase().includes(searchBlog.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'featured' && post.featured) ||
      (filterStatus === 'published' && post.status !== 'draft') ||
      (filterStatus === 'draft' && post.status === 'draft');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Blog Posts</h2>
          <p className="text-xs text-surface-900/40 dark:text-white/40 mt-0.5">
            {blogPosts.length} total · {blogPosts.filter((p) => p.status !== 'draft').length} published · {blogPosts.filter((p) => p.featured).length} featured
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all whitespace-nowrap"
        >
          <FaPlus className="w-3 h-3" />
          New Post
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-900/30 dark:text-white/30" />
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchBlog}
            onChange={(e) => setSearchBlog(e.target.value)}
            aria-label="Search blog posts"
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-surface-50 dark:bg-white/5">
          {[
            { key: 'all' as const, label: 'All' },
            { key: 'published' as const, label: 'Published' },
            { key: 'draft' as const, label: 'Drafts' },
            { key: 'featured' as const, label: 'Featured' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterStatus(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterStatus === f.key
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-surface-900/50 dark:text-white/40 hover:text-surface-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
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
            <FaImage className="w-6 h-6 text-surface-900/30 dark:text-white/30" />
          </div>
          <p className="text-surface-900/40 dark:text-white/40 text-sm">
            {searchBlog || filterStatus !== 'all' ? 'No posts match your filters.' : 'No blog posts yet. Create one to get started.'}
          </p>
        </div>
      )}

      {/* Blog posts grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid gap-3">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="group flex items-center gap-4 p-4 bg-surface-0 dark:bg-surface-900/60 rounded-2xl border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-100 dark:bg-white/5 shrink-0">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <FaImage className="w-4 h-4 text-surface-900/20 dark:text-white/20" />
                  </div>
                )}
                {post.featured && (
                  <div className="absolute top-0.5 right-0.5">
                    <FaStar className="w-3 h-3 text-amber-400 fill-current" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-surface-900 dark:text-white truncate">{post.title}</h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-surface-900/40 dark:text-white/40">{post.author}</span>
                  <span className="text-xs text-surface-900/20 dark:text-white/20">·</span>
                  <span className="text-xs text-surface-900/40 dark:text-white/40">{post.date}</span>
                  <span className="text-xs text-surface-900/20 dark:text-white/20">·</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-300 text-[10px] font-medium">
                    {post.category}
                  </span>
                  {post.status === 'draft' && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-medium">
                      Draft
                    </span>
                  )}
                </div>
              </div>

              {/* Tags count */}
              {post.tags && post.tags.length > 0 && (
                <div className="hidden sm:block text-xs text-surface-900/30 dark:text-white/30 shrink-0">
                  {post.tags.length} tag{post.tags.length > 1 ? 's' : ''}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openEditModal(post)}
                  className="p-2 rounded-lg bg-surface-50 dark:bg-white/5 text-surface-900/50 dark:text-white/40 hover:text-brand-600 dark:hover:text-brand-300 hover:bg-brand-500/10 transition-all"
                  title="Edit post"
                >
                  <FaEdit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteBlogPost(post.id!)}
                  className="p-2 rounded-lg bg-surface-50 dark:bg-white/5 text-surface-900/50 dark:text-white/40 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                  title="Delete post"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingBlogPost ? 'Edit Blog Post' : 'Add Blog Post'}>
        <BlogForm
          key={editingBlogPost?.id ?? 'new'}
          initialData={editingBlogPost || undefined}
          onSubmit={handleSaveBlogPost}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default BlogManagement;
