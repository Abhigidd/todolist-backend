// Elements
const todoContainer = document.getElementById("todo-container");
const inputTodo = document.getElementById("input-todo");
const todoForm = document.getElementById("todo-form");

const modalBG = document.getElementById("modal-background");
const closeModalBtn = document.getElementById("close-modal");
const editTodoName = document.getElementById("edit-todo-name");
const editTodoCompleted = document.getElementById("edit-todo-completed");
const saveTodo = document.getElementById("save-todo");

const URL = "http://localhost:3000/todos";

let todoArray = [];
let editingTodo = null; // holds the todo object currently being edited

/* ---------------------- API helpers ---------------------- */

async function get_Todos() {
  try {
    const resp = await fetch(URL);
    if (!resp.ok) throw new Error("Failed to fetch todos");
    return await resp.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function post_Todo(name) {
  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, completed: false }),
    });
    if (!resp.ok) throw new Error("Failed to create todo");
    return await resp.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function del_Todo(todoId) {
  try {
    const resp = await fetch(`${URL}/${todoId}`, { method: "DELETE" });
    if (!resp.ok) throw new Error("Delete failed");
    return await resp.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function edit_Todo(todoId, name, completed) {
  try {
    const resp = await fetch(`${URL}/${todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, completed }),
    });
    if (!resp.ok) throw new Error("Edit failed");
    return await resp.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

/* ---------------------- UI rendering ---------------------- */

function display_Todos(todoArr) {
  // clear old
  todoContainer.innerHTML = "";

  if (!Array.isArray(todoArr) || todoArr.length === 0) {
    todoContainer.innerHTML = `<p style="opacity:0.7">No todos yet</p>`;
    return;
  }

  todoArr.forEach((todoElem) => {
    // Parent
    let todo = document.createElement("div");
    todo.classList.add("todo");

    // Left: info
    let todoInfo = document.createElement("div");
    todoInfo.classList.add("todo-info");

    let todoCompleted = document.createElement("input");
    todoCompleted.classList.add("todo-completed");
    todoCompleted.setAttribute("type", "checkbox");
    todoCompleted.checked = !!todoElem.completed;

    let todoName = document.createElement("p");
    todoName.classList.add("todo-name");
    todoName.textContent = todoElem.name;

    // Right: buttons
    let todoBtn = document.createElement("div");
    todoBtn.classList.add("todo-btn");

    let todoEdit = document.createElement("button");
    todoEdit.classList.add("todo-edit");
    todoEdit.textContent = "Edit";

    let todoDel = document.createElement("button");
    todoDel.classList.add("todo-delete");
    todoDel.textContent = "Delete";

    // append
    todoInfo.appendChild(todoCompleted);
    todoInfo.appendChild(todoName);

    todoBtn.appendChild(todoEdit);
    todoBtn.appendChild(todoDel);

    todo.appendChild(todoInfo);
    todo.appendChild(todoBtn);

    // Events:

    // toggle completed (update server)
    todoCompleted.addEventListener("change", async () => {
      await edit_Todo(todoElem._id || todoElem.id, todoElem.name, todoCompleted.checked);
      // refresh list from server
      await refreshAndRender();
    });

    // open modal to edit
    todoEdit.addEventListener("click", (e) => {
      e.preventDefault();
      open_Modal(todoElem);
    });

    // delete
    todoDel.addEventListener("click", async () => {
      if (!confirm("Delete this todo?")) return;
      await del_Todo(todoElem._id || todoElem.id);
      await refreshAndRender();
    });

    todoContainer.appendChild(todo);
  });
}

/* ---------------------- Modal & form logic ---------------------- */

function open_Modal(todoElem) {
  editingTodo = todoElem;
  editTodoName.value = todoElem.name;
  editTodoCompleted.checked = !!todoElem.completed;
  modalBG.style.display = "block";

  // replace previous handlers by assigning onclick (prevents duplicates)
  closeModalBtn.onclick = () => {
    modalBG.style.display = "none";
    editingTodo = null;
  };

  saveTodo.onclick = async () => {
    const newName = editTodoName.value.trim();
    const newCompleted = editTodoCompleted.checked;
    if (!newName) {
      alert("Name cannot be empty");
      return;
    }
    await edit_Todo(editingTodo._id || editingTodo.id, newName, newCompleted);
    modalBG.style.display = "none";
    editingTodo = null;
    await refreshAndRender();
  };
}

document.addEventListener("click", (e) => {
  // close when clicking outside the modal card
  if (e.target === modalBG) {
    modalBG.style.display = "none";
    editingTodo = null;
  }
});

/* ---------------------- Main form submit ---------------------- */

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = inputTodo.value.trim();
  if (!name) return;
  await post_Todo(name);
  inputTodo.value = "";
  await refreshAndRender();
});

/* ---------------------- Helper: refresh & initial load ---------------------- */

async function refreshAndRender() {
  todoArray = await get_Todos();
  display_Todos(todoArray);
}

// initial load
refreshAndRender();
