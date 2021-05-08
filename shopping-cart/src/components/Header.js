import React, { useState, useContext } from 'react';
import iconMenu from './svg/bars-solid.svg';
import iconTimes from './svg/times-solid.svg';
import iconCart from './svg/cart-solid.svg';
import { Link } from 'react-router-dom';
import { DataContext } from './DataProvider';

export default function Header() {
  const [isMenu, setIsMenu] = useState(false);
  const { cart: [cart] } = useContext(DataContext);

  const toggleMenu = () => {
    setIsMenu(!isMenu);
    console.log(isMenu);
  }
  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Citizen</Link>
        </h1>
      </div>
      <ul style={{
        left: isMenu ? 0 : '-100%'
      }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Products</Link></li>
        <li><Link to="/">About</Link></li>
        <li><Link to="/">Contact</Link></li>
        <li><Link to="/">Login/Register</Link></li>
        <li>
          <img src={iconTimes}
            className="iconMenu"
            width="30"
            alt="Icon Times"
            onClick={toggleMenu}
          />
        </li>
      </ul>
      <div className="iconMenu" >
        <img src={iconMenu} width="30" alt="Icon Menu" onClick={toggleMenu} />
      </div>
      <div className="iconCart">
        <span>{cart.length}</span>
        <Link to="cart">
          <img src={iconCart} width="30" alt="Cart item" />
        </Link>
      </div>
    </header>
  );
};
