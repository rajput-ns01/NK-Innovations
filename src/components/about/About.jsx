import React from 'react';
import './about.css';
import person1 from '../assets/images/person1.jpg';
import person2 from '../assets/images/person2.png';
import person3 from '../assets/images/person3.png';
import person4 from '../assets/images/person4.png';
import logo1 from '../assets/images/logo1.png';
import logo2 from '../assets/images/logo2.png';
import logo3 from '../assets/images/logo3.png';
import logo4 from '../assets/images/logo4.png';
import logo5 from '../assets/images/logo5.svg';
import Header from '../home/Header';
import Footer from '../home/Footer';

const About = () => {
  return (
    <div>
      <Header />

      <section className="section-container">
        <div className="text-left">
          <h1>Your partner in building a <span>robotics-driven</span> future.</h1>
        </div>
        <div className="text-right">
          <p>
            At Mirai, we are dedicated to advancing robotics technology through our specialized talent solutions. Robotics plays a pivotal role in automating processes, enhancing efficiency, and driving innovation across industries. Our commitment to excellence ensures that our teams are at the forefront of creating impactful robotic solutions.
          </p>
          <p>
            We believe in harnessing the power of robotics to solve complex challenges and improve operational outcomes. Mirai's talented engineers and specialists are passionate about pushing the boundaries of robotics, driving positive change in how industries operate and innovate.
          </p>
          <p>
            Our approach to robotics is guided by a commitment to diversity, equity, and inclusion, ensuring that our innovations benefit society as a whole. Join us in shaping the future of robotics and transforming industries with cutting-edge technology.
          </p>
        </div>
      </section>

      <div className="team-container">
        <div className="team-member" style={{ backgroundColor: '#ffd1dc' }}>
          <img src={person1} alt="Emma Crabtree" />
          <h3>Emma Crabtree</h3>
          <h4>Founder & Director</h4>
          <p>"We believed there was a better world out there for robotics and AI, so we decided to build it!"</p>
        </div>
        <div className="team-member" style={{ backgroundColor: '#ffde59' }}>
          <img src={person2} alt="Sam Harvey" />
          <h3>Sam Harvey</h3>
          <h4>Robotics Engineer</h4>
          <p>"Mirai invests in cutting-edge robotics technology. It has helped me pioneer new solutions faster than expected."</p>
        </div>
        <div className="team-member" style={{ backgroundColor: '#ccffcc' }}>
          <img src={person3} alt="Drew Fivey" />
          <h3>Drew Fivey</h3>
          <h4>Data & Robotics Specialist</h4>
          <p>"The training and support at Mirai have propelled me through advancements in robotics and data science, driving impactful innovations."</p>
        </div>
        <div className="team-member" style={{ backgroundColor: '#b3d9ff' }}>
          <img src={person4} alt="Raaheel Mehmood" />
          <h3>Raaheel Mehmood</h3>
          <h4>AI & Robotics Consultant</h4>
          <p>"The support and forward-looking vision at Mirai are unmatched, paving the way for groundbreaking advancements in AI and robotics."</p>
        </div>
      </div>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-container">
          <div className="value-card">
            <img src={logo1} alt="Be Robotics Driven" />
            <h3>Be Robotics Driven</h3>
            <p>We are driven by our passion for robotics and use cutting-edge technology to create impactful solutions.</p>
          </div>
          <div className="value-card">
            <img src={logo2} alt="Win Everyday" />
            <h3>Win Everyday</h3>
            <p>Celebrate every milestone, as they contribute to our collective success in advancing robotics.</p>
          </div>
          <div className="value-card">
            <img src={logo3} alt="Be Bold" />
            <h3>Be Bold</h3>
            <p>We embrace bold ideas and innovations that redefine the possibilities in robotics.</p>
          </div>
          <div className="value-card">
            <img src={logo4} alt="Positive Energy" />
            <h3>Positive Energy</h3>
            <p>We believe in fostering a positive environment that fuels creativity and collaboration.</p>
          </div>
          <div className="value-card">
            <img src={logo5} alt="Continuous Improvement" />
            <h3>Continuous Improvement</h3>
            <p>We are committed to continuous improvement in robotics and AI, driving transformative change.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
