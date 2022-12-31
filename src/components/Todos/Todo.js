import {
  RiTodoFill,
  RiDeleteBin2Line,
  RiFileCopy2Fill,
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiBallPenLine,
} from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa'
import styles from './Todo.module.css'

function Todo({ todo, deleteTodo, toggleTodo, copyTodo, moveTodo }) {
  return (
    <div
      className={`${styles.todo} ${
        todo.isComplited ? styles.completedTodo : ''
      }`}
    >
      <div className={styles.moveIconContainer}>
        <RiArrowUpSFill
          className={styles.moveIcon}
          onClick={() => moveTodo({ todo, dir: '-1' })}
        />
        <RiArrowDownSFill
          className={styles.moveIcon}
          onClick={() => moveTodo({ todo, dir: '1' })}
        />
      </div>
      {/* <RiTodoFill className={styles.todoIcon} /> */}

      <div className={styles.todoText}>{todo.text}</div>
      <RiFileCopy2Fill
        className={styles.checkIcon}
        onClick={() => copyTodo(todo)}
      />
      <RiDeleteBin2Line
        className={styles.deleteIcon}
        onClick={() => deleteTodo(todo.id)}
      />
      <FaCheck
        className={styles.checkIcon}
        onClick={() => toggleTodo(todo.id)}
      />
    </div>
  )
}

export default Todo
