import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Colors from './Colors';
import { DataContext } from './DataProvider';
import Sizes from './Sizes';

const Cart = () => {
  const { products: [products], addCart, cart: [cart, setCart] } = useContext(DataContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const result = cart.reduce((acc, cur) => acc + cur.price * cur.count, 0);
      setTotal(result);
    }
    getTotal();
  }, [cart]);
  const reduction = id => {
    cart.forEach(item => {
      if (item._id === id) item.count === 1 ? item.count = 1 : item.count -= 1;
    });
    setCart([...cart]);
  }
  const increase = id => {
    cart.forEach(item => {
      if (item._id === id) item.count += 1;
    });
    setCart([...cart]);
  }
  const removeProd = id => {
    if (window.confirm("Do you want to delete this product?")) {
      const newCart = cart.filter(item => item._id !== id);
      setCart([...newCart]);
    }
  }

  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
  }

  return (
    <>
      {
        cart.map(prod => (
          <div className="details cart" key={prod._id}>
            <div
              className="img-detail"
              style={{
                backgroundImage: `url(${prod.images[0]})`,
                height: '400px'
              }}
            />
            <div className="box-detail">
              <h2>{prod.title}</h2>
              <h3>${prod.price}</h3>
              <Colors colors={prod.colors} />
              <Sizes sizes={prod.sizes} />
              <p>{prod.description}</p>
              <p>{prod.content}</p>
              <div className="amount">
                <button onClick={() => reduction(prod._id)}> - </button>
                <span> {prod.count} </span>
                <button onClick={() => increase(prod._id)}> + </button>
              </div>
              <div className="delete" onClick={() => removeProd(prod._id)}>Del</div>
            </div>
          </div>
        ))
      }
      <div className="total">
        <Link to="payment">Payment</Link>
        <h3>Total: $ {total}</h3>
      </div>
    </>
   
  );
}

export default Cart;
