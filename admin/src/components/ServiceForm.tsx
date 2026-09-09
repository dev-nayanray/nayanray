import React, { useState, useEffect } from 'react';
import type { Service } from '../services/api';

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: Service) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Service>({
    title: '',
    description: '',
    icon: '',
    features: [],
    ...initialData,
  });

  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feature),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">Features</label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className="flex-grow rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
            placeholder="Add feature"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
            >
              {feature}
              <button
                type="button"
                onClick={() => handleRemoveFeature(feature)}
                className="ml-1 text-violet-500 hover:text-violet-700 focus:outline-none dark:text-violet-300 dark:hover:text-violet-100"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
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

export default ServiceForm;
