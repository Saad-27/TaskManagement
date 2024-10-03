import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send project creation request to Django backend
    axios.post('http://localhost:8000/api/projects/', formData)
      .then(() => {
        // Redirect to project list after successful creation
        navigate('/projects');
      })
      .catch(error => {
        console.error('Error creating project:', error);
      });
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Project Name"
          required
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
