import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Import Link
import '../App.css';  // Correct the path to App.css

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login/', formData);
      localStorage.setItem('token', response.data.access);
      console.log(response.data);
      navigate('/');  // Redirect to home page after successful login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>
          <Link to="/">Task Management App</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" onChange={handleChange} placeholder="Username" />
          <input type="password" name="password" onChange={handleChange} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
};

export default Login;
