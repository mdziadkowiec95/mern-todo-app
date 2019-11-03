const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  // Store completed tasks dates to display in timeline
  tasksDoneList: [{ date: { type: Date, default: Date.now } }]
});

module.exports = Dashboard = mongoose.model('dashboard', DashboardSchema);
