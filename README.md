# 📝 Task Manager Assignment

A simple full-stack web application that allows users to add, view, and update task statuses.  
Built with **Node.js (Express)** for the backend and **Vue 3 + Vite + TailwindCSS** for the frontend.

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/SaintRoberto/technical-test.git
cd Full-Engineer-Technical-Test
```

### 2. Run the Backend (Node.js)

```bash
cd backend
npm install
node server.js
```

The API will start on **http://localhost:3000**

Endpoints:

- `GET /tasks` → list all tasks
- `POST /tasks` → add a new task `{ id, title, status }` (validates duplicate titles)
- `PATCH /tasks/:id/complete` → mark a task as completed
- `DELETE /tasks/:id` → remove a task

### 3. Run the Frontend (Vue + Vite)

In a new terminal:

```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

Ensure the backend is running before opening the frontend.

---

## ⏱️ Time Spent

**~2.5 hours total**

- 1 h backend setup (Node.js routes + testing)
- 1 h frontend UI (Vue + Tailwind integration)
- 0.5 h polish, responsiveness, and README documentation

---

## 🧩 Design Decisions

- **Node.js + Express (Backend)**: lightweight, easy to test, and sufficient for a REST API without a database.
- **Vue 3 + Composition API**: provides a clean and reactive setup for small, component-based UIs.
- **TailwindCSS**: chosen for fast prototyping and consistent responsive design.
- **Modular structure**: `/backend` and `/frontend` are separated for clarity and simple deployment.

Additionally, it would have been ideal to **add an `api/services.js` file** on the frontend to centralize API calls (GET, POST, PATCH) instead of calling endpoints directly inside the component.  
This would make the project more modular and maintainable, especially as it scales.

It also could have included **Swagger UI documentation** on the backend to describe and test the endpoints more clearly.  
Swagger (via `swagger-ui-express` and `swagger-jsdoc`) would make the API self-documented and easy to explore for other developers.

---

## 🤖 AI Use

**Tool used:** ChatGPT (GPT-5/Claude Sonnet 3.5)

- Assisted in debugging Tailwind configuration and generating this README template.
- Helped refine responsive design and code structure explanations.
- All logic and API flow were manually implemented and adjusted by the developer.

✅ **Accepted suggestions:**

- Tailwind setup corrections
- Component layout styling improvements
- README formatting for clarity

❌ **Rejected suggestions:**

- Full auto-generated scaffolds that would reduce manual code understanding.

---

## 🚀 Improvements (If More Time)

- Add **`services.js` layer** for API calls (as noted above).
- Add **Swagger UI** for backend API documentation.
- Implement edit functionality.
- Add **local persistence** (SQLite, JSON file, or browser IndexedDB).
- Add a **configuration file** (e.g., `config.js`) to store environment variables like API URLs, instead of hardcoding them in components. This would make the application more maintainable and easier to deploy to different environments.
- Include **unit tests** (Vitest, Cypress) for backend and frontend.
- Add dark mode toggle + animations (Vue Transitions / Framer Motion).
- Deploy demo to **Vercel** (frontend) + **Render/Fly.io** (backend).

---

✅ **Result:**  
A clean, functional task manager with REST API + responsive frontend, runnable locally with minimal setup.
