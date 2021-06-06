import axios from 'axios';
import React from 'react';
import { useGlobalContext } from '../../../../GlobalState';
import Loading from '../loading/Loading';
import BtnRender from './BtnRender';

const Item = ({ product }) => {
  const {
    prodAPI: {
      prods: [prods, setProds],
      callback: [callback, setCallback]
    },
    userAPI: {
      isAdmin: [isAdmin]
    },
    token: [token]
  } = useGlobalContext();
  const [loading, setLoading] = React.useState(false);

  const delProd = async (prod) => {
    try {
      const isDel = window.confirm('Do you want to delete this product?');
      if (isDel) {
        setLoading(true);
        await axios.post('/api/destroy', { public_id: prod.images.public_id }, {
          headers: { Authorization: token }
        });
        await axios.delete(`/api/product/${prod._id}`, {
          headers: { Authorization: token }
        });
        setLoading(false);
        setCallback(!callback);
      }
    } catch (error) {
      alert('error.response.data.msg');
    }
  };
  const handleCheck = id => {
    prods.forEach(el => {
      if (el._id === id) el.checked = !el.checked;
      return el;
    });
    setProds([...prods]);
  };

  if (loading) return <div className="product_card"><Loading /></div>;

  return (
    <>
      <div className="product_card">
        {
          isAdmin &&
          <input type="checkbox"
            checked={product.checked}
            onChange={() => handleCheck(product._id)}
          />
        }
        <img src={product.images.url} alt="images product" />
        <div className="product_box">
          <h2>{product.title}</h2>
          <span>${product.price}</span>
          <p>
            {product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores, doloribus distinctio. Velit quos totam impedit minus cupiditate sint dolor quisquam.
          </p>
        </div>
        <BtnRender prod={product} del={delProd} />
      </div>
    </>
  );
}

export default Item;
