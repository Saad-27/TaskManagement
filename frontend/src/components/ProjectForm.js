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
    axios.post('http://localhost:8080/api/projects', formData)  // Update the base URL if necessary
      .then(() => {
        navigate('/projects');
      })
      .catch(error => {
        console.error('There was an error creating the project!', error);
      });
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" required />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;