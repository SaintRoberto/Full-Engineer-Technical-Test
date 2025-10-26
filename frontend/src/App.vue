<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
      <!-- Header -->
      <h1 class="text-3xl font-extrabold text-center text-gray-900">Task Manager</h1>
      <p class="text-gray-500 text-center mt-1 mb-6">Keep track of your tasks</p>

      <!-- Form Component -->
      <TaskForm :on-submit="addTask" :error="errorMessage" />

      <!-- Task List Component -->
      <TaskList 
        :tasks="tasks" 
        @toggle-task="toggleTask" 
      />
    </div>

    <!-- Footer -->
    <footer class="text-gray-400 text-sm mt-6">
      by Roberto Luna
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref([]);
const errorMessage = ref('')
const API_URL = "http://localhost:3000/tasks";

const loadTasks = async () => {
  const res = await fetch(API_URL);
  tasks.value = await res.json();
};

const addTask = async (title) => {
  errorMessage.value = ''
  if (!title) return

  // client-side duplicate title check (case-insensitive)
  const exists = tasks.value.some(t => String(t.title).trim().toLowerCase() === title.toLowerCase())
  if (exists) {
    errorMessage.value = 'There is already a task with that title.'
    return
  }

  const task = {
    id: Date.now().toString(),
    title,
    status: "pending",
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (res.status === 409) {
      // server-side duplicate check
      const body = await res.json().catch(() => ({}))
      errorMessage.value = body.error || 'A task with that title already exists.'
      return
    }

    if (!res.ok) {
      errorMessage.value = 'Error creating task.'
      return
    }

    await loadTasks();
  } catch (e) {
    console.error(e)
    errorMessage.value = 'Error creating task.'
  }
};

const toggleTask = async (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (!task) return;

  if (task.status === 'pending') {
    // Mark as completed on server
    await fetch(`${API_URL}/${id}/complete`, { method: 'PATCH' });

    // After 3 seconds delete from server and refresh list
    setTimeout(async () => {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      } catch (e) {
        console.error('Failed to delete task after complete', e);
      } finally {
        await loadTasks();
      }
    }, 1100);
  }
  // Refresh immediately to reflect the 'completed' badge if needed
  await loadTasks();
};

onMounted(() => loadTasks());
</script>
