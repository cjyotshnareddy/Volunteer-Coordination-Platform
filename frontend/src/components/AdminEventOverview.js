import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminEventOverview.css'; // <-- ensure correct path

const AdminEventOverview = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'organizer') {
      setError('❌ Access Denied: Only organizers can view this page.');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events/admin/overview');
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching admin overview:', err);
        setError('⚠️ Failed to fetch event overview');
      }
    };

    fetchData();
  }, []);

  if (error) return <h3 className="error-message">{error}</h3>;

  return (
 <div className="admin-container">
  <h2 className="admin-title">Admin Event Overview</h2>

  {events.length === 0 ? (
    <p className="no-events">No events found.</p>
  ) : (
    events.map(event => (
      <div key={event._id} className="event-card">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-detail"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p className="event-detail"><strong>Venue:</strong> {event.location}</p>
        <p className="event-detail"><strong>About this event:</strong> {event.description}</p>
        <p className="event-detail"><strong>Volunteers Registered:</strong> {event.volunteerCount}</p>
        <div className="volunteer-list">
          {event.volunteers.map(v => (
            <div key={v._id} className="volunteer-item">
              <span className="volunteer-name">{v.name}</span> — <span className="volunteer-email">{v.email}</span>
            </div>
          ))}
        </div>
      </div>
    ))
  )}
</div>


  );
};

export default AdminEventOverview;
