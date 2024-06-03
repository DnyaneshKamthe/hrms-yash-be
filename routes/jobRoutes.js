const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const checkAuth = require("../middleware/check-auth");


router.get('/getAllJobs', jobController.getAllJobs)
router.use(checkAuth);

router.post('/postJob', jobController.createJob);


module.exports = router;
