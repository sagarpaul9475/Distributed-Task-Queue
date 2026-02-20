# 🚀 Distributed Task Queue with Worker Pool

A scalable background task processing system built using Node.js, Express, MongoDB, and Shell Workflows. This project simulates a production-grade distributed task engine similar to Celery, Temporal, or AWS SQS Workers, built completely from scratch.

# 📌 Features

✅ REST API for task submission & monitoring

✅ MongoDB persistence for tasks & execution history

✅ Worker pool with configurable parallelism

✅ Workflow versioning using Git branches

✅ Shell-based workflow execution

✅ Smart retries with exponential backoff + jitter

✅ Cron-based scheduled recurring tasks

✅ Task metrics & monitoring endpoint

✅ Execution duration tracking

✅ Fully demo-ready HTML dashboard

# 🏗 Architecture Overview

Client (UI / Postman) \
        ↓ \
Express REST API \
        ↓ \
MongoDB (Task Storage) \
        ↓ \
Worker Pool (Concurrent Execution) \
        ↓ \
Shell Workflows (v1 / v2) \
        ↓ \
Execution History + Metrics

# 🔄 System Workflow

## 1️⃣ Task Submission

POST /api/tasks

Example:

{ \
  "type": "workflow", \
  "payload": { \
    "version": "v1" \
  } \
}

The server:
* Stores the task in MongoDB

* Marks status as queued

* Sets retry configuration

## 2️⃣ Worker Processing

* Worker pool checks for queued tasks

* Limits execution using MAX_WORKERS

* Updates status to running

* Executes shell command or workflow

## 3️⃣ Success Path

* Status → success

* Stores execution result

* Records duration

* Adds execution history

## 4️⃣ Failure + Smart Retry
If task fails:
* Uses exponential backoff: \
delay = 2^attempt * 1000 + jitter
* Reschedules task
* Stops after max attempts
* Marks as failed

## 5️⃣ Scheduler

Recurring tasks are created automatically using cron scheduling.

## 6️⃣ Metrics
GET /api/metrics

Provides:
* Total tasks
* Success count
* Failure count
* Running tasks
* Average execution time

# 🧠 Why This Project?

In real-world systems:

* Emails are sent in background

* Reports are generated asynchronously

* Video encoding runs as jobs

* AI training tasks run separately

This system demonstrates how background job processing works in production environments.

# 📂 Project Structure

Distributed-Task-Queue/ \
│ \
├── config/ \
│   └── db.js \
│ \
├── models/ \
│   └── Task.js \
│ \
├── routes/ \
│   ├── taskRoutes.js \
│   └── metricsRoutes.js \
│ \
├── scheduler/ \
│   └── taskScheduler.js \
│ \
├── workers/ \
│   └── workerPool.js \
│ \
├── workflows/ \
│   ├── v1/sample.sh \
│   └── v2/sample.sh \
│ \
├── public/        (HTML Dashboard) \
├── server.js \
└── package.json

# ⚙️ Installation

## 1️⃣ Clone Repository
* git clone https://github.com/your-username/distributed-task-queue.git
* cd distributed-task-queue
## 2️⃣ Install Dependencies
* npm install
## 3️⃣ Configure Environment Variables
Create .env file: \
PORT=3000 \
MONGO_URI=your_mongodb_connection_string
## 4️⃣ Run Server
npm run dev \
Server runs on: \
http://localhost:3000

# 🖥 Demo Dashboard

Open: \
http://localhost:3000

Features:

* Run workflow v1 / v2

* Run custom shell commands

* View live task status

* Monitor metrics

* Auto-refresh task list

# 🧪 Example API Usage
### Submit Workflow
{ \
  "type": "workflow", \
  "payload": { \
    "version": "v2" \
  } \
}

### Submit Custom Command

{ \
  "type": "cmd", \
  "payload": { \
    "cmd": "echo Hello World" \
  } \
}

# 🔐 Security Note

#### ⚠️ Custom command execution can be dangerous in production.

In real systems, we would:

* Whitelist commands

* Use container sandboxing

* Implement role-based access control

* Restrict file system permissions

# 🌍 Deployment

#### This project can be deployed on:

* Render

* Railway

* AWS EC2

* DigitalOcean

* Any VPS with Node.js

-> MongoDB Atlas is recommended for cloud database hosting.

# 📈 Scalability

#### To scale this system:

* Increase MAX_WORKERS

* Deploy multiple server instances

* Use Redis or message brokers

* Containerize using Docker

* Use Kubernetes for orchestration

# 🏆 Technologies Used

* Node.js

* Express.js

* MongoDB

* Mongoose

* Cron Scheduler

* Shell scripting

* Git (workflow versioning)

* HTML/CSS Dashboard

# 🎯 Learning Outcomes

#### This project demonstrates:

* Background job processing

* Distributed worker architecture

* Concurrency control

* Retry strategies

* Observability & monitoring

* Production-grade async systems

# 👨‍💻 Team & Contributions

* SAGAR PAUL -  Server Connect & Core Logic of WorkPool or task Queue.
* SANJAY KUMAR PANDEY - client side rendering and handled connection of clinet and server.
* SATYAM KUMAR - Routes of both metrics and task.
* SHOBHIT BHARDWAJ - MongoDB and DB connnection ,DB Schema Making.
* SAKSHAM SINGH- workflow of shell scrpits and schedular logic.

Computer Science Engineers \
Distributed Task Queue System