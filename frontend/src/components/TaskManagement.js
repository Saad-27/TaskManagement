import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskManagement = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  const handleComplete = (taskId) => {
    axios.post(`/api/tasks/${taskId}/complete`)
      .then(() => {
        setTasks(tasks.map(task => 
          task._id === taskId ? { ...task, status: 'completed' } : task
        ));
      })
      .catch(error => {
        console.error('There was an error marking the task as complete!', error);
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
            <li key={task._id}>
              <Link to={`/tasks/${task._id}`}>{task.title}</Link>
              {task.status !== 'completed' && (
                <button onClick={() => handleComplete(task._id)}>Mark as Complete</button>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default TaskManagement;
