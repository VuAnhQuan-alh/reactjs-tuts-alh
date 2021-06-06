import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './Store';

export default function Footer() {
  const [checkAll, setCheckAll] = useState(false);
  const list = useSelector(state => state.list);
  const dispatch = useDispatch(store);

  const handleChangeCheckAll = () => {
    dispatch({
      type: "completeAll",
      check: checkAll
    });
    setCheckAll(!checkAll);
  }

  const deleteTodo = () => {
    dispatch({
      type: "delete"
    });
    setCheckAll(false);
  }

  return (
    <>
    {
      list.length === 0 ?
        <h2>Congratulations! Nothings todo.</h2>
        :
        <div className="row">
          <label htmlFor="all">
            <input type="checkbox"
              name="all"
              id="all"
              onChange={handleChangeCheckAll}
              checked={checkAll}
            />
            All
          </label>
          <p>You have {list.filter(item => item.complete === false).length} to do</p>
          <button id="delete" onClick={deleteTodo}>Delete</button>
        </div>
    }
    </>
  )
}
