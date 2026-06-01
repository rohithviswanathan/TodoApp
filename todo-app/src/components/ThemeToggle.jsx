import { motion } from 'framer-motion';

function ThemeToggle({ isDark, onToggle }) {
  return (
    <motion.button
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      onClick={onToggle}
      className="fixed top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <span className="text-2xl" role="img" aria-label="light mode">☀️</span>
      ) : (
        <span className="text-2xl" role="img" aria-label="dark mode">🌙</span>
      )}
    </motion.button>
  );
}

export default ThemeToggle;