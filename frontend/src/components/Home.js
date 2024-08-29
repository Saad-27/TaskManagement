import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';  // Correct the path to App.css

const Home = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="container">
      <header>
        <h1>
          <Link to={isAuthenticated ? "/tasks" : "/"}>Task Management App</Link>
        </h1>
        <nav>
          <ul>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/projects/new">Create Project</Link>
                </li>
                <li>
                  <Link to="/tasks">Manage Tasks</Link>
                </li>
                <li>
                  <button className="logout-button" onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <h1>Welcome to the Task Management App</h1>
        <p>Effortlessly manage your tasks and boost your productivity with our intuitive task management app. Register now to get started!</p>
      </main>
    </div>
  );
};

export default Home;
