import React, { useRef } from 'react';
import './contact.css';
import Header from '../home/Header';
import Footer from '../home/Footer';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const ContactForm = () => {
    
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_hsp3k0g', 'template_833wa8m', form.current, {
        publicKey: 'oYyGy-uKnSESFjH47',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Message sent!")
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

    return (
        <div>
            <Header/>
        <div className="container1">
            <h1>Contact Us</h1>
            
            <div className="section">
                <h2>Get in Touch</h2>
                <p>If you have any questions, comments, or would like to learn more about our services, please fill out the form below. Our team will get back to you as soon as possible.</p>
            </div>
            
            <form ref={form} onSubmit={sendEmail}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="user_name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="user_email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
        <Footer/>
        </div>
    );
};

export default ContactForm;
