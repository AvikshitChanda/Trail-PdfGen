const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const documentRoutes = require('./routes/documentRoutes');  // Import routes

const app = express();
const port = 5000;

// Middleware
app.use(cors());  // Enable CORS if frontend and backend are on different ports
app.use(bodyParser.json());  // To parse JSON request bodies

// Routes
app.use('/api', documentRoutes);  // Use the routes from documentRoutes.js

// Serve static files (for generated PDFs)
app.use('/documents', express.static('documents'));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
