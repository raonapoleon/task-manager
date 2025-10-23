import React, { useState } from 'react';
import './TaskForm.css';

// We now accept a prop called `onAddTask`. This is the function from App.js.
const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert('Please enter a task title.');
      return;
    }

    // Instead of console.log, we now call the function from our parent (App.js)
    // and pass the new task data to it.
    onAddTask({ title });

    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Enter new task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="submit-btn">Add Task</button>
    </form>
  );
};

export default TaskForm;