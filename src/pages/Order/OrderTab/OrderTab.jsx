import React from 'react';
import FoodCard from '../../../components/FoodCard/FoodCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import './OrderTab.css'; // Import your custom CSS

const OrderTab = ({ items }) => {
    // Function to chunk the items array
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const chunkedItems = chunkArray(items, 6);

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    };

    return (
        <div>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    chunkedItems.map((chunk, chunkIndex) => (
                        <SwiperSlide key={chunkIndex}>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                {
                                    chunk.map(item => (
                                        <FoodCard
                                            key={item._id}
                                            item={item}
                                        />
                                    ))
                                }
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default OrderTab;
