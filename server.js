const express = require('express');
const app = express();
const task = require('./routes/task');
const connectDB = require('./config/db');

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use('/api/task', task);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
