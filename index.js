let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let Task = require("./models/Task");
mongoose.connect("mongodb://localhost:27017/todoapp");
let app = express();
let counter = 0;
app.use(bodyParser.json({ extended: false }));

app.post("/addTask", (req, res) => {
  if (req.body.text) {
    let task = new Task({
      text: req.body.text,
      completed: false,
      index: counter++
    });
    task.save(err => {
      if (err) res.send("error occured while creating task in database");
      else res.send("task created successfully in database");
    });
  } else {
    res.send("task description in required to create task");
  }
});

app.get("/tasks", (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) res.send("error occured while fetching tasks from database");
    else {
      let filteredTasks = tasks.map(task => ({
        text: task.text,
        completed: task.completed,
        index: task.index
      }));
      res.json(filteredTasks);
    }
  });
});
app.delete("/deleteTask", (req, res) => {
  console.log("req body", req.body);
  if (req.body.index) {
    Task.findOneAndRemove({ index: req.body.index }, err => {
      if (err) res.send("error occured while removing task from database");
      else res.send("task has been removed successfully");
    });
  } else {
    res.send("task index is required to remove task");
  }
});

app.put("/updateTaskStatus", (req, res) => {
  if (req.body.index) {
    Task.findOneAndUpdate(
      { index: req.body.index },
      { completed: true },
      err => {
          console.log(err);
        if (err) res.send("error occured while updating task status");
        else res.send("task is marked as completed successfully");
      }
    );
  } else {
    res.send("task index is required to remove task");
  }
});
app.listen(3001, () => console.log("server is running on port 3001"));
