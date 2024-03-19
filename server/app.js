const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { mongoose } = require('./db/mongoose');
const userRoutes = require('./routes/user.routes'); // Import user routes
const todoRoutes = require('./routes/todo.routes'); // Import todo routes

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
