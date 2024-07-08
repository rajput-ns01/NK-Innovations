import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ title, salary, location }) => (
  <div className="job-card" data-title={title} data-location={location}>
    <h2>{title}</h2>
    <p>{salary}</p>
    <p>{location}</p>
    <Link to={`/job?title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`}>
      <button>Learn More</button>
    </Link>
  </div>
);

export default JobCard;
