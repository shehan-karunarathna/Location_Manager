require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/locations', require('./routes/locations'));
app.use('/api/users', require('./routes/users'));

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT} , Successfully`));
