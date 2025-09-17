const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');
// Remove the communications import from here since we're not using it at root level

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);
// Remove the communications route from here

// Add communications endpoints to the students route
const communicationsRoutes = require('./routes/communications');
app.use('/api/students', communicationsRoutes); // This will make them available at /api/students/send-email etc.

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Undergraduation.com Admin API' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});