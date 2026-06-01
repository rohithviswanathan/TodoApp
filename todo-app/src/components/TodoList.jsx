import { motion, AnimatePresence } from 'framer-motion';
import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit, onReorder }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = todos.findIndex(t => t.id === active.id);
      const newIndex = todos.findIndex(t => t.id === over.id);
      const newOrder = arrayMove(todos, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-gray-500 dark:text-gray-400"
      >
        <p className="text-xl">🎉 No todos yet!</p>
        <p className="mt-2">Add your first task above.</p>
      </motion.div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="space-y-1">
        <AnimatePresence>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </AnimatePresence>
      </div>
    </DndContext>
  );
}

export default TodoList;