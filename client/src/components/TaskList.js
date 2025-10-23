import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

// Remove 'onGetSuggestion' from the props
const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          // The 'onGetSuggestion' prop is removed from here
        />
      ))}
    </div>
  );
};

export default TaskList;