const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  labels: {
    type: [String],
    validate: {
      validator: function(l) {
        return l.length <= 3;
      },
      message: 'Single task can have max 3 labels!'
    }
  },
  project: {
    type: String
  },
  priority: {
    type: String,
    default: 'normal' // ['low', 'normal', 'high']
  },
  status: {
    type: String,
    default: 'inbox' // ['inbox', 'active']
  }
});

// TaskSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = Task = mongoose.model('task', TaskSchema);
