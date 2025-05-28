import React from 'react';
import './Profile.css'
const Profile = () => {
  let user = null;

  try {
    const userData = localStorage.getItem('user');
    if (userData && userData !== 'undefined') {
      user = JSON.parse(userData);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }

  if (!user) {
    return <p>No user is logged in.</p>;
  }

  return (
  <div className="profile-container">
    <h2 className="profile-heading">User Profile</h2>
    <p className="profile-info"><strong>Name:</strong> {user.name}</p>
    <p className="profile-info"><strong>Email:</strong> {user.email}</p>
    <p className="profile-info"><strong>Role:</strong> {user.role}</p>
  </div>
);

};

export default Profile;
