import React, { useState, useContext, useRef, useEffect } from 'react';
import { DataContext } from './Data';

export default function FormInput() {
  const [ todo, setTodo ] = useContext(DataContext);
  const [ todoName, setTodoName ] = useState('');
  const todoInput = useRef();
  const addTodo = e => {
    e.preventDefault();
    setTodo([...todo, {name: todoName, complete: false}]); 
    setTodo('');
    todoInput.current.focus();
  };
  useEffect(() => {
    todoInput.current.focus();
  }, []);
  return (
    <form action="" 
      autoComplete="off"
      onSubmit={addTodo}
    >
      <input type="text"
        name="todo"
        id="todo"
        ref={todoInput}
        required
        placeholder="What needs to be done?"
        value={todoName}
        onChange={e => setTodoName(e.target.value.toLowerCase())}
      />
      <button type="submit">Create</button>
    </form>
  );
}
