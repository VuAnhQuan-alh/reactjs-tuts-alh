import React, { useState, useEffect, createContext } from 'react';

export const DataContext = createContext();

export const Data = (props) => {
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    const todoStore = JSON.parse(localStorage.getItem('todoStore'));
    if (todoStore) setTodo(todoStore);
  }, []);
  useEffect(() => {
    localStorage.setItem('todoStore', JSON.stringify(todo))
  }, [todo]);
  
  return (
    <DataContext.Provider value={[todo, setTodo]}>
      {props.children}
    </DataContext.Provider>
  );
}