import React from 'react';
import logo from '../assets/images/logo.jpg';
import section1Img from '../assets/images/section1.jpg';
import '../styles/styles.css';
import { Link } from 'react-router-dom';

const Section1 = () => {
  return (
    <section className="section1">
      <div className="text">
        <img src={logo} className="logo" alt="" />
        <h1>Data Talent. Future Ready.</h1>
        <p>As a specialist in Robotics and AI Talent Solutions, we lead the way in assembling cutting-edge teams that drive innovation in robotics technology. Our expertise spans across industries, enabling companies to leverage robotics for enhanced productivity and operational efficiency.</p>
        <p>At Mirai, we understand the transformative potential of robotics in automating complex tasks and revolutionizing industrial processes. Our commitment to diversity, equity, and inclusion ensures that our teams are at the forefront of creating inclusive and ethical robotic solutions.</p>
        <p>We believe that the future of robotics is driven not only by technological advancements but also by ethical considerations and sustainable practices. Mirai's dedicated engineers and AI specialists are pioneering the next generation of robotic systems that are safe, efficient, and adaptable.</p>
        <Link to="/about"><button className="browse-jobs">Learn More</button></Link>
      </div>
      <div className="image">
        <img src={section1Img} alt="" />
      </div>
    </section>
  );
}

export default Section1;
