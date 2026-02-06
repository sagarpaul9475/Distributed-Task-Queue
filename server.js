require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const startScheduler = require("./scheduler/taskScheduler");
const { startWorkers, runPool } = require("./workers/workerPool");


// setInterval(() => {
//   runPool();
// }, 1000);


startScheduler();


startWorkers();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/metrics", metricsRoutes);
app.use(express.static("public"));
// DB Connect
connectDB();

// Routes
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
