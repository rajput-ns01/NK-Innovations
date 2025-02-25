import React from 'react';
import Sidebar from './SideBar';
import Header from './Header';
import UserManagement from './UserManagement'; // Import other sections as needed
import JobApplications from './JobApplications';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-section">
          {/* Render the different sections based on route */}
          <UserManagement />
          {/* Add other components such as OrderManagement, ProductManagement */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
