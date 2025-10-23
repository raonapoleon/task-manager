// 1. Import Dependencies
// We are importing the tools we installed earlier.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the variables from our future .env file
const taskRoutes = require('./routes/tasks');

// 2. Initialize Express App
// This creates our main application server.
const app = express();
const PORT = process.env.PORT || 5001; // We'll set the PORT in our .env file, or use 5001 as a default

// 3. Middleware
// These are functions that run on every request.
app.use(cors()); // Enable Cross-Origin Resource Sharing so our frontend can talk to our backend
app.use(express.json()); // Allow the server to accept and understand JSON data

// 4. Connect to MongoDB
// We'll get the connection string from our .env file.
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

// 5. Basic Test Route
// This is a simple route to make sure our server is running correctly.
app.get('/', (req, res) => {
  res.send('AI Task Assistant Server is up and running!');
});

app.use('/api/tasks', taskRoutes);

// 6. Start the Server
// This tells our server to start listening for requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});