import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TaskManagement = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
      <header>
        <h1>
          <Link to="/tasks">Task Management App</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Task Management</h1>
        <p>Welcome to your task management dashboard. Here you can organize your tasks.</p>
      </main>
    </div>
  );
};

export default TaskManagement;
