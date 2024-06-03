const Job = require("../models/job")

exports.createJob = async (req, res) => {
  const { jobTitle, jobDescription, location, salary } = req.body;
  const { isSuperUser } = req.user;

  if (!isSuperUser) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const newJob = new Job({
      jobTitle,
      jobDescription,
      location,
      salary,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to fetch all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};