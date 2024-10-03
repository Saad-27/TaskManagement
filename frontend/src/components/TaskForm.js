import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const { id } = useParams(); // Get task ID if in edit mode
  const navigate = useNavigate(); // Navigate after submit
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    deadline: '',
    projectId: '',
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch the list of projects
    axios.get('http://localhost:8000/api/projects/')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });

    // If in edit mode, fetch task details
    if (id) {
      axios.get(`http://localhost:8000/api/tasks/${id}/`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching task:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`http://localhost:8000/api/tasks/${id}/`, formData) // Edit task
      : axios.post('http://localhost:8000/api/tasks/', formData); // Create new task

    request
      .then(response => {
        const task = response.data;
        // Send notification after task creation or update
        const notification = {
          task_id: task.id, // Django uses `id`
          message: `Task ${id ? 'updated' : 'created'}: ${task.title} has been assigned to project ${task.projectId}`,
          recipient: 'user@example.com', // Replace with actual recipient
          type: 'email',
        };
        axios.post('http://localhost:8000/api/notifications/', notification)
          .then(() => {
            navigate('/tasks'); // Redirect to task list after submit
          })
          .catch(error => {
            console.error('Error sending notification:', error);
            navigate('/tasks'); // Still navigate after error
          });
      })
      .catch(error => {
        console.error('Error saving task:', error);
      });
  };

  return (
    <div>
      <h1>{id ? 'Edit Task' : 'Create Task'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />
        <select
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          required
        >
          <option value="">Select Project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        <button type="submit">{id ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  );
};

export default TaskForm;
