import React, { useState } from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import './Support.css';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!(name && email && subject && message)) {
      toast.error('Please fill in all fields.');
      return;
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    try{
      await axios.post('http://localhost:5000/api/support',{
        name:name,
        email: email,
        subject : subject,
        message : message,
      },  {headers: {
        'Authorization': localStorage.getItem('authToken') }
      // Include the token in the Authorization header
    });
      toast.success("Message Sent");
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
    catch (error) {
        toast.error('Unable to Send');
    }
  };

  return (
    <div>
      <NavbarComponent />
      <ToastContainer />

      <section className="d-flex align-items-center justify-content-center pt-5">
        <div className="col-md-6">
          <h1 className="section-title text-center">Contact Us</h1>
          <form className="contact-section" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                aria-label="Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter your subject"
                aria-label="Subject"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea
                className="form-control"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                placeholder="Write your message"
                aria-label="Message"
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn submit-btn px-5" style={{ backgroundColor: '#6a4c93', color: '#fff' }}>Send Message</button>
            </div>
          </form>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Smart Sprout. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Support;
