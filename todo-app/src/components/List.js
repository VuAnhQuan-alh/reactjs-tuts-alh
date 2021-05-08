import React, { useContext } from 'react';
import { DataContext } from './Data';
import Items from './Items';

export default function List() {
  const [ todo, setTodo ] = useContext(DataContext);
  const switchComplete = id => {
    const newTodo = [...todo];
    newTodo.forEach((todo, index) => {
      if (index === id) {
        todo.complete = !todo.complete;
      }
    });
    setTodo(newTodo);
  };
  const handleEditTodo = (editVal, id) => {
    const newTodo = [...todo];
    newTodo.forEach((todo, index) => {
      if (index === id) {
        todo.name = editVal;
      }
    });
    setTodo(newTodo); 
  }
  return (
    <ul>
      {
        todo.map((todo, index) => (
          <Items todo={todo}
            key={index}
            id={index}
            checkComplete={switchComplete}
            handleEditTodo={handleEditTodo}
          />
        ))
      }
    </ul>
  )
}
