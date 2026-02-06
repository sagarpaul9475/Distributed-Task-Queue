const API = "http://localhost:3000/api";

// Submit workflow
async function submitWorkflow(v) {
  await fetch(`${API}/tasks`, {
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      type:"workflow",
      payload:{ version:v }
    })
  });
  loadTasks();
}

// Submit command
async function submitCmd() {
  const cmd = document.getElementById("cmd").value;

  await fetch(`${API}/tasks`, {
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      type:"cmd",
      payload:{ cmd }
    })
  });
  loadTasks();
}


// Load tasks
async function loadTasks() {
  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();

  const body = document.querySelector("#taskTable tbody");
  body.innerHTML = "";

  tasks.forEach(t=>{
    body.innerHTML += `
      <tr>
        <td>${t._id}</td>
        <td>${t.status}</td>
        <td>${t.attempts}</td>
        <td>${t.durationMs || "-"}</td>
      </tr>
    `;
  });
}


// Load metrics
async function loadMetrics() {
  const res = await fetch(`${API}/metrics`);
  const data = await res.json();
  document.getElementById("metrics").innerText =
    JSON.stringify(data,null,2);
}


// Auto refresh
setInterval(loadTasks, 3000);
