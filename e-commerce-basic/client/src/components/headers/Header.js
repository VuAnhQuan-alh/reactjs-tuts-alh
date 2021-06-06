import React, { useContext } from 'react';
import iconMenu from './icon/bars-solid.svg';
import iconClose from './icon/times-solid.svg';
import iconCart from './icon/shopping-cart-solid.svg';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

export default function Header() {
  const {
    userAPI: {
      isLogged: [isLogged],
      isAdmin: [isAdmin],
      cart: [cart]
    }
  } = useContext(GlobalState);
  const lo = useLocation();

  const logoutUser = async () => {
    await axios.get('/user/logout');

    localStorage.removeItem('first_login');

    window.location.href = '/products';
  }

  const adminRouter = () => {
    return (
      <>
        <li><Link to="/create-prod">Create Products</Link></li>
        <li><Link to="/category">Categories</Link></li>
      </>
    )
  };
  const loggedRouter = () => {
    return (
      <>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
      </>
    )
  }

  return (
    <header>
      <div className="menu">
        <img src={iconMenu} alt="icon menu" width="30px;" />
      </div>
      <div className="logo">
        <h1><Link to="/">{isAdmin ? 'Admin' : 'Shop Alh'}</Link></h1>
      </div>
      <ul>
        <li><Link to="/products">{isAdmin ? 'Products' : 'Shop'}</Link></li>

        {isAdmin && adminRouter()}
        {
          lo.pathname !== '/login'
            ? isLogged
              ? loggedRouter()
              : <li><Link to="/login">Login & Register</Link></li>
            : null
        }

        <li>
          <img className="menu" src={iconClose} alt="icon times" width="30px;" />
        </li>
      </ul>

      {
        isAdmin ? '' : (<div className="cart-icon">
            <span>{cart.length}</span>
            <Link to="/cart">
              <img src={iconCart} alt="icon shopping cart" width="30px;" />
            </Link>
          </div>)
      }

    </header>
  )
}
