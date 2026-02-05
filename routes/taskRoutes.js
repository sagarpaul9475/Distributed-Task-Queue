const express = require("express");
const router = express.Router();
const Task = require("../models/Task");


// Submit new task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({
      type: req.body.type,
      payload: req.body.payload
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});


// Get task by ID
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

module.exports = router;
