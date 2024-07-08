import React from 'react';
import DataCard from './DataCard';

const Section2 = () => {
  return (
    <section className="section2">
      <div className="header">
        <h1>What We Do</h1>
        <p>Operating in both the UK and US robotics markets, we provide cutting-edge robotics solutions with expertise in automation, AI-driven robotics, and collaborative robotics. Our passion and expertise ensure we deliver tailored robotic solutions to meet your business needs.</p>
      </div>
      <div className="card-container">
        <DataCard
          icon="🤖"
          title="Advanced Robotics Solutions"
          frontContent="Our advanced robotics solutions integrate AI and automation to optimize manufacturing processes, improve operational efficiency, and enhance workplace safety."
          backContent="Robotics Engineer, Robotics Process Automation (RPA) Developer, Automation Specialist, Robotics Software Engineer"
        />
        <DataCard
          icon="🚀"
          title="AI-Powered Robotics"
          frontContent="Using artificial intelligence, our robotics solutions enable autonomous decision-making, adaptive learning, and real-time data analysis to tackle complex industrial challenges."
          backContent="AI/Machine Learning Engineer, AI Robotics Specialist, Robotics AI Research Scientist, Deep Learning Engineer"
        />
        <DataCard
          icon="🔧"
          title="Collaborative Robotics"
          frontContent="Our collaborative robotics solutions focus on human-robot interaction to improve productivity, flexibility, and safety in dynamic manufacturing environments."
          backContent="Collaborative Robotics Engineer, Human-Robot Interaction Specialist, Robotics Integration Engineer"
        />
        <DataCard
          icon="📈"
          title="Robotics Process Automation"
          frontContent="Automating routine tasks through robotics process automation (RPA) to streamline workflows and increase operational efficiency in various industries."
          backContent="RPA Developer, Automation Analyst, Process Automation Specialist, Robotic Process Engineer"
        />
        <DataCard
          icon="🛠️"
          title="Robotics Engineering & Development"
          frontContent="Designing and developing customized robotics solutions tailored to specific business needs, from concept to deployment and ongoing support."
          backContent="Robotics Engineer, Robotics Systems Developer, Robotics Software Architect, Robotics Project Manager"
        />
        <DataCard
          icon="🔐"
          title="Robotics Security & Compliance"
          frontContent="Ensuring robust security measures and regulatory compliance in robotics solutions to protect data integrity and maintain operational continuity."
          backContent="Robotics Security Specialist, Compliance Engineer, Robotics Data Protection Officer"
        />
      </div>
    </section>
  );
}

export default Section2;
