import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import TaskManagement from './components/TaskManagement';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // UseEffect to track authentication changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/tasks"
          element={isAuthenticated ? <TaskManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects"
          element={isAuthenticated ? <ProjectList /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/new"
          element={isAuthenticated ? <ProjectForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks/new"
          element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks/:id"
          element={isAuthenticated ? <TaskDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks/:id/edit"
          element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytics"
          element={isAuthenticated ? <AnalyticsDashboard /> : <Navigate to="/login" />}
        />

        {/* Logout logic */}
        <Route
          path="/logout"
          element={
            <Navigate
              to="/"
              replace
              onNavigate={handleLogout} // Trigger logout logic
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
