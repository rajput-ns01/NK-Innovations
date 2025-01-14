import React from 'react';
import Card from './Card'; 
import './solutions.css';
import solution1 from '../assets/images/solution1.svg';
import solution2 from '../assets/images/solution2.svg';
import solution3 from '../assets/images/solution3.svg';
import Header from '../home/Header';
import Footer from '../home/Footer';
import { Link } from 'react-router-dom'; 

const Solutions = () => {
    return (
        <div>
            <Header/>
            <div className="container2">
                <Card
                    imgSrc={solution1}
                    altText="Customized Robotics Products Icon"
                    title="Customized Robotics Products"
                    subtitle="Tailored Solutions for Unique Needs"
                    whoFor="Industries and individuals seeking personalized robotic products for specific applications."
                    whatFor="We specialize in customizing robotics products such as robotic arms, autonomous vehicles, and service robots to meet your unique requirements."
                    included={[
                        "Robotic Arms (Industrial, Collaborative)",
                        "Autonomous Vehicles (Drones, AGVs, Autonomous Cars)",
                        "Service Robots (Healthcare, Domestic, Hospitality)",
                        "Educational Robots (STEM kits, Competition Robots)",
                        "Exploration Robots (Space, Underwater, Military)"
                    ]}
                    payment="Pricing based on customization level and project scope."
                />

                <Card
                    imgSrc={solution2}
                    altText="Ready-Made Robotics Products Icon"
                    title="Ready-Made Robotics Products"
                    subtitle="Pre-Built Solutions for Quick Implementation"
                    whoFor="Businesses and individuals looking for high-quality, ready-to-use robotics products."
                    whatFor="We offer a range of ready-made robotics products including motors, sensors, controllers, and fully assembled robots. Perfect for those who need reliable solutions without customization."
                    included={[
                        "Motors and Actuators",
                        "Sensors for Various Applications",
                        "Controllers (Standard and Advanced)",
                        "Pre-Assembled Robotic Kits",
                        "User Manuals and Support"
                    ]}
                    payment="Competitive pricing with bulk discounts available."
                />

                <Card
                    imgSrc={solution3}
                    altText="Support and Maintenance Icon"
                    title="Support and Maintenance"
                    subtitle="Ensuring Optimal Performance"
                    whoFor="Clients who want to maintain and optimize their robotic systems."
                    whatFor="Our dedicated support team ensures your robotics systems operate at peak performance with regular maintenance, updates, and troubleshooting."
                    included={[
                        "Routine Maintenance Services",
                        "On-Demand Troubleshooting",
                        "Hardware and Software Upgrades",
                        "Comprehensive Training Programs",
                        "24/7 Customer Support"
                    ]}
                    payment="Flexible service contracts based on your requirements."
                />
            </div>
            <div className="contact-section">
                <div className="contact-content">
                    <h2>Contact Us</h2>
                    <p>Have questions about our solutions or want to discuss your project needs? Reach out to us!</p>
                    <Link to="/contact" className="contact-button">Get in Touch</Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Solutions;
