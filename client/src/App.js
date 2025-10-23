import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

// This is the base URL of our backend server
const API_URL = 'http://localhost:5001/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data); // We store the fetched tasks in our state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getTasks(); // We call the function
  }, []);

  const addTask = async (taskData) => {
    try {
      // We send the new task data to our backend API
      const response = await axios.post(API_URL, taskData);
      const newTask = response.data;

      // We add the newly created task (returned from the server) to our local tasks list
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      // We send the update request to the backend
      const response = await axios.put(`${API_URL}/${id}`, updates);
      const updatedTask = response.data;

      // We update the task in our local list
      setTasks(
        tasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      // We send the delete request to the backend
      await axios.delete(`${API_URL}/${id}`);

      // We remove the task from our local list
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error)      {
      console.error("Error deleting task:", error);
    }
  };

  // The 'getAiSuggestion' function has been completely removed

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1> 
      </header>
      <main>
        {/* We pass the addTask function down to the TaskForm as a "prop" */}
        <TaskForm onAddTask={addTask} />
        {/* The 'onGetSuggestion' prop is removed from here */}
        <TaskList
          tasks={tasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;