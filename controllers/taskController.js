const Task = require('../models/task');
const Employee = require('../models/user'); // Assuming you have an Employee model

exports.createTask = async (req, res) => {
  const { taskName, description, dueDate, employeeId } = req.body;

  if (!taskName || !description || !dueDate || !employeeId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Create a new task
    const newTask = new Task({
      taskName,
      description,
      dueDate,
      employeeId,
    });

    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
    const { userId, isSuperUser } = req.user;
    try {
      let tasks;
      if (isSuperUser) {
        tasks = await Task.find().populate('employeeId', 'name');
      } else {
        tasks = await Task.find({ employeeId: userId }).populate('employeeId', 'name');
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
