import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage,db } from '../../lib/firebase'; // Adjust the import path as needed
import './Description.css';

const JobPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const jobTitle = params.get('title');
  const jobLocation = params.get('location');

  const jobs = [
    {
      title: "SR. IT Specialist / IT Manager",
      location: "Morton Grove, IL",
      type: "Direct Hire",
      salary: "$70,000 - $85,000",
      description: "The Sr. IT Specialist is responsible for both hands on and strategic IT planning. He/she will take responsibility for all IT delivery aspects including scheduling, communication, maintenance support and management of 3rd party vendors, as well as ensuring quality of service, security and best practice adopted in line with corporate standards and policies. The ideal candidate must be extremely hands on technically, and providing a high level of technical support for our expanding operations."
    },
    {
      title: "Sales Representative (Normal, IL)",
      location: "Normal, IL",
      type: "Full-Time",
      salary: "$45,000 - $55,000",
      description: "The Sales Representative is responsible for developing and maintaining customer relationships, achieving sales targets, and ensuring customer satisfaction. The ideal candidate has excellent communication skills, a strong work ethic, and a proven track record in sales."
    },
    {
      title: "Key Account Manager (Greenville, WI)",
      location: "Greenville, WI",
      type: "FULL-TIME",
      salary: "$75,000 - $90,000",
      description: "The Key Account Manager will manage and develop relationships with major clients, ensuring their needs are met and maximizing sales opportunities. Responsibilities include developing account strategies, coordinating with internal teams, and achieving sales targets."
    },
    {
      title: "Service Manager (Wisconsin Rapids, WI)",
      location: "Wisconsin Rapids, WI",
      type: "FULL-TIME",
      salary: "$65,000 - $75,000",
      description: "The Service Manager will oversee the service department, ensuring that customer service standards are met and that service operations run smoothly. Responsibilities include managing service staff, handling customer inquiries, and improving service processes."
    },
    {
      title: "Management Trainees (Maywood, IL)",
      location: "Maywood, IL",
      type: "FULL-TIME",
      salary: "$60,000 - $61,000",
      description: "The Management Trainee program is designed to provide hands-on training in various aspects of the business. Trainees will rotate through different departments, gaining a comprehensive understanding of the company operations and preparing for future leadership roles."
    },
    {
      title: "Service Supervisor (X2) - Maywood, IL",
      location: "Maywood, IL",
      type: "FULL-TIME",
      salary: "$65,000 - $75,000",
      description: "The Service Supervisor will oversee service teams, ensuring high-quality service delivery and customer satisfaction. Responsibilities include managing service staff, coordinating with other departments, and implementing service improvements."
    }
    // Add other job details here
  ];


  const job = jobs.find(job => job.title === jobTitle && job.location === jobLocation);

  const [resumeFile, setResumeFile] = useState(null);

  if (!job) {
    return <div className="container4"><h1>Job not found</h1></div>;
  }

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
      jobTitle: job.title,
      jobLocation: job.location,
    };

    if (resumeFile) {
      const storageRef = ref(storage, `resumes/${resumeFile.name}`);
      await uploadBytes(storageRef, resumeFile);
      const resumeURL = await getDownloadURL(storageRef);
      applicantData.resumeURL = resumeURL;
    }

    try {
      const docRef = await addDoc(collection(db, "applicants"), applicantData);
      console.log("Document written with ID: ", docRef.id);
      alert("Application submitted successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("There was an error submitting your application.");
    }
  };

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

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
