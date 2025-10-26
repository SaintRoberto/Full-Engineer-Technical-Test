const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To be able to read JSON from the body

// In-memory storage for tasks
// Cada tarea: { id, title, status }
let tasks = [];

// GET /tasks → List all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks → Add a task { id, title, status }
app.post("/tasks", (req, res) => {
  const { id, title, status } = req.body;

  // basic validation 
  if (!id || !title || !status) {
    return res.status(400).json({
      error: "id, title, and status are required",
    });
  }

  const alreadyExists = tasks.find((t) => t.id === id);
  if (alreadyExists) {
    return res.status(409).json({
      error: "Task with this id already exists",
    });
  }

  // Prevent duplicate titles (case-insensitive, trimmed)
  const normalized = title && String(title).trim().toLowerCase();
  const titleExists = tasks.some(
    (t) => String(t.title).trim().toLowerCase() === normalized
  );
  if (titleExists) {
    return res
      .status(409)
      .json({ error: "Task with this title already exists" });
  }

  const newTask = { id, title, status };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PATCH /tasks/:id/complete → change status = "completed"
app.patch("/tasks/:id/complete", (req, res) => {
  const { id } = req.params;

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.status = "completed";
  res.json(task);
});


// DELETE /tasks/:id -> remove a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id || t.id === Number(id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  const [removed] = tasks.splice(index, 1);
  res.json({ removed });
});

//  server start
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
