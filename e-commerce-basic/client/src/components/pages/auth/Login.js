import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  const loginSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/user/login', {...user});

      localStorage.setItem('first_login', true);

      window.location.href = '/products';
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input type="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  )
}
