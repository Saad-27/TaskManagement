import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskManagement = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // Log out user and redirect to home page
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Fetch all tasks when component loads
  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks/')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Mark a task as complete
  const handleComplete = (taskId) => {
    axios.post(`http://localhost:8000/api/tasks/${taskId}/complete/`)
      .then(() => {
        setTasks(tasks.map(task =>
          task.id === taskId ? { ...task, status: 'completed' } : task
        ));
      })
      .catch(error => {
        console.error('Error marking task as complete:', error);
      });
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
        <h2>All Tasks</h2>
        <Link to="/tasks/new">Create New Task</Link>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <Link to={`/tasks/${task.id}`}>{task.title}</Link>
              {task.status !== 'completed' && (
                <button onClick={() => handleComplete(task.id)}>Mark as Complete</button>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default TaskManagement;
