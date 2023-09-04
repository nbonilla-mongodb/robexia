const express = require('express');
const robexiaCall = require('./robexiaCall');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
