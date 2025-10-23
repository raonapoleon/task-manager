const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import our Task model

// --- CREATE ---
// Route: POST /api/tasks
// Description: Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new task instance based on our model
    const newTask = new Task({
      title,
      description,
    });

    // Save the new task to the database
    const savedTask = await newTask.save();
    res.status(201).json(savedTask); // Send back the created task
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// --- READ ---
// Route: GET /api/tasks
// Description: Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Find all tasks in the database
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// --- UPDATE ---
// Route: PUT /api/tasks/:id
// Description: Update a task (e.g., mark as complete)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true } // This option returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// --- DELETE ---
// Route: DELETE /api/tasks/:id
// Description: Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

// --- AI SUGGESTION ROUTE HAS BEEN COMPLETELY REMOVED ---

module.exports = router; // Export the router