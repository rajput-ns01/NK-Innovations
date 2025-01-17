import React from 'react';
import logo from '../assets/images/logo.png';
import section1Img from '../assets/images/section1.jpg';
import '../styles/styles.css';
import { Link } from 'react-router-dom';

const Section1 = () => {
  return (
    <section className="section1">
      <div className="text">
        <div className='sec1'>
        <img src={logo} className="logo" alt="" />
        <h1>Data Talent. Future Ready.</h1>
        </div>
        <p>At NK Innovations, we specialize in providing customized robotic products tailored to meet the unique needs of businesses. Our team of experts works closely with clients to design and develop cutting-edge robotic solutions that enhance productivity and operational efficiency across various industries.</p>
        <p>In addition to our customization services, we also offer a wide range of ready-made robotic products. Whether you're looking for industrial robots, autonomous vehicles, or service robots, our ready-made solutions are designed to meet the highest standards of performance, safety, and adaptability.</p>
        <p>We understand the transformative potential of robotics in automating complex tasks and revolutionizing industrial processes. Our commitment to diversity, equity, and inclusion ensures that our teams are at the forefront of creating ethical, sustainable, and inclusive robotic solutions that drive innovation in robotics technology.</p>
        <p>At NK Innovations, we believe that the future of robotics is shaped by both technological advancements and ethical considerations. Our dedicated engineers and AI specialists are pioneering the next generation of robotic systems that are safe, efficient, and adaptable to various industries.</p>

        <Link to="/about"><button className="browse-jobs">Learn More</button></Link>
      </div>
      <div className="image">
        <img src={section1Img} alt="" />
      </div>
    </section>
  );
}

export default Section1;
