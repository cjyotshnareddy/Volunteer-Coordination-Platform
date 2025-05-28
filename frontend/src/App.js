// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import MyEvents from './components/MyEvents';
import AddEventForm from './components/AddEventForm';
import AdminEventOverview from './components/AdminEventOverview';

import './App.module.css';

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/logout">Logout</Link>
          <Link to="/MyEvents">My Events</Link>
          {role === 'organizer' && <Link to="/AddEventForm">Add Event</Link>}
          {role === 'organizer' && <Link to="/AdminEventOverview">Admin Events</Link>}
        </nav>

        {/* Page Content */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/MyEvents" element={<MyEvents />} />
            <Route
              path="/AddEventForm"
              element={role === 'organizer' ? <AddEventForm /> : <Navigate to="/" />}
            />
            <Route
              path="/AdminEventOverview"
              element={role === 'organizer' ? <AdminEventOverview /> : <Navigate to="/" />}
            />
          </Routes>
        </div>

        {/* Optional Footer */}
        <footer>
          <p>&copy; {new Date().getFullYear()} Evergreen Events. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
