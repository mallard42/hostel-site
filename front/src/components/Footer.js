import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="contain">
                <div className="footer-about">
                    <h1>About</h1>
                    <p className="">
                        Phasellus eu mollis dui. In vitae est eget est blandit mollis. 
                        Vestibulum ac condimentum nibh. Nunc velit odio, ultrices id dapibus eget, 
                        fermentum in lacus. Pellentesque ac diam et orci posuere blandit. Nullam 
                        tincidunt tristique sodales. Morbi cursus nisi eu sollicitudin faucibus. 
                        Vestibulum sed auctor mi, vel semper urna.
                    </p>
                </div>

                <div className="col">
                    <h1>Contact us</h1>
                    <p>Phone: 06.06.06.06.06</p>
                    <p>Adress: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium.</p>
                    <p>Mail: example@gmail.com</p>
                </div>

                <div className="col">
                    <h1>Quick links</h1>
                    <ul>
                        <li><Link to="/legal-notice" className="footer-link">Legal Notice</Link></li>
                        <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className="col social">
                    <h1>Social</h1>
                    <ul>
                        <li><a href="https://www.facebook.com/" className="footer-icon"><FaFacebookF /></a></li>
                        <li><a href="https://www.instagram.com/" className="footer-icon"><FaInstagram /></a></li>
                        <li><a href="https://twitter.com/" className="footer-icon"><FaTwitter /></a></li>
                    </ul>
                </div>
                <div className="clearfix"></div>
            </div>
        </footer>
    )
}

export default Footer;