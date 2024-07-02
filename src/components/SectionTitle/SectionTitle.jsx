import React from 'react';

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="relative">
        <h3 className="text-4xl uppercase font-extrabold text-center text-white mb-4">
          {heading}
        </h3>
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full"></div>
      </div>
      <span className="text-lg text-gray-400 tracking-widest mb-4">
        {subHeading}
      </span>
    </div>
  );
};

export default SectionTitle;