import React, { useState, useEffect } from 'react';
import { FaImage, FaTags, FaSearch, FaFileAlt, FaCheck } from 'react-icons/fa';
import type { BlogPost } from '../services/api';
import ImageUpload from './ui/ImageUpload';

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: BlogPost) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  'Web Development', 'WordPress', 'WooCommerce', 'React', 'TypeScript',
  'CSS', 'Performance', 'SEO', 'Tutorial', 'News', 'Opinion',
];

const BlogForm: React.FC<BlogFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Nayan Ray',
    excerpt: '',
    content: '',
    image: '',
    readTime: '',
    category: 'Web Development',
    tags: [],
    metaTitle: '',
    metaDescription: '',
    status: 'published',
    featured: false,
    ...initialData,
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        slug: initialData.slug || '',
        content: initialData.content || '',
        metaTitle: initialData.metaTitle || '',
        metaDescription: initialData.metaDescription || '',
        status: initialData.status || 'published',
        featured: initialData.featured || false,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    setFormData({ ...formData, title, slug: formData.slug || slug });
  };

  // Auto-calculate read time from content
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const readTime = wordCount > 0 ? `${Math.ceil(wordCount / 200)} min read` : '';
    setFormData({ ...formData, content, readTime: formData.readTime || readTime });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auto-generate slug if empty
    if (!formData.slug && formData.title) {
      formData.slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    // Auto-fill metaTitle if empty
    if (!formData.metaTitle && formData.title) {
      formData.metaTitle = formData.title;
    }
    // Auto-fill metaDescription if empty
    if (!formData.metaDescription && formData.excerpt) {
      formData.metaDescription = formData.excerpt.substring(0, 155);
    }
    onSubmit(formData);
  };

  // SEO score calculation
  const seoScore = (() => {
    let score = 0;
    if (formData.title && formData.title.length >= 10 && formData.title.length <= 60) score += 20;
    if (formData.slug && formData.slug.length > 0) score += 10;
    if (formData.excerpt && formData.excerpt.length >= 50 && formData.excerpt.length <= 160) score += 20;
    if (formData.metaTitle && formData.metaTitle.length <= 60) score += 15;
    if (formData.metaDescription && formData.metaDescription.length >= 50 && formData.metaDescription.length <= 160) score += 15;
    if (formData.tags && formData.tags.length >= 3) score += 10;
    if (formData.image) score += 10;
    return score;
  })();

  const seoColor = seoScore >= 80 ? 'text-emerald-500' : seoScore >= 50 ? 'text-amber-500' : 'text-rose-500';
  const seoBg = seoScore >= 80 ? 'bg-emerald-500' : seoScore >= 50 ? 'bg-amber-500' : 'bg-rose-500';

  const inputClass = "mt-1 block w-full rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 px-3.5 py-2.5 text-sm text-surface-900 dark:text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all";
  const labelClass = "block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tab navigation */}
      <div className="flex gap-1 p-1 rounded-xl bg-surface-50 dark:bg-white/5">
        {[
          { key: 'content' as const, label: 'Content', icon: FaFileAlt },
          { key: 'seo' as const, label: 'SEO', icon: FaSearch },
          { key: 'settings' as const, label: 'Settings', icon: FaTags },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-brand-500 text-white shadow-lg'
                  : 'text-surface-900/50 dark:text-white/40 hover:text-surface-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleTitleChange} required placeholder="How to Build a WooCommerce Telegram Bot" className={inputClass} />
            <p className="text-xs text-surface-900/40 dark:text-white/30 mt-1">{formData.title.length}/60 characters</p>
          </div>

          <div>
            <label className={labelClass}>Slug (URL)</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-surface-900/40 dark:text-white/30 shrink-0">/blog/</span>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="how-to-build-woocommerce-telegram-bot" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Date *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Author *</label>
              <input type="text" name="author" value={formData.author} onChange={handleChange} required className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Excerpt *</label>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required rows={2} placeholder="Short summary shown in blog cards and search results..." className={inputClass} />
            <p className="text-xs text-surface-900/40 dark:text-white/30 mt-1">{formData.excerpt.length}/160 characters (ideal for SEO)</p>
          </div>

          <div>
            <label className={labelClass}>Content (HTML or text)</label>
            <textarea name="content" value={formData.content} onChange={handleContentChange} rows={8} placeholder="<h2>Introduction</h2><p>Write your blog post content here. HTML tags are supported.</p>" className={`${inputClass} font-mono text-xs`} />
            <p className="text-xs text-surface-900/40 dark:text-white/30 mt-1">Read time auto-calculated: {formData.readTime || '—'}</p>
          </div>

          <div>
            <ImageUpload label="Featured Image *" value={formData.image} onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))} />
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <div className="space-y-4">
          {/* SEO Score */}
          <div className="p-4 rounded-xl bg-surface-50 dark:bg-white/5 border border-surface-100 dark:border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-surface-900/70 dark:text-white/60">SEO Score</span>
              <span className={`text-lg font-bold ${seoColor}`}>{seoScore}/100</span>
            </div>
            <div className="w-full h-2 bg-surface-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full ${seoBg} rounded-full transition-all duration-500`} style={{ width: `${seoScore}%` }} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Meta Title (SEO title)</label>
            <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="Auto-filled from title if empty" className={inputClass} />
            <p className="text-xs text-surface-900/40 dark:text-white/30 mt-1">{(formData.metaTitle || formData.title).length}/60 characters (Google limit)</p>
          </div>

          <div>
            <label className={labelClass}>Meta Description</label>
            <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={3} placeholder="Auto-filled from excerpt if empty. Aim for 150-160 characters." className={inputClass} />
            <p className="text-xs text-surface-900/40 dark:text-white/30 mt-1">{(formData.metaDescription || formData.excerpt).length}/160 characters (Google limit)</p>
          </div>

          <div>
            <label className={labelClass}>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
              {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClass}>Tags (min 3 for good SEO)</label>
            <div className="flex gap-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} className={inputClass} placeholder="Add tag and press Enter" />
              <button type="button" onClick={handleAddTag} className="px-3 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium shrink-0">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {formData.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="text-emerald-400 hover:text-emerald-600">&times;</button>
                </span>
              ))}
            </div>
          </div>

          {/* SEO Preview */}
          <div className="p-4 rounded-xl bg-surface-0 dark:bg-white/5 border border-surface-100 dark:border-white/10">
            <p className="text-[10px] uppercase tracking-wider text-surface-900/30 dark:text-white/30 font-bold mb-2">Google Preview</p>
            <div className="space-y-0.5">
              <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">nayanray.com › blog › {formData.slug || 'your-slug'}</p>
              <p className="text-base text-blue-700 dark:text-blue-300 font-medium truncate">{formData.metaTitle || formData.title || 'Your Title Here'}</p>
              <p className="text-xs text-surface-900/60 dark:text-white/50 line-clamp-2">{formData.metaDescription || formData.excerpt || 'Your meta description will appear here. Aim for 150-160 characters for best SEO results.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Read Time</label>
            <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} placeholder="e.g. 5 min read" className={inputClass} />
            <p className="text-xs text-surface-900/40 dark:text-white/30 mt-1">Auto-calculated from content. Override if needed.</p>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-white/5 cursor-pointer hover:bg-surface-100 dark:hover:bg-white/10 transition-colors">
            <input type="checkbox" name="featured" checked={formData.featured || false} onChange={handleChange} className="w-4 h-4 rounded accent-brand-500" />
            <div>
              <span className="text-sm font-medium text-surface-900 dark:text-white">Featured Post</span>
              <p className="text-xs text-surface-900/40 dark:text-white/30">Show this post in the featured section on the blog page</p>
            </div>
          </label>

          <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/10">
            <div className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-300 font-medium mb-2">
              <FaCheck className="w-3.5 h-3.5" />
              Summary
            </div>
            <dl className="space-y-1 text-xs text-surface-900/50 dark:text-white/40">
              <div className="flex justify-between"><dt>Title length:</dt><dd>{formData.title.length} chars</dd></div>
              <div className="flex justify-between"><dt>Excerpt length:</dt><dd>{formData.excerpt.length} chars</dd></div>
              <div className="flex justify-between"><dt>Content words:</dt><dd>{(formData.content || '').trim().split(/\s+/).filter(Boolean).length}</dd></div>
              <div className="flex justify-between"><dt>Tags:</dt><dd>{formData.tags.length}</dd></div>
              <div className="flex justify-between"><dt>Status:</dt><dd className="font-medium">{formData.status}</dd></div>
            </dl>
          </div>
        </div>
      )}

      {/* Submit buttons */}
      <div className="flex gap-2 pt-2 border-t border-surface-100 dark:border-white/5">
        <button type="button" onClick={onCancel} className="px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 text-surface-900/70 dark:text-white/60 text-sm font-medium hover:bg-surface-50 dark:hover:bg-white/5 transition-colors">Cancel</button>
        <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] transition-all">
          <FaCheck className="w-3.5 h-3.5" />
          {initialData ? 'Update Post' : 'Publish Post'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
