import React from 'react';
import { useSelector } from 'react-redux';
import Items from './Items';

export default function List() {

  const list = useSelector(state => state.list);

  return (
    <ul>
      {
        list.map((todo, index) => (
          <Items todo={todo}
            key={index}
            id={todo._id}
          />
        ))
      }
    </ul>
  )
}
