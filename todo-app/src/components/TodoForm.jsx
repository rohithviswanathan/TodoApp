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
          maxLength={100}
          className="h-12 w-full rounded-xl border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white md:flex-1 md:text-base"
        />

        {/* Category Select */}
        <div className="relative w-full md:w-44">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-gray-300 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white md:text-base"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-blue-600 px-6 text-sm font-medium text-white transition-all hover:bg-blue-700 active:scale-[0.98] md:w-auto md:min-w-[110px] md:text-base"
        >
          Add Todo
        </button>
      </div>
    </motion.form>
  );
}

export default TodoForm;