const cron = require("node-cron");
const Task = require("../models/Task");

function startScheduler() {

  console.log("Scheduler started");

  // Example recurring job: every minute
  cron.schedule("* * * * *", async () => {

    await Task.create({
      type: "shell",
      payload: {
        cmd: "echo Scheduled Task Executed"
      }
    });

    console.log("Scheduled task queued");

  });

}

module.exports = startScheduler;
