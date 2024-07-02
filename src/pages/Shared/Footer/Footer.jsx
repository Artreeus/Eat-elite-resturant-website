import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelopeOpen, FaFacebookF, FaTwitter, FaGooglePlusG, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mb-10">
          <div className="w-full md:w-1/3 mb-8 md:mb-0 px-4">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-pink-500 text-3xl mr-4" />
              <div>
                <h4 className="text-white font-semibold">Find us</h4>
                <span>1010 Avenue, sw 54321, Chandigarh</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0 px-4">
            <div className="flex items-center mb-4">
              <FaPhone className="text-pink-500 text-3xl mr-4" />
              <div>
                <h4 className="text-white font-semibold">Call us</h4>
                <span>9876543210</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0 px-4">
            <div className="flex items-center mb-4">
              <FaEnvelopeOpen className="text-pink-500 text-3xl mr-4" />
              <div>
                <h4 className="text-white font-semibold">Mail us</h4>
                <span>mail@info.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mb-10">
          <div className="w-full md:w-1/3 mb-8 md:mb-0 px-4">
            <div className="mb-4">
              <a href="index.html">
                <img src="https://i.ibb.co/W2pnqW8/141837-3031164-375573-image.jpg" alt="logo" className="w-28" />
              </a>
            </div>
            <p className="mb-4">
              Stay With Eat Elite To Enjoy Various Kinds Of Tasty And Healthy Foods.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-pink-500 transition">
                <FaFacebookF className="bg-blue-600 p-2 rounded-full text-2xl" />
              </a>
              <a href="#" className="text-white hover:text-pink-500 transition">
                <FaTwitter className="bg-blue-400 p-2 rounded-full text-2xl" />
              </a>
              <a href="#" className="text-white hover:text-pink-500 transition">
                <FaGooglePlusG className="bg-red-600 p-2 rounded-full text-2xl" />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3 mb-8 md:mb-0 px-4">
            <h3 className="text-white font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact', 'Our Services', 'Expert Team', 'Latest News'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-pink-500 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/3 mb-8 md:mb-0 px-4">
            <h3 className="text-white font-semibold mb-4">Subscribe</h3>
            <p className="mb-4">
              Don’t miss to subscribe to our new feeds, kindly fill the form below.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 mb-4"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 mt-1 mr-1 p-3 bg-pink-500 text-white rounded-md"
              >
                <FaTelegramPlane />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm px-4">
          <p className="text-center md:text-left mb-2 md:mb-0">
            &copy; 2024 All Right Reserved <a href="/" className="text-pink-500">Eat Elite</a>
          </p>
          <ul className="flex space-x-4 justify-center md:justify-end">
            {['Home', 'Terms', 'Privacy', 'Policy', 'Contact'].map((item, index) => (
              <li key={index}>
                <a href="#" className="hover:text-pink-500 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
