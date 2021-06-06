import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/info', {
            headers: { Authorization: token }
          });
          setIsLogged(true);
          res.data.role === 1 && setIsAdmin(true);
          setCart(res.data.cart);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);


  const addCart = async (prod) => {
    if (!isLogged) return alert('Please login to continue buying.');

    const check = cart.every(item => item._id !== prod._id);
    if (check) {
      setCart([ ...cart, { ...prod, quantity: 1 } ]);
      await axios.patch('/user/add_cart', { cart: [...cart, { ...prod, quantity: 1 }] }, {
        headers: { Authorization: token }
      });
    } else {
      alert("This product has been added to cart");
    }
  }

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory]
  }
}
