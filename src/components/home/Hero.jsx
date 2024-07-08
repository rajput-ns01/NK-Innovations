// src/components/Hero.jsx
import React from 'react';
import videoSrc from '../assets/videos/Header-Video-02.mp4';
import '../styles/styles.css';
import { Link } from 'react-router-dom';




const Hero = () => {
  return (
    <main>
      <video autoPlay muted loop id="bg-video">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className="hero-content">
        <h1>MeeraAi</h1>
        <p>data talent • future ready</p>
        <Link to="/solutions"><button className="browse-jobs">browse solutions</button></Link>
      </div>
    </main>
  );
}

export default Hero;
