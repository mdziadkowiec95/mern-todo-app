const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date
  }
});

TaskSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = Task = mongoose.model('task', TaskSchema);
