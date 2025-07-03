// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo & Description */}
        <div>
          <a href="/" className="flex items-center space-x-2 mb-4">
            {/* Re-use your VukaLink logo here */}
            <img src="/vukalink-logo.png" alt="VukaLink Logo" className="h-8" />
            <span className="text-2xl font-bold">VukaLink</span>
          </a>
          <p className="text-gray-400 text-sm">
            Connecting tertiary students and graduates to vetted industrial attachments and internships, making your job hunt effortless.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Features</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Benefits</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Testimonials</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Partners</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Career Guides</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Interview Tips</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">CV Templates</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Us & Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 mb-6">
            <li><a href="mailto:info@vukalink.com" className="text-gray-400 hover:text-white transition-colors duration-300">info@vukalink.com</a></li>
            <li><a href="tel:+233240000000" className="text-gray-400 hover:text-white transition-colors duration-300">+233 24 000 0000</a></li>
            <li className="text-gray-400">123 Internship Ave, Accra, Ghana</li>
          </ul>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      {/* Copyright Bar */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} VukaLink. All rights reserved. | Powered by Passion</p>
      </div>
    </footer>
  );
}

export default Footer;