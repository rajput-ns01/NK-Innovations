import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage'; // Import for Firebase Storage
import { db, storage } from '../../lib/firebase'; // Import your Firebase configuration
import './dashboard.css';
import Sidebar from './SideBar';
import Header from './Header';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firebase Firestore
  const fetchUsers = async () => {
    try {
      const userCollection = collection(db, 'users');
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  // Delete user and their associated image from Firebase Storage
  const handleDelete = async (userId, userImageUrl) => {
    try {
      // Step 1: Delete the user image from Firebase Storage (if it exists)
      if (userImageUrl) {
        try {
          const imageRef = ref(storage, userImageUrl);
          await deleteObject(imageRef);
          console.log('User image deleted successfully');
        } catch (storageError) {
          console.warn('User image not found or already deleted:', storageError);
        }
      }
  
      // Step 2: Delete the user document from Firestore
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter((user) => user.id !== userId));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user or image: ', error);
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <>
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-section">
          {/* Render the different sections based on route */}
          {/* Add other components such as OrderManagement, ProductManagement */}
        
    <div className="user-management-container">
      <h2>User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Image</th> {/* New column for user image */}
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {/* Display user image if exists, else show default avatar */}
                <img
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.username}
                  className="user-avatar"
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleDelete(user.id, user.avatar)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
      </div>
    </div>
    </>
  );
};

export default UserManagement;
