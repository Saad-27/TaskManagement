import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/register/', formData);
      console.log(response.data);
      navigate('/tasks');  // Redirect to task management page after successful registration
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.detail || 'Registration failed. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
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
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" onChange={handleChange} placeholder="Username" />
          <input type="email" name="email" onChange={handleChange} placeholder="Email" />
          <input type="password" name="password" onChange={handleChange} placeholder="Password" />
          <button type="submit">Register</button>
        </form>
      </main>
    </div>
  );
};

export default Register;