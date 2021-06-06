import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  const regisSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/user/register', {...user});

      localStorage.setItem('first_login', true);

      window.location.href = '/';
    } catch (error) {
      alert(error.response.data.msg);
    }
  }
  return (
    <div className="login-page">
      <form onSubmit={regisSubmit}>
        <h2>register</h2>
        <input type="text"
          name="name"
          required
          autoComplete="username"
          placeholder="Username"
          value={user.name}
          onChange={onChangeInput}
        />
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
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  )
}
