import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from './Store';

export default function FormInput() {
  const [ todoName, setTodoName ] = useState('');
  const todoInput = useRef();
  useEffect(() => {
    todoInput.current.focus();
  }, []);

  const dispatch = useDispatch(store);
  const createTodo = (e) => {
    e.preventDefault();
    dispatch({
      type: "create",
      todo: {
        name: todoName
      }
    });
    setTodoName('');
    todoInput.current.focus();
  }

  return (
    <form action="" 
      autoComplete="off"
      onSubmit={createTodo}
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
