let mongoose = require("mongoose");

let TaskSchema = mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  id: { type: String, required: true }
});

let Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
