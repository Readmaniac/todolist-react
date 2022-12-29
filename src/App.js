import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/Todos/TodoForm';
import TodoList from './components/Todos/TodoList';
import TodosActions from './components/Todos/TodosActions';
import './App.css';

function App() {
  //формируем массив todos и рендерим после изменения
  const [todos, setTodos] = useState([]);
  //забираем из формы текст новой todo и отправляем рендериться через setTodos
  const addTodoHandler = (text) => {
    setTodos([...todos, createNewTodo(text)]);
  };
  //экземпляр новой todo
  const createNewTodo = (text) => {
    return {
      text: text,
      isComplited: false,
      id: uuidv4(),
    };
  };
  //удаляем todo через перебор массива и отбрасываем элемент с нужным id
  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  //забираем todo для копирования, создаем на ее основе новую, вставляем после нужного индекса и рендерим
  const copyTodoHandler = (todo) => {
    setTodos(copyTodo(todos, todos.indexOf(todo), createNewTodo(todo.text)));
  };
  //отмечаем выполненные задачи, отбирая айди нужной из перебора массива
  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isComplited: !todo.isComplited }
          : { ...todo }
      )
    );
  };
  //сбрасываем список todo до пустого
  const resetTodosHandler = () => {
    setTodos([]);
  };
  //удаляем завершенные задачи
  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isComplited));
  };
  //количество завершенных задач
  const complitedTodosCount = todos.filter((todo) => todo.isComplited).length;
  //функция для вставки скопированной todo на место, после скопированной
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
