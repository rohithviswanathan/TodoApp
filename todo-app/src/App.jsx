import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const { todos, allTodos, addTodo, toggleTodo, deleteTodo, editTodo, reorderTodos, filter, setFilter, activeCount } = useTodos();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleReorder = (newOrder) => {
    const ids = newOrder.map(t => t.id);
    const reorderedAll = [...allTodos].sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
    reorderTodos(reorderedAll);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            📝 Todo App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay organized, get things done
          </p>
        </motion.div>

        <TodoForm onAdd={addTodo} />
        <FilterBar filter={filter} setFilter={setFilter} activeCount={activeCount} total={allTodos.length} />
        <TodoList 
          todos={todos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
          onEdit={editTodo}
          onReorder={handleReorder}
        />
      </div>
    </div>
  );
}

export default App;