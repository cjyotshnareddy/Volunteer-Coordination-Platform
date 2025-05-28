// src/components/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear everything
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Optional: Clear all if needed
    // localStorage.clear();

    console.log('User logged out');
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
