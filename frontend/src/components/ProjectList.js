import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch the list of projects from the Django backend
    axios.get('http://localhost:8000/api/projects/')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  return (
    <div>
      <h1>Project List</h1>
      <Link to="/projects/new">Create New Project</Link>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {/* Link to the project-specific task page */}
            <Link to={`/projects/${project.id}/tasks`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
