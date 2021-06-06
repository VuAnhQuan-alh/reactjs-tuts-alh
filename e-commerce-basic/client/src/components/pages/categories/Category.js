import axios from 'axios';
import React from 'react';
import { useGlobalContext } from '../../../GlobalState';

export default function Category() {
  const { 
    cateAPI: { 
      cates: [cates],
      callback: [callback, setCallback]
    },
    // prodAPI: {
    //   sort: [sort, setSort],
    //   cate: [cate, setCate]
    // },
    token: [token]
  } = useGlobalContext();
  const [category, setCategory] = React.useState('');
  const [onEdit, setOnEdit] = React.useState(false);
  const [id, setId] = React.useState('');
  const inRef = React.useRef();

  const create = async e => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(`/api/category/${id}`, { name: category }, {
          headers: { Authorization: token }
        });
        alert(res.data.msg);
      } else {
        const res = await axios.post('/api/category', { name: category }, {
          headers: { Authorization: token }
        });
        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory('');
      setCallback(!callback);
    } catch (error) {
      alert(error.response.data.msg)
    }
  };

  const editCategory = async (id, name) => {
    setOnEdit(true);
    setCategory(name);
    setId(id);
    inRef.current.focus();
  };

  const deleteCategory = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        const res = await axios.delete(`/api/category/${id}`, {
          headers: { Authorization: token }
        });
        alert(res.data.msg);
        setCallback(!callback);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="category-page">
      <form onSubmit={create}>
        <label htmlFor="category">Category</label>
        <input type="text"
          name="category"
          value={category}
          required
          ref={inRef}
          onChange={e => setCategory(e.target.value)}
        />
        <button type="submit">{onEdit ? "Update" : "Save"}</button>
      </form>
      <div>
        {
          cates.map((item, idx) => (
            <div className="row" key={idx}>
              <p>{item.name}</p>
              <div>
                <button onClick={() => editCategory(item._id, item.name)}>Edit</button>
                <button onClick={() => deleteCategory(item._id)}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
