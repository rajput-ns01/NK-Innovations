import React, { useState } from 'react';
import JobCard from './JobCard';
import './jobs.css';
import Footer from '../home/Footer';
import Header from '../home/Header';

const JobSearch = () => {
  
  const jobListings = [
    {
      title: 'SR. IT Specialist / IT Manager',
      salary: '$70,000 - $85,000',
      location: 'Morton Grove, IL',
    },
    {
      title: 'Sales Representative (Normal, IL)',
      salary: '$45,000 - $55,000',
      location: 'Normal, IL',
    },
    {
      title: 'Key Account Manager (Greenville, WI)',
      salary: '$75,000 - $90,000',
      location: 'Greenville, WI',
    },
    {
      title: 'Service Manager (Wisconsin Rapids, WI)',
      salary: '$65,000 - $75,000',
      location: 'Wisconsin Rapids, WI',
    },
    {
      title: 'Management Trainees (Maywood, IL)',
      salary: '$60,000 - $61,000',
      location: 'Maywood, IL',
    },
    {
      title: 'Service Supervisor (X2) - Maywood, IL',
      salary: '$65,000 - $75,000',
      location: 'Maywood, IL',
    },
  ];

  return (
    <div>
      <Header/>
    <div className="container2">
     
      <div className="job-listings" id="job-listings">
        {jobListings.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            salary={job.salary}
            location={job.location}
          />
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default JobSearch;
