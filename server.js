const express = require("express");
const app = express();
const tasks = require("./routes/api/tasks");
const users = require("./routes/api/users");
const preferences = require("./routes/api/preferences");
const projects = require("./routes/api/projects");
const auth = require("./routes/api/auth");
const dashboards = require("./routes/api/dashboards");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

app.use(express.json({ extended: false }));

app.use(cors()); // WARNING --- Just temporary for experimenting

// Routes
app.use("/api/tasks", tasks);
app.use("/api/users", users);
app.use("/api/preferences", preferences);
app.use("/api/projects", projects);
app.use("/api/auth", auth);
app.use("/api/dashboards", dashboards);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
