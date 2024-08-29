import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [userActivity, setUserActivity] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4567/api/analytics/tasks/completed')
      .then(response => {
        setCompletedTasks(response.data.count);
      })
      .catch(error => {
        console.error('There was an error fetching the completed tasks!', error);
      });

    axios.get('http://localhost:4567/api/analytics/tasks/overdue')
      .then(response => {
        setOverdueTasks(response.data.count);
      })
      .catch(error => {
        console.error('There was an error fetching the overdue tasks!', error);
      });

    axios.get('http://localhost:4567/api/analytics/user_activity')
      .then(response => {
        setUserActivity(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user activity!', error);
      });
  }, []);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <p>Completed Tasks: {completedTasks}</p>
      <p>Overdue Tasks: {overdueTasks}</p>
      <h2>User Activity</h2>
      <ul>
        {userActivity.map(activity => (
          <li key={activity.user_id}>User {activity.user_id}: {activity.activity_count} tasks</li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsDashboard;