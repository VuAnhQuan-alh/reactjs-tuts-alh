import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from './Store';

export default function Items({ todo, id }) {
  const dispatch = useDispatch(store);
  const [check, setCheck] = useState(todo.complete);
  const checkComplete = (id) => {
    setCheck(!check);
    dispatch({
      type: 'completed',
      check: !check,
      todo: {
        id: id
      }
    });
  }

  const [onEdit, setOnEdit] = useState(false);
  const [editVal, setEditVal] = useState(todo.name);
  const handleSave = (id) => {
    if (editVal !== todo.name) {
      dispatch({
        type: 'update',
        todo: {
          id: id,
          name: editVal
        }
      });
    }
    setOnEdit(false);
  }

  if (onEdit) {
    return (
      <li>
        <input type="text"
          id="editVal"
          value={editVal}
          name="editVal"
          onChange={e => setEditVal(e.target.value.toLowerCase())}
        />
        <button onClick={() => handleSave(id)}>Save</button>
      </li>
    )
  } else {
    return (
      <li>
        <label htmlFor={id} className={todo.complete ? "active" : ''}>
          <input type="checkbox"
            id={id}
            checked={todo.complete}
            onChange={() => checkComplete(id)}
          />
          {todo.name}
        </label>
        <button disabled={todo.complete} onClick={() => setOnEdit(!onEdit)}>Edit</button>
      </li>
    )
  }
}
