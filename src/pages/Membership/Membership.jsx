// Membership.js
import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Membership = () => {
  return (
    <div className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle subHeading="Member" heading="Become Our" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden min-h-full flex flex-col">
            <div className="px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Silver</h3>
              <p className="text-5xl font-extrabold text-gray-900 mb-4">$8<span className="text-base font-normal text-gray-500">/month</span></p>
            </div>
            <div className="border-t border-gray-200 flex-grow">
              <div className="px-6 py-4">
                <ul className="list-disc list-inside">
                  <li>Access to basic meal plans</li>
                  <li>Weekly menu suggestions</li>
                  <li>Basic nutrition tracking</li>
                </ul>
              </div>
            </div>
            <div className="px-6 py-4">
            <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden min-h-full flex flex-col">
            <div className="px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gold</h3>
              <p className="text-5xl font-extrabold text-gray-900 mb-4">$12<span className="text-base font-normal text-gray-500">/month</span></p>
            </div>
            <div className="border-t border-gray-200 flex-grow">
              <div className="px-6 py-4">
                <ul className="list-disc list-inside">
                  <li>Access to advanced meal plans</li>
                  <li>Personalized menu recommendations</li>
                  <li>Detailed nutrition tracking</li>
                </ul>
              </div>
            </div>
            <div className="px-6 py-4">
            <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden min-h-full flex flex-col">
            <div className="px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Platinum</h3>
              <p className="text-5xl font-extrabold text-gray-900 mb-4">$20<span className="text-base font-normal text-gray-500">/month</span></p>
            </div>
            <div className="border-t border-gray-200 flex-grow">
              <div className="px-6 py-4">
                <ul className="list-disc list-inside">
                  <li>Access to all meal plans</li>
                  <li>Personalized meal planning</li>
                  <li>Advanced nutrition tracking</li>
                  <li>Exclusive recipes</li>
                </ul>
              </div>
            </div>
            <div className="px-6 py-4">
            <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
