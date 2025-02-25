import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { signOut } from 'firebase/auth'; // Import signOut function from Firebase
import { auth } from '../../lib/firebase'; // Import your Firebase auth instance

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/login"); // Redirect to the login page after successful logout
    } catch (err) {
      console.error("Error logging out: ", err); // Handle errors if any
    }
  };

  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <button className='admin-button' onClick={handleLogout}>Logout</button>
        </li>
        <li><Link to="/admin/users">User Management</Link></li>
        <li><Link to="/admin/readymade">ReadyMade Product Orders</Link></li>
        <li><Link to="/admin/customize">Customize Product Orders</Link></li>
        <li><Link to="/admin/products">Product Management</Link></li>
        <li><Link to="/admin/jobs">Job Listings</Link></li>
        <li><Link to="/admin/applications">Job Applications</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
