import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './DataProvider';


export default function Shop() {
  const { products: [products], addCart } = useContext(DataContext);
  return (
    <div className="products">
      {
        products.map(prod => (
          <div className="card" key={prod._id}>
            <Link to={`/product/${prod._id}`}>
              <img src={prod.images[0]} alt="product" />
            </Link>
            <div className="box">
              <h3>
                <Link to={`/product/${prod._id}`}>{prod.title}</Link>
              </h3>
              <p>{prod.description} {prod.content}</p>
              <h4>${prod.price}</h4>
              <button
                onClick={() => addCart(prod._id)}
                style={{ cursor: "pointer" }}
              >Add to cart</button>
            </div>
          </div>
        ))
      }
    </div>
  );
};
