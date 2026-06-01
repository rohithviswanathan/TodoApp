import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const categoryColors = {
    Personal: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    Work: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    Urgent: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  };

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-3 ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ☰
        </button>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 accent-blue-600 cursor-pointer"
        />
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            />
            <button onClick={handleEdit} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
          </div>
        ) : (
          <>
            <span 
              className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'dark:text-white'}`}
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.text}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${categoryColors[todo.category]}`}>
              {todo.category}
            </span>
          </>
        )}
      </div>
      <button 
        onClick={() => onDelete(todo.id)} 
        className="ml-3 text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2"
      >
        ✕
      </button>
    </motion.div>
  );
}

export default TodoItem;