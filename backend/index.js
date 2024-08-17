const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

// Connect to MongoDB
connectToMongo();

const app = express();

// Use CORS to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Define your routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Set the port dynamically (use process.env.PORT for Railway or default to 5000 for local)
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`iNotebook Backend app listening on port ${port}`);
});
