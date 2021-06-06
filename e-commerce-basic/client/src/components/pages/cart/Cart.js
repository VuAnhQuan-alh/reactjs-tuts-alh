import axios from 'axios';
import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../GlobalState';
import PaypalButton from './PaypalButton';

export default function Cart() {
  const {
    userAPI: {
      cart: [cart, setCart]
    },
    token: [token]
  } = useGlobalContext();
  const [total, setTotal] = React.useState(0);
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity);
      }, 0);
      setTotal(total);
    }

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch('/user/add_cart', {cart}, {
      headers: { Authorization: token }
    })
  }

  const increment = id => {
    cart.forEach(element => {
      if (element._id === id) {
        element.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };
  const decrement = id => {
    cart.forEach(element => {
      if (element._id === id) {
        element.quantity === 1 ? element.quantity = 1 : element.quantity -= 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProd = id => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, idx) => {
        if (item._id === id) {
          cart.splice(idx, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  }

  const tranSuccess = async (payments) => {
    const { paymentID, address } = payments;
    await axios.post('/api/payment', { cart, paymentID, address }, {
      headers: { Authorization: token }
    });
    setCart([]);
    addToCart([]); 
    alert("you have successfully placed an order.");
  }

  if (cart.length === 0) {
    return <h2 style={{
      textAlign: 'center',
      fontSize: '5rem'
    }}>Cart Empty</h2>
  }
  return (
    <div>
      {
        cart.map((prod, idx) => (
          <div key={idx} className="product_detail cart">
            <img src={prod.images.url} alt="product detail" className="img_container" />
            <div className="box-detail">
              <h2>{prod.title}</h2>
              <h3>$ {prod.price}</h3>
              <p>{prod.content}</p>
              <div className="amount">
                <button onClick={() => decrement(prod._id)}> - </button>
                <span>{prod.quantity}</span>
                <button onClick={() => increment(prod._id)}> + </button>
              </div>
              <div className="delete" onClick={() => removeProd(prod._id)}>X</div>
            </div>
          </div>
        ))
      }

      <div className="total">
        <h3>Total: $ {total}</h3>
        <PaypalButton
          total={total}
          tranSuccess={tranSuccess}
        />
      </div>
    </div>
  )
}
