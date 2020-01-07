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
const path = require("path");

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

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
