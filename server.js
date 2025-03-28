const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const setupSwagger = require('./swagger');

// Load environment variables
dotenv.config();



// Import routes
const authRoutes = require('./router/authRoutes');
const formRoutes = require('./router/formRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Swagger
setupSwagger(app);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Contact Form API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});



// Start server
const PORT = process.env.PORT || 5000;
console.log(`Server running on port localhost:${PORT}`);
app.listen(PORT);
