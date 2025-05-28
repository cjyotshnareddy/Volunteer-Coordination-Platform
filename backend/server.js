const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/eventRoutes');
//const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db'); // Assuming this exists for DB connection
const cron = require('node-cron');
const Event = require('./models/Event');
const User = require('./models/User');


// Load environment variables from .env file


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from the frontend
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Authentication Routes
app.use('/api/auth', authRoutes);

// User Routes (if necessary for your project)
//app.use('/api/users', userRoutes);

// Event Routes
app.use('/api/events', eventRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Volunteer Platform API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
