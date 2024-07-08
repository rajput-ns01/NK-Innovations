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
                    altText="Robotics Automation Icon"
                    title="Robotics Automation"
                    subtitle="Comprehensive Automation Solutions"
                    whoFor="Businesses seeking to automate repetitive tasks and enhance operational efficiency through robotics."
                    whatFor="Our robotics automation solutions streamline your workflow, reduce human error, and increase productivity. We provide tailored automation systems to fit your specific business needs."
                    included={[
                        "Customized robotic systems",
                        "Integration with existing workflows",
                        "Ongoing maintenance and support",
                        "Training for your staff",
                        "Access to cutting-edge automation technology"
                    ]}
                    payment="Flexible payment plans based on project scope and requirements."
                />

                <Card
                    imgSrc={solution2}
                    altText="AI-Powered Robotics Icon"
                    title="AI-Powered Robotics"
                    subtitle="Intelligent Robotics Solutions"
                    whoFor="Organizations looking to implement advanced AI-driven robotics for complex problem-solving and decision-making tasks."
                    whatFor="Our AI-powered robotics solutions leverage artificial intelligence to perform complex tasks with precision and adaptability. From healthcare to manufacturing, we offer intelligent solutions to meet your industry's demands."
                    included={[
                        "AI integration with robotic systems",
                        "Real-time data analysis and decision-making",
                        "Custom solutions for specific industry needs",
                        "Comprehensive training and support",
                        "Access to the latest AI technologies"
                    ]}
                    payment="Customized pricing based on AI solution complexity and implementation scale."
                />

                <Card
                    imgSrc={solution3}
                    altText="Collaborative Robotics Icon"
                    title="Collaborative Robotics"
                    subtitle="Robotics for Team Collaboration"
                    whoFor="Businesses looking to enhance human-robot collaboration in the workplace for improved safety and productivity."
                    whatFor="Our collaborative robotics solutions enable robots to work safely alongside human workers. These systems are designed to enhance teamwork, improve safety, and boost productivity in various industrial and service settings."
                    included={[
                        "Human-robot interaction design",
                        "Safety and compliance features",
                        "Custom integration with existing workflows",
                        "Ongoing support and maintenance",
                        "Training programs for employees"
                    ]}
                    payment="Tailored pricing plans based on the level of integration and support required."
                />
            </div>
            <div className="contact-section">
                <div className="contact-content">
                    <h2>Contact Us</h2>
                    <p>Have questions about our robotics solutions or want to discuss your project needs? Reach out to us!</p>
                    <Link to="/contact" className="contact-button">Get in Touch</Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Solutions;
