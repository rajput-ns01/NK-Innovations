import React from 'react';
import DataCard from './DataCard';

const Section2 = () => {
  return (
    <section className="section2">
      <div className="header">
        <h1>What We Do</h1>
        <p>At NK Innovations, we specialize in both customizing robotic solutions to fit your specific business needs and offering a wide range of ready-made robotic products for immediate deployment. Whether you're looking for advanced automation, AI-powered robotics, or collaborative solutions, we provide cutting-edge technology to enhance productivity and operational efficiency.</p>
      </div>
      <div className="card-container">
        <DataCard
          icon="🤖"
          title="Custom Robotics Solutions"
          frontContent="We design and develop customized robotic systems tailored to your unique business needs, optimizing operations and improving efficiency."
          backContent="Robotics Engineer, Robotics Process Automation (RPA) Developer, Automation Specialist"
        />
        <DataCard
          icon="🚀"
          title="AI-Powered Robotics"
          frontContent="Our AI-driven robotics solutions enable autonomous decision-making and adaptive learning to address complex industrial challenges."
          backContent="AI/Machine Learning Engineer, Robotics AI Specialist, Deep Learning Engineer"
        />
        <DataCard
          icon="🔧"
          title="Ready-Made Collaborative Robotics"
          frontContent="We offer ready-made collaborative robotics products designed to seamlessly integrate into your operations, improving productivity and flexibility."
          backContent="Collaborative Robotics Engineer, Robotics Integration Specialist"
        />
        <DataCard
          icon="📈"
          title="Robotics Process Automation (RPA)"
          frontContent="Our RPA solutions automate repetitive tasks, streamlining workflows and boosting operational efficiency across various industries."
          backContent="RPA Developer, Automation Analyst, Robotics Process Engineer"
        />
        <DataCard
          icon="🛠️"
          title="Ready-Made Robotics Engineering"
          frontContent="Our pre-designed robotics products are ready to deploy, offering effective solutions for a range of industries."
          backContent="Robotics Systems Developer, Robotics Project Manager"
        />
        <DataCard
          icon="🔐"
          title="Robotics Security & Compliance"
          frontContent="We ensure that all our robotics systems meet the highest security standards and regulatory requirements, protecting your data and business."
          backContent="Robotics Security Specialist, Compliance Engineer"
        />
      </div>
    </section>
  );
}

export default Section2;
