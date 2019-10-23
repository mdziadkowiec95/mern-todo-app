const express = require('express');
const app = express();
const tasks = require('./routes/api/tasks');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const connectDB = require('./config/db');

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use('/api/tasks', tasks);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
