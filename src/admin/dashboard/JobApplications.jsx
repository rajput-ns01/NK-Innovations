import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase'; // Adjust the import path as necessary
import { collection, getDocs } from 'firebase/firestore';

const JobApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const applicationsCollection = collection(db, 'applicants'); // Replace with your collection name
      const applicationsSnapshot = await getDocs(applicationsCollection);
      const applicationsList = applicationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(applicationsList);
    };

    fetchApplications();
  }, []);

  return (
    <div className="job-applications">
      <h2>Job Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title</th>
            <th>Job Location</th>
            <th>About</th>
            <th>LinkedIn Link</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.firstName}</td>
              <td>{application.lastName}</td>
              <td>{application.email}</td>
              <td>{application.phone}</td>
              <td>{application.jobTitle}</td>
              <td>{application.jobLocation}</td>
              <td>{application.about}</td>
              <td>
                <a href={application.linkedin}  className="link-button" target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
              <td>
                <a href={application.resumeURL}  className="link-button" target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplications;
