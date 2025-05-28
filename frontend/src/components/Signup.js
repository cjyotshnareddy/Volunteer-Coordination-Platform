import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Assuming you have a CSS file for styling
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'volunteer',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
       localStorage.setItem('role', formData.role);
      
       setMessage('Signup successful!');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Error signing up. Please try again.');
      }
    }
  };

  return (
   <div className="signup-container">
  <h2 className="signup-title">Signup</h2>

  {message && <p className="success-message">{message}</p>}
  {error && <p className="error-message">{error}</p>}

  <form className="signup-form" onSubmit={handleSubmit}>
    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="signup-input" required />

    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="signup-input" required />

    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="signup-input" required />

    <select name="role" value={formData.role} onChange={handleChange} className="signup-select">
      <option value="volunteer">Volunteer</option>
      <option value="organizer">Organizer</option>
    </select>

    <button type="submit" className="signup-button">Sign Up</button>
  </form>
</div>


  );
};

export default Signup;
