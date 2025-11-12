# 📝 Todo List Application

A simple full-stack **Todo List App** built with **Node.js (Express)** for the backend and **HTML, CSS, JavaScript** for the frontend.

---

## 🚀 Features

✅ Add new todos  
✅ Edit existing todos  
✅ Delete todos  
✅ Mark todos as completed  
✅ Modal popup for editing  
✅ Data fetched from backend API (using Fetch API)  

---

## 🧠 Tech Stack

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript (ES6)

**Backend:**
- Node.js
- Express.js
- CORS
- Nodemon (for auto restart during development)

---

## ⚙️ Project Structure

todolist-backend/
│
├── backend/
│ ├── index.js # Express backend
│ ├── package.json
│ ├── package-lock.json
│
├── frontend/
│ ├── index.html # Main page
│ ├── style.css # UI design
│ ├── script.js # Frontend logic
│
└── README.md

---

## 🖥️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Abhigidd/todolist-backend.git
cd todolist-backend
2️⃣ Install Dependencies
npm install

3️⃣ Start the Backend Server
node index.js


or (if using nodemon)

nodemon index.js


The backend will run on:

http://localhost:3000

4️⃣ Open the Frontend

Open the file:

frontend/index.html


in your browser (or serve it via VS Code Live Server).

🧩 API Endpoints
Method	Endpoint	Description
GET	/todos	Fetch all todos
POST	/todos	Add a new todo
PUT	/todos/:id	Edit a todo
DELETE	/todos/:id	Delete a todo
