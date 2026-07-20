import React, { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import type { Project } from '../services/api';
import ImageUpload from './ui/ImageUpload';

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Project) => void;
  onCancel: () => void;
}

const MAX_IMAGES = 8;

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    images: [],
    liveLink: '',
    githubLink: '',
    technologies: [],
    category: '',
    icon: '',
    gradient: '',
    featured: false,
    ...initialData,
  });

  const [techInput, setTechInput] = useState('');
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleAddImage = (url: string) => {
    if (!url || formData.images.length >= MAX_IMAGES) return;
    setImageError('');
    setFormData({ ...formData, images: [...formData.images, url] });
  };

  const handleReplaceImage = (index: number, url: string) => {
    const next = [...formData.images];
    next[index] = url;
    setFormData({ ...formData, images: next });
  };

  const handleRemoveImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const handleMoveImage = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= formData.images.length) return;
    const next = [...formData.images];
    [next[index], next[target]] = [next[target], next[index]];
    setFormData({ ...formData, images: next });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      setImageError('Add at least one image before saving.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm font-medium text-surface-900/70 dark:text-white/60">
            Images <span className="font-normal text-surface-900/40 dark:text-white/30">({formData.images.length}/{MAX_IMAGES})</span>
          </span>
        </div>
        <p className="mb-3 text-xs text-surface-900/50 dark:text-white/40">
          The first image is the cover shown in listings. Visitors can scroll through all of them on the project card.
        </p>

        <div className="space-y-4">
          {formData.images.map((url, index) => (
            <div key={index}>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-xs font-medium text-surface-900/50 dark:text-white/40">
                  {index === 0 ? 'Cover image' : `Image ${index + 1}`}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, -1)}
                    disabled={index === 0}
                    aria-label="Move up"
                    className="rounded p-1 text-surface-900/40 hover:bg-surface-50 hover:text-surface-900 disabled:pointer-events-none disabled:opacity-30 dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    <FaChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, 1)}
                    disabled={index === formData.images.length - 1}
                    aria-label="Move down"
                    className="rounded p-1 text-surface-900/40 hover:bg-surface-50 hover:text-surface-900 disabled:pointer-events-none disabled:opacity-30 dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    <FaChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <ImageUpload
                value={url}
                onChange={(newUrl) => (newUrl ? handleReplaceImage(index, newUrl) : handleRemoveImage(index))}
              />
            </div>
          ))}

          {formData.images.length < MAX_IMAGES && (
            <ImageUpload
              label={formData.images.length === 0 ? 'Cover image' : `Image ${formData.images.length + 1}`}
              value=""
              onChange={(newUrl) => handleAddImage(newUrl)}
            />
          )}
        </div>
        {imageError && <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">{imageError}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Live Link</label>
        <input
          type="url"
          name="liveLink"
          value={formData.liveLink}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">GitHub Link</label>
        <input
          type="url"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Technologies</label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="flex-grow rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
            placeholder="Add technology"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="ml-1 text-brand-500 hover:text-brand-700 focus:outline-none dark:text-brand-300 dark:hover:text-brand-100"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Icon</label>
        <input
          type="text"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          required
          placeholder="e.g. FaCode"
          className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Gradient</label>
        <input
          type="text"
          name="gradient"
          value={formData.gradient}
          onChange={handleChange}
          required
          placeholder="e.g. from-blue-500 to-cyan-500"
          className="mt-1 block w-full rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          checked={formData.featured}
          onChange={handleChange}
          className="h-4 w-4 rounded border-surface-100 text-brand-600 focus:ring-brand-500 dark:border-white/20 dark:bg-white/5"
        />
        <label htmlFor="featured" className="text-sm font-medium text-surface-900/70 dark:text-white/60">
          Featured
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-surface-100 text-surface-900/70 hover:bg-surface-50 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 shadow-glow"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
