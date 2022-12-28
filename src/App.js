import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/Todos/TodoForm';
import TodoList from './components/Todos/TodoList';
import TodosActions from './components/Todos/TodosActions';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodoHandler = (text) => {
    setTodos([...todos, createNewTodo(text)]);
  };

  const createNewTodo = (text) => {
    return {
      text: text,
      isComplited: false,
      id: uuidv4(),
    };
  };

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const copyTodoHandler = (todo) => {
    setTodos(copyTodo(todos, todos.indexOf(todo), createNewTodo(todo.text)));
  };

  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isComplited: !todo.isComplited }
          : { ...todo }
      )
    );
  };

  const resetTodosHandler = () => {
    setTodos([]);
  };

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isComplited));
  };

  const complitedTodosCount = todos.filter((todo) => todo.isComplited).length;

  function copyTodo(arr, toIndex, addedTodo) {
    arr.splice(toIndex, 0, addedTodo);
    return [...arr];
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodoHandler} />
      {todos.length > 0 && (
        <TodosActions
          complitedTodosExist={!!complitedTodosCount}
          resetTodos={resetTodosHandler}
          deleteCompletedTodos={deleteCompletedTodosHandler}
        />
      )}
      <TodoList
        todos={todos}
        deleteTodo={deleteTodoHandler}
        toggleTodo={toggleTodoHandler}
        copyTodo={copyTodoHandler}
      />
      {complitedTodosCount > 0 && (
        <h2>{`You have completed ${complitedTodosCount} ${
          complitedTodosCount > 1 ? 'todos' : 'todo'
        }`}</h2>
      )}
    </div>
  );
}

export default App;
