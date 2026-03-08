const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', schoolRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'School Management API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

module.exports = app;
