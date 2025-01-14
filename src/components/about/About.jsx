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
          <h1>Your partner in building <span>customized and ready-made</span> solutions.</h1>
        </div>
        <div className="text-right">
          <p>
            At Meera AI, we specialize in providing top-notch customized and ready-made products to meet the diverse needs of our clients. Our mission is to bridge the gap between imagination and reality by offering innovative solutions tailored to your specific requirements.
          </p>
          <p>
            Whether you're looking for personalized products or efficient ready-made options, we are committed to delivering excellence. Our team combines cutting-edge technology with customer-centricity to ensure your satisfaction and success.
          </p>
          <p>
            Join us in revolutionizing the way industries approach product development and customization. With Meera AI, you have a trusted partner to help bring your ideas to life.
          </p>
        </div>
      </section>

      <div className="team-container">
        <div className="team-member" style={{ backgroundColor: '#ffd1dc' }}>
          <img src={person1} alt="Emma Crabtree" />
          <h3>Emma Crabtree</h3>
          <h4>Founder & Director</h4>
          <p>"We believed in empowering customers with both flexibility and quality—Meera AI makes it happen every day!"</p>
        </div>
        <div className="team-member" style={{ backgroundColor: '#ffde59' }}>
          <img src={person2} alt="Sam Harvey" />
          <h3>Sam Harvey</h3>
          <h4>Product Development Specialist</h4>
          <p>"Meera AI has redefined how we deliver customized and ready-made solutions with speed and precision."</p>
        </div>
        <div className="team-member" style={{ backgroundColor: '#ccffcc' }}>
          <img src={person3} alt="Drew Fivey" />
          <h3>Drew Fivey</h3>
          <h4>Innovation Lead</h4>
          <p>"We thrive on pushing boundaries and delivering innovative products that meet our clients' unique demands."</p>
        </div>
        <div className="team-member" style={{ backgroundColor: '#b3d9ff' }}>
          <img src={person4} alt="Raaheel Mehmood" />
          <h3>Raaheel Mehmood</h3>
          <h4>Customer Experience Manager</h4>
          <p>"Ensuring customer satisfaction is at the heart of everything we do at Meera AI."</p>
        </div>
      </div>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-container">
          <div className="value-card">
            <img src={logo1} alt="Customer First" />
            <h3>Customer First</h3>
            <p>We prioritize understanding and fulfilling our clients' unique needs, ensuring their success.</p>
          </div>
          <div className="value-card">
            <img src={logo2} alt="Innovate Continuously" />
            <h3>Innovate Continuously</h3>
            <p>We embrace innovation to deliver top-quality customized and ready-made solutions.</p>
          </div>
          <div className="value-card">
            <img src={logo3} alt="Collaborate to Excel" />
            <h3>Collaborate to Excel</h3>
            <p>Working together with clients and teams ensures the best outcomes for all stakeholders.</p>
          </div>
          <div className="value-card">
            <img src={logo4} alt="Sustainability Matters" />
            <h3>Sustainability Matters</h3>
            <p>We are committed to eco-friendly practices in our product design and development processes.</p>
          </div>
          <div className="value-card">
            <img src={logo5} alt="Deliver Quality Always" />
            <h3>Deliver Quality Always</h3>
            <p>Excellence and reliability are at the core of every product we create.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
