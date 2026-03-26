const Task = require("../models/Task");
const { exec } = require("child_process");

const MAX_WORKERS = 3;
let activeWorkers = 0;

//Execute one task and immediately pick the next one without waiting for the interval
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
async function processTask(task) {

  task.status = "running";
  task.startedAt = new Date();
  task.attempts += 1;

  await task.save();
  runPool(); // launch next task immediately

  return new Promise((resolve) => {

    // Example shell execution
    const path = require("path");

let command;

if (task.payload.version) {

    const workflowPath = path.join(
        __dirname,
        `../workflows/${task.payload.version}/sample.sh`
    );

    command = `bash "${workflowPath}"`;

} else {
    command = task.payload.cmd; // fallback
}
    exec(command, async (err, stdout, stderr) => {

      if (err) {

        if (task.attempts < task.maxAttempts) {

            const baseDelay = Math.pow(2, task.attempts) * 1000;

            const jitter = Math.random() * 1000;

            const delay = baseDelay + jitter;

            task.status = "queued";
            task.nextRunAt = new Date(Date.now() + delay);

            task.error = stderr;

            console.log("Retry scheduled in", delay, "ms");

        } else {

            task.status = "failed";
            task.error = stderr;

        }

    }
 else {
        task.status = "success";
        task.result = stdout;
      }

      task.finishedAt = new Date();
      task.durationMs = task.finishedAt - task.startedAt;

      task.history.push({
        attempt: task.attempts,
        timestamp: new Date(),
        status: task.status,
        message: task.status === "success" ? stdout : stderr
      });

      await task.save();
      resolve();
    });

  });
}


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

