const express=require('express');
const router=express.Router();
const {getTasks,addTask,deleteTask,updateTaskStatus}=require('../controllers/taskController');

router.get('/tasks',getTasks);
router.post('/addTask',addTask);
router.delete('/deleteTask',deleteTask);
router.put('/updateTaskStatus',updateTaskStatus);

module.exports=router;