import React, { useState, useEffect } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import axios from "axios";
import Swal from "sweetalert2";

const Secret = () => {
  const [upcomingData, setUpcomingData] = useState([]);

  useEffect(() => {
    fetch("https://final-project-server-rouge.vercel.app/upcoming")
      .then((response) => response.json())
      .then((data) => setUpcomingData(data))
      .catch((error) => console.error("Error fetching upcoming data:", error));
  }, []);

  const handleLike = (id) => {
    // Handle like button click for the item with the given id
    console.log("Liked item with ID:", id);
  };

  return (
    <div className="py-20">
      <SectionTitle subHeading="Don't Miss" heading="Our Upcoming Menu's" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingData.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl w-96 my-7">
            <figure>
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-64"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold mb-2">
                {item.title}
              </h2>
              <p className="text-sm">{item.description}</p>
              <div className="card-actions mt-4">
                <button
                  className="btn btn-primary mx-auto"
                  onClick={() => handleLike(item._id)}
                >
                  Like
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Secret;
