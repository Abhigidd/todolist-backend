const express = require("express");
const uuid = require("uuid");
const cors = require("cors")
const app = express();

const PORT = 3000;


//  this one is for middleware

app.use(express.json());
app.use(cors());

//  create some todo list
const todos = [
    {
        id: 1,
        name: "Catch jirachi",
        completed: true
    },
    {
        id: 2,
        name: "Catch Zoroark",
        completed: false
    },
    {
        id: 3,
        name: "Catch Arceus",
        completed: true
    }
]

app.get("/", (req, res) => {
    res.json("welcome to 1st node js project");
});

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.get("/todos/:id", (req, res) => {
    let todo = todos.filter((todo) => todo.id === parseInt(req.params.id));

    res.json({ msg: "1st todo list id", data: todo });
})

//  get post put delete patch
app.post("/todos", (req, res) => {
    // console.log(req.body);
    todos.push({ id: uuid.v4(), ...req.body });
    res.json({ msg: "1st todo list post" });
});

app.put("/todos/:id", (req, res) => {
    let todo = todos.find((todo) => todo.id === parseInt(req.params.id));
    if (todo) {
        todo.name = req.body.name;
        todo.completed = req.body.completed;
        res.json({ msg: "1st todo list add sommething or change something", data: todos });
    } else {
        res.json({ msg: "Todo not found" });
    }
});

app.delete("/todos/:id", (req, res) => {
    let index = todos.findIndex((todo) => todo.id == req.params.id);
    todos.splice(index, 1);
    res.json({ msg: "1st todo list delete something", data: todos });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});