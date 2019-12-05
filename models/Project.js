const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  color: {
    type: String,
    required: true
  }
});

module.exports = Project = mongoose.model("project", ProjectSchema);
