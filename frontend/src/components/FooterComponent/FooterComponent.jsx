import React from 'react';
import './FooterComponent.css'

const FooterComponent = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-column">
                        <h4>About Us</h4>
                        <p>We are committed to providing modern farming solutions for a sustainable future. Explore our tools, technologies, and expert advice to enhance your farming practices.</p>
                    </div>

                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Contact Us</h4>
                        <ul>
                            <li><a href="mailto:info@modernfarming.com">info@modernfarming.com</a></li>
                            <li>+1 234 567 890</li>
                            <li>Hyderabad</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} FarmOne. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;