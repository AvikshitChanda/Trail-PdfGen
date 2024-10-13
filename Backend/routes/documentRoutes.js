const express = require('express');
const { generateDivorceDocument } = require('../controllers/documentController');

const router = express.Router();

// POST route to generate the divorce document
router.post('/generate-divorce-document', (req, res, next) => {
  console.log('API endpoint hit: /generate-divorce-document'); // Log when the route is accessed
  next(); // Move to the next middleware
}, generateDivorceDocument);

module.exports = router;
