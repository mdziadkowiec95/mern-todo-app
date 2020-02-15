const Dashboard = require("../models/Dashboard");
const compareDates = require("../utils/compareDates");

exports.getStats = async (req, res) => {
  try {
    const userTasks = await Task.find({ user: req.user.id });
    const userDashboard = await Dashboard.findOne({ user: req.user.id });

    const stats = {
      inboxTasksCount: 0,
      activeTasksCount: 0,
      tasksDoneList: null,
      tasksOverdueList: []
    };

    if (userDashboard && userDashboard.tasksDoneList) {
      stats.tasksDoneList = userDashboard.tasksDoneList;
    }

    userTasks.forEach(task => {
      if (task.status === "inbox") stats.inboxTasksCount += 1;
      if (task.status === "active") stats.activeTasksCount += 1;

      if (task.date && compareDates.isPastDate(task.date)) {
        const overdueTask = {
          _id: task.id,
          title: task.title,
          date: task.date
        };
        stats.tasksOverdueList.push(overdueTask);
      }
    });

    res.json(stats);
  } catch (error) {
    console.error(error.message);

    res.status(500).send("Server error!");
  }
};
