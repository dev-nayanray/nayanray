import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="p-3 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 dark:from-slate-700 dark:to-slate-600"
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${i18n.language === 'en' ? 'Spanish' : 'English'}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: i18n.language === 'en' ? 0 : 180 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <FaGlobe className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
};

export default LanguageToggle;
