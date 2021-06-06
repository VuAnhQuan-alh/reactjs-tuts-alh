import axios from "axios";
import React, { useState } from "react";
import { useGlobalContext } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
  prod_id: "",
  title: "",
  price: 0,
  description: " Waiting for update signal from WDS... ",
  content: " Waiting for update signal from WDS... Waiting for update signal from WDS...",
  category: "",
  _id: ""
};

export default function Create() {
  const {
    cateAPI: {
      cates: [cates],
    },
    userAPI: {
      isAdmin: [isAdmin],
    },
    token: [token],
    prodAPI: {
      prods: [prods],
      callback: [callback, setCallback]
    }
  } = useGlobalContext();
  const [prod, setProd] = useState(initialState);
  const [img, setImg] = useState(false);
  const [load, setLoad] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      setOnEdit(true);
      const currentProd = prods.find(prod => prod._id === id);
      setProd(currentProd);
      setImg(currentProd.images);
    } else {
      setOnEdit(false);
      setProd(initialState);
      setImg(false);
    }
  }, [id, prods]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an admin.");

      const file = e.target.files[0];
      if (!file) return alert("Upload failed!");
      if (file.size > 1024 * 1024) return alert("Size too large!");
      if (file.type !== ("image/jpeg" || "image/png"))
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);
      setLoad(true);
      const res = await axios.post("http://localhost:2213/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoad(false);
      setImg(res.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not admin!");

      setLoad(true);
      await axios.post('/api/destroy', { public_id: img.public_id }, {
        headers: { Authorization: token }
      });
      setLoad(false);
      setImg(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleChangeInput = e => {
    const { name, value } = e.target;
    setProd({ ...prod, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not a admin!");
      if (!img) return alert("No image upload!");

      if (onEdit) {
        await axios.put(`http://localhost:2213/api/product/${id}`, { ...prod, images: img }, {
          headers: { Authorization: token }
        });
      } else {
        await axios.post('http://localhost:2213/api/product', { ...prod, images: img }, {
          headers: { Authorization: token }
        });
      }

      setCallback(!callback);
      history.push('/products');
    } catch (error) {
      alert(error?.response?.data?.msg);
    }
  }

  const styleUpload = {
    display: img ? "block" : "none",
  };

  return (
    <div className="create_prod">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {load ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={img ? img.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="prod_id">Product_ID</label>
          <input
            type="text"
            name="prod_id"
            id="prod_id"
            required
            value={prod.prod_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={prod.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={prod.price}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={prod.description}
            onChange={handleChangeInput}
            rows="5"
          />
        </div>
        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={prod.content}
            onChange={handleChangeInput}
            rows="5"
          />
        </div>
        <div className="row">
          <label htmlFor="category">Category</label>
          <select name="category" value={prod.category} onChange={handleChangeInput}>
            <option value="0">Please select a category</option>
            {
              cates.map((item, idx) => (
                <option key={idx} value={item._id}>
                  {item.name}
                </option>
              ))
            }
          </select>
        </div>
        <button type="submit">{onEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}
