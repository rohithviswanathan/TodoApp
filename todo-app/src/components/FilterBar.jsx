import { motion } from 'framer-motion';

function FilterBar({ filter, setFilter, activeCount, total }) {
  const filters = ['all', 'active', 'completed'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4"
    >
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize font-medium transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
      </p>
    </motion.div>
  );
}

export default FilterBar;