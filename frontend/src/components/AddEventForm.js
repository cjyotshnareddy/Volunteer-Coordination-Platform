import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddEventForm.css'; // We'll use this for greenery styling

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'organizer') {
      setAccessDenied(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/events/add', formData);
      setSuccessMsg(res.data.msg);
      setFormData({ title: '', description: '', date: '', location: '' }); // Reset form
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || 'Failed to create event');
    }
  };

  if (accessDenied) {
    return <h3 className="access-denied">Access Denied. Only organizers can add events.</h3>;
  }

  return (
    <div className="add-event-container">
      <h2>Add New Event</h2>
      {successMsg && <p className="success">{successMsg}</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <button type="submit">🌿 Create Event</button>
      </form>
    </div>
  );
};

export default AddEventForm;
