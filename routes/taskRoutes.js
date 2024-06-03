const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const taskController = require('../controllers/taskController');

router.use(checkAuth);

// Create Task route
router.post('/createTasks', taskController.createTask);

// get all tasks
router.get('/getAllTasks', taskController.getTasks);


module.exports = router;
