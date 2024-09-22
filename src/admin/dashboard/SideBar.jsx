import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
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
