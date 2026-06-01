import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim()) {
      onAdd(text, category);
      setText("");
    }
  };

  const categories = ["Personal", "Work", "Urgent"];

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border border-white/10 bg-white p-4 shadow-lg dark:bg-gray-800 sm:p-5"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        {/* Todo Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          maxLength={100}
        />
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 appearance-none px-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white dark:bg-gray-700"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300">
            ▼
          </span>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add
        </button>
      </div>
    </motion.form>
  );
}

export default TodoForm;