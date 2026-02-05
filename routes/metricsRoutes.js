const express = require("express");
const router = express.Router();
const Task = require("../models/Task");


// System metrics
router.get("/", async (req, res) => {

  const total = await Task.countDocuments();

  const success = await Task.countDocuments({ status: "success" });

  const failed = await Task.countDocuments({ status: "failed" });

  const avgDuration = await Task.aggregate([
    { $match: { durationMs: { $exists: true } } },
    { $group: { _id: null, avg: { $avg: "$durationMs" } } }
  ]);

  res.json({
    totalTasks: total,
    successTasks: success,
    failedTasks: failed,
    averageDurationMs: avgDuration[0]?.avg || 0
  });

});

module.exports = router;
