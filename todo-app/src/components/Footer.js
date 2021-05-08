import React, { useContext, useState } from 'react';
import { DataContext } from './Data';

export default function Footer() {
  const [checkAll, setCheckAll] = useState(false);
  const [todo, setTodo] = useContext(DataContext);
  const handleCheckAll = () => {
    const newTodo = [...todo];
    newTodo.forEach(todo => {
      todo.complete = !checkAll;
    });
    setTodo(newTodo);
    setCheckAll(!checkAll);
  };
  const newTodoComplete = () => {
    return todo.filter(todo => todo.complete === false).length;
  };
  const deleteTodo = () => {
    const newTodo = todo.filter(todo => todo.complete === false);
    setTodo(newTodo);
    setCheckAll(false);
  }
  return (
    <>
    {
      todo.length === 0 ?
        <h2>Congratulations! Nothings todo.</h2>
        :
        <div className="row">
          <label htmlFor="all">
            <input type="checkbox"
              name="all"
              id="all"
              onChange={handleCheckAll}
              checked={checkAll}
            />
            All
          </label>
          <p>You have {newTodoComplete} to do</p>
          <button id="delete" onClick={deleteTodo}>Delete</button>
        </div>
    }
    </>
  )
}
