import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../lib/firebase'; // Adjust the import path as needed
import './Description.css';

const JobPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const jobTitle = params.get('title');
  const jobLocation = params.get('location');

  const [job, setJob] = useState(null); // State to store job details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [resumeFile, setResumeFile] = useState(null);

  // Fetch job details from Firestore based on jobTitle and jobLocation
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobsCollection = collection(db, 'jobs');
        const q = query(jobsCollection, where('title', '==', jobTitle), where('location', '==', jobLocation));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const jobData = querySnapshot.docs[0].data(); // Assume there is one match
          setJob(jobData);
        } else {
          setJob(null); // No matching job found
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false); // Stop loading after the fetch is complete
      }
    };

    fetchJobData();
  }, [jobTitle, jobLocation]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const applicantData = {
      firstName: formData.get('first_name'),
      lastName: formData.get('last_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      linkedin: formData.get('linkedin'),
      about: formData.get('about'),
      jobTitle: job?.title,
      jobLocation: job?.location,
    };

    if (resumeFile) {
      const storageRef = ref(storage, `resumes/${resumeFile.name}`);
      await uploadBytes(storageRef, resumeFile);
      const resumeURL = await getDownloadURL(storageRef);
      applicantData.resumeURL = resumeURL;
    }

    try {
      const docRef = await addDoc(collection(db, 'applicants'), applicantData);
      console.log('Document written with ID:', docRef.id);
      alert('Application submitted successfully!');
    } catch (e) {
      console.error('Error adding document:', e);
      alert('There was an error submitting your application.');
    }
  };

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  if (loading) {
    return <div className="container4"><h1>Loading...</h1></div>;
  }

  if (!job) {
    return <div className="container4"><h1>Job not found</h1></div>;
  }

  return (
    <div className="container4">
      <div className="job-details">
        <h1 className="job-title">{job.title}</h1>
        <p className="job-location">Location: {job.location}</p>
        <p className="job-type">Type: {job.type}</p>
        <p className="job-salary">Salary: {job.salary}</p>
      </div>
      <div className="job-description">
        <h2 className="job-role-title">Job Role/Responsibility</h2>
        <p>{job.description}</p>
      </div>
      <div className="apply-section">
        <div className="apply-now">
          <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" placeholder="First Name *" required />
            <input type="text" name="last_name" placeholder="Last Name *" required />
            <input type="email" name="email" placeholder="Email Address *" required />
            <input type="tel" name="phone" placeholder="Phone Number" required />
            <input type="url" name="linkedin" placeholder="https://linkedin.com/in/" required />
            <input type="file" name="resume" onChange={handleFileChange} required />
            <textarea name="about" placeholder="Tell us about yourself" rows="4" required></textarea>
            <input type="submit" value="Apply Now" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
