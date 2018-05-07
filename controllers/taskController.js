const Task = require('../models/Task');

exports.getTasks = (req, res) => {
    Task.find({}, (err, tasks) => {
        if (err)
            res
            .status(500)
            .json({
                success: false,
                message: "error occured while fetching tasks from database"
            });
        else {
            let filteredTasks = tasks.map(task => ({
                text: task.text,
                completed: task.completed,
                id: task.id
            }));
            res.status(200).json({
                success: true,
                tasks: filteredTasks
            });
        }
    });
}

exports.addTask = (req, res) => {
    if (req.body.text) {
        let task = new Task({
            text: req.body.text,
            completed: false,
            id: "_" +
                Math.random()
                .toString(36)
                .substr(2, 9)
        });
        task.save(err => {
            if (err)
                res
                .status(500)
                .json({
                    success: false,
                    message: "error occured while saving task in database"
                });
            else
                res
                .status(200)
                .json({
                    success: true,
                    message: "task created successfully in database"
                });
        });
    } else {
        res
            .status(400)
            .json({
                success: false,
                message: "task description in required to create task"
            });
    }
}
exports.deleteTask = (req, res) => {
    console.log("req body", req.body);
    if (req.body.id) {
        Task.findOneAndRemove({
            id: req.body.id
        }, err => {
            if (err)
                res
                .status(500)
                .json({
                    success: false,
                    message: "error occured while removing task from database"
                });
            else
                res
                .status(200)
                .json({
                    success: true,
                    message: "task has been removed successfully"
                });
        });
    } else {
            res
            .status(400)
            .json({
                success: false,
                message: "task index is required to remove task"
            });
    }
}
exports.updateTaskStatus = (req, res) => {
    if (req.body.id) {
        Task.findOneAndUpdate({
            id: req.body.id
        }, {
            completed: true
        }, err => {
            console.log(err);
            if (err)
                res
                .status(500)
                .json({
                    success: false,
                    message: "error occured while updating task status"
                });
            else
                res
                .status(200)
                .json({
                    success: true,
                    messgae: "task is marked as completed successfully"
                });
        });
    } else {
            res
            .status(400)
            .json({
                success: true,
                message: "task index is required to remove task"
            });
    }
}