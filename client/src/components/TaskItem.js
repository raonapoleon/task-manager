import React, { useState } from 'react';
import './TaskItem.css';

// Remove 'onGetSuggestion' from the props
const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  // Remove 'isGenerating' state
  const [isDeleting, setIsDeleting] = useState(false);

  const handleComplete = () => {
    onUpdateTask(task._id, { isCompleted: !task.isCompleted });
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleAnimationEnd = () => {
    if (isDeleting) {
      onDeleteTask(task._id);
    }
  };

  return (
    <div
      className={`task-item ${task.isCompleted ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {/* We've removed the 'task-content' wrapper and 'ai-suggestion' div */}
      <p className="task-title">{task.title}</p>
      
      <div className="task-actions">
        {/* We've removed the 'Get Tip' button */}
        <button onClick={handleComplete} className="complete-btn">
          {task.isCompleted ? 'Undo' : 'Complete'}
        </button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;