import { useState } from 'react';
import styles from './TodoForm.module.css';
import Button from '../UI/Button';

function TodoForm({ addTodo }) {
  //хук для стартового значения и его изменения
  const [text, setText] = useState('');
  //делаем поле ввода контролируемым
  const onSubmitHandler = (event) => {
    event.preventDefault();
    addTodo(text);
    setText('');
  };

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={onSubmitHandler}>
        <input
          placeholder="Enter new todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" title="Submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default TodoForm;
