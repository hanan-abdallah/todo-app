const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} = require('../controllers/todoController');

router.get('/', getTodos);
router.post('/', addTodo);
router.put('/:id', toggleTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
