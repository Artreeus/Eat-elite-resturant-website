import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../assets/home/flat-lay-tomato-salad-with-feta-cheese-rucola-copy-space.jpg';
import img2 from '../../../assets/home/tasty-pizza-near-ingredients.jpg';
import img3 from '../../../assets/home/top-view-delicious-food-table.jpg';

const Banner = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        console.log("Search term:", searchTerm);
        // Implement search functionality here
    };

    return (
        <Carousel className='text-center border-rounded'>
            <div className="relative">
                <img src={img3} alt="Slide 1" />
                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-6">
                    <h2 className="text-6xl font-bold">Start Your Day Right</h2>
                    <p className="text-lg my-7">Discover our delicious breakfast options to kickstart your morning</p>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Search for breakfast items..."
                        />
                        <button onClick={handleSearch} className="btn ml-2">Search</button>
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src={img2} alt="Slide 2" />
                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-6">
                    <h2 className="text-6xl font-bold">Midday Meals</h2>
                    <p className="text-lg my-7">Explore our lunch menu for a satisfying and nutritious midday meal</p>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Search for lunch items..."
                        />
                        <button onClick={handleSearch} className="btn ml-2">Search</button>
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src={img1} alt="Slide 3" />
                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-6">
                    <h2 className="text-6xl font-bold">End Your Day Deliciously</h2>
                    <p className="text-lg my-7">Check out our dinner options to wind down your day with a perfect meal</p>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Search for dinner items..."
                        />
                        <button onClick={handleSearch} className="btn ml-2">Search</button>
                    </div>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;
