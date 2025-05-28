// MyEvents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyEvents.css'; // Assuming you have a CSS file for styling
const MyEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }

    const userData = JSON.parse(user);
    axios.get(`http://localhost:5000/api/events/my-events/${userData.id}`)
      .then((response) => {
        setUserEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user events:', error);
      });
  }, [navigate]);

  return (
    <div className="my-events-container">
  <h2 className="my-events-title">My Events</h2>
  <ul className="my-events-list">
    {userEvents.length === 0 ? (
      <p className="no-events-message">You have not signed up for any events yet.</p>
    ) : (
      userEvents.map((event) => (
        <li key={event._id} className="my-event-card">
          <h4 className="my-event-title">{event.title}</h4>
          <p className="my-event-description">{event.description}</p>
        </li>
      ))
    )}
  </ul>
</div>

  );
};

export default MyEvents;
