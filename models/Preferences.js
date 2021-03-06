const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreferencesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  labels: [
    {
      name: {
        type: String
      },
      color: {
        type: String
      }
    }
  ]
});

module.exports = Preferences = mongoose.model("preferences", PreferencesSchema);
