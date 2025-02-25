import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase'; // Import Firestore instance
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore"; // Import Firestore functions
import Header from './Header';
import Sidebar from './SideBar';

const JobManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    title: '',
    location: '',
    type: '',
    salary: '',
    description: ''
  });
  const [jobs, setJobs] = useState([]); // State to store fetched jobs
  const [editingJobId, setEditingJobId] = useState(null); // State to track if a job is being edited

  // Fetch jobs from Firestore when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      }
    };

    fetchJobs();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingJobId) {
        // Update the existing job in Firestore
        const jobRef = doc(db, 'jobs', editingJobId);
        await updateDoc(jobRef, jobDetails);
        setJobs((prevJobs) =>
          prevJobs.map((job) => (job.id === editingJobId ? { id: job.id, ...jobDetails } : job))
        );
        alert('Job updated successfully!');
      } else {
        // Add new job details to Firestore
        const docRef = await addDoc(collection(db, 'jobs'), jobDetails);
        const newJob = { id: docRef.id, ...jobDetails };
        setJobs((prevJobs) => [...prevJobs, newJob]);
        alert('Job added successfully!');
      }

      // Reset form and close form modal
      setShowForm(false);
      setEditingJobId(null);
      setJobDetails({
        title: '',
        location: '',
        type: '',
        salary: '',
        description: ''
      });
    } catch (error) {
      console.error("Error submitting job: ", error);
    }
  };

  // Handle job edit
  const handleEdit = (job) => {
    setJobDetails(job);
    setEditingJobId(job.id);
    setShowForm(true);
  };

  // Handle job delete
  const handleDelete = async (jobId) => {
    try {
      // Delete job from Firestore
      await deleteDoc(doc(db, 'jobs', jobId));
      // Update the state to remove the deleted job
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      alert('Job deleted successfully!');
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-section">
          {/* Render the different sections based on route */}
          {/* Add other components such as OrderManagement, ProductManagement */}
        
    <div className="job-management">
      <h2>Job Listings Management</h2>
      <button className='admin-button' onClick={() => {
        setShowForm(!showForm);
        setEditingJobId(null); // Reset editing mode if adding a new job
      }}>
        {editingJobId ? 'Cancel Edit' : 'Add Job'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={jobDetails.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={jobDetails.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Type:</label>
            <input
              type="text"
              name="type"
              value={jobDetails.type}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Salary:</label>
            <input
              type="text"
              name="salary"
              value={jobDetails.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={jobDetails.description}
              onChange={handleChange}
              required
            />
          </div>
          <button className='admin-button' type="submit">{editingJobId ? 'Update Job' : 'Submit Job'}</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Title</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>
                  <button className='admin-button' onClick={() => handleEdit(job)}>Edit</button>
                  <button className='admin-button delete-admin' onClick={() => handleDelete(job.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No jobs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
      </div>
    </div>
  );
};

export default JobManagement;
