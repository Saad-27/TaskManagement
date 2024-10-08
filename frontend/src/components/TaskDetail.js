import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`/api/tasks/${id}`)
      .then(response => {
        setTask(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the task!', error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`/api/tasks/${id}`)
      .then(() => {
        navigate('/tasks');
      })
      .catch(error => {
        console.error('There was an error deleting the task!', error);
      });
  };

  const handleComplete = () => {
    axios.post(`/api/tasks/${id}/complete`)
      .then(() => {
        setTask({ ...task, status: 'completed' });
      })
      .catch(error => {
        console.error('There was an error marking the task as complete!', error);
      });
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
      <button onClick={handleDelete}>Delete Task</button>
      <Link to={`/tasks/${id}/edit`}>Edit Task</Link>
      {task.status !== 'completed' && (
        <button onClick={handleComplete}>Mark as Complete</button>
      )}
    </div>
  );
};

export default TaskDetail;
