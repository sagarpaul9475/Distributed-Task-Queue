const Task = require("../models/Task");
const { exec } = require("child_process");

const MAX_WORKERS = 3;
let activeWorkers = 0;


async function runPool() {

  // Do not exceed worker limit
  if (activeWorkers >= MAX_WORKERS) return;

   const task = await Task.findOneAndUpdate(
    {
      status: "queued",
      nextRunAt: { $lte: new Date() }
    },
    {
      status: "running",
      startedAt: new Date()
    },
    { new: true }
  );

  if (!task) return;

  activeWorkers++;

  console.log(`Pool picked task ${task._id}`);

  processTask(task)
    .then(() => {
      activeWorkers--;
      runPool(); // pick next task
    })
    .catch(() => {
      activeWorkers--;
    });
}




// Execute one task





// Worker loop
async function workerLoop(id) {

  console.log("Worker", id, "started");

  setInterval(async () => {

    const now = new Date();

    const task = await Task.findOneAndUpdate(
    {
        status: "queued",
        nextRunAt: { $lte: now }
    },
    { status: "running" },
    { new: true }
    );

    if (task) {
      console.log("Worker", id, "processing task", task._id);
      await processTask(task);
    }

  }, 1000);
}


// Start pool
function startWorkers() {
  for (let i = 0; i < MAX_WORKERS; i++) {
    workerLoop(i);
  }
}

module.exports = {
  runPool,
  startWorkers
};

