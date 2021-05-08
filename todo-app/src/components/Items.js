import React, { useState } from 'react';

export default function Items({ todo, id, checkComplete, handleEditTodo }) {
  const [onEdit, setOnEdit] = useState(false);
  const [editVal, setEditVal] = useState(todo.name);
  console.log(todo)
  const handleOnEdit = () => {
    setOnEdit(true);
  };
  const handleSave = id => {
    setOnEdit(false);
    editVal ? handleEditTodo(editVal, id) : handleEditTodo(todo.name)
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
        <button disabled={todo.complete} onClick={handleOnEdit}>Edit</button>
      </li>
    )
  }
}
