const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

const addTodo = async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
};

const toggleTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

module.exports = {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
};
