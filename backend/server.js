const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Use apiRoutes for handling ticket-related routes
app.use('/api', apiRoutes);

// Testing endpoint to check if backend is running
app.get('/', (req, res) => {
  return res.json("From Backend Side");
});

// Set up a route to get all tickets directly if needed
app.get('/tickets', (req, res) => {
  const sql = "SELECT * FROM tickets";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Start the server on a specific port
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
