'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import Link from 'next/link';


const MostViewedProducts = () => {
    const [viewedProducts, setViewedProducts] = useState([]);
    const [filepath, setFilepath] = useState('');

    const fetchMostViewedProducts = () => {
        axios.get(`http://localhost:4800/api/website/products/most-viewed-products`)
            .then((response) => {
                setViewedProducts(response.data.data);
                setFilepath(response.data.filePath);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchMostViewedProducts();
    }, [])


    return (
        <>
            <section className='bg-[#E8F2FB] max-w-[100%] py-[50px] px-[25px]'>
                <div className='flex items-center justify-between px-[15px] mb-3'>
                    <h3 className='md:text-[32px] text-[22px] font-medium'>Most Viewed Products</h3>
                </div>

                <div className='relative'>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={50}
                        slidesPerView={5}
                        navigation
                        autoplay={{ delay: 3000 }}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                            1440: { slidesPerView: 5 },
                        }}
                    >

                        {
                            (viewedProducts.length > 0) &&
                            viewedProducts.map((product) => (
                                <>
                                    <SwiperSlide key={product._id}>
                                        <img src={filepath + product.thumbnail}
                                            alt=""
                                            className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-cover rounded-md"
                                        />
                                        <Link href={`/product/product-details/${product._id}`}>
                                            <p className='font-semibold hover:underline'>{product.name}</p>
                                        </Link>
                                    </SwiperSlide>
                                </>
                            ))
                        }
                    </Swiper>
                </div>
            </section >
        </>
    )
}

export default MostViewedProducts