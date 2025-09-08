import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // add loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('nytehawk-user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && parsedUser.email) {
            setUser(parsedUser);
          } else {
            navigate('/');
          }
        } catch (err) {
          console.error('Error parsing user data:', err);
          navigate('/');
        }
      } else {
        navigate('/');
      }
      setLoading(false);
    }, 200); // short delay to wait for localStorage to be populated

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nytehawk-user');
    window.location.href = '/';
  };

  if (loading) return null;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Date of Birth:</strong> {user.dob}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        {/* Never show actual password */}
        <p><strong>Password:</strong> *******</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
