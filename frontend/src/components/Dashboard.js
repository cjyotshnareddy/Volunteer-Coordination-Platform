// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';


const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
    } else {
      navigate('/login');
    }

    // Fetch events from the backend
    axios.get('http://localhost:5000/api/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, [navigate]);

  const handleSignUp = (eventId) => {
   console.log('User Data:', userData);  // Add this line to check if userData has the _id
  const userId = userData.id;  // Ensure that userData contains _id

  if (!userId) {
    console.error('No user ID found');
    alert('No user data available');
    return;
  }

  axios.post(`http://localhost:5000/api/events/signup/${eventId}`, { userId })
    .then((response) => {
      alert('Successfully signed up for the event');
    })
    .catch((error) => {
      alert('Error signing up: ' + (error.response?.data || 'Unknown error'));
    });
};


  return (
   <div className="dashboard-container">
  <h2>Dashboard</h2>
  {userData ? (
    <div>
      <div className="user-info">
        <p>Welcome, <strong>{userData.name}</strong></p>
        <p>Email: <em>{userData.email}</em></p>
      </div>

      <h3>Available Volunteering Opportunities</h3>
      <ul className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event._id} className="event-item">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <button className="signup-button" onClick={() => handleSignUp(event._id)}>🤝 Sign Up</button>
            </li>
          ))
        ) : (
          <div className="no-events">No events available right now. Check back soon!</div>
        )}
      </ul>
    </div>
  ) : (
    <p className="loading">Loading user data...</p>
  )}
</div>

  );
};

export default Dashboard;
