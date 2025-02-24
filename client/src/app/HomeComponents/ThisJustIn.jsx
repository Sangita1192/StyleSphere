"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewlyArrivedProducts } from '../redux/slices/productSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ThisJustIn() {
    const dispatch = useDispatch();
    let [quickAdd, setQuickAdd] = useState(false);
    const [newlyArrivedProd, setNewlyArrivedProd] = useState([]);
    const [filepath, setFilepath] = useState('');

    const latestProducts = useSelector((state) => state.product.value);

    useEffect(() => {
        dispatch(fetchNewlyArrivedProducts());
    }, [dispatch]);

    useEffect(() => {
        if (latestProducts.data) setNewlyArrivedProd(latestProducts.data);
        if (latestProducts.filePath) setFilepath(latestProducts.filePath);
    }, [latestProducts]);


    return (
        <section className='max-w-[100%] px-[20px] py-[50px] my-[10px]'>
            <h3 className='md:text-[32px] text-[22px] mb-[25px] font-medium ps-[15px]'>New Arrivals</h3>
            <div className='w-[95%] m-auto'>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={5}
                    navigation
                    autoplay={{ delay: 2000 }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                        1440: { slidesPerView: 5 },
                    }}
                >
                    {
                        (newlyArrivedProd.length > 0) && (
                            newlyArrivedProd.map((product) => (
                                < SwiperSlide key={product._id} className='cursor-pointer group'>
                                    <div className=' w-full h-full'>
                                        <div className='group relative'>
                                            <span
                                                className='bg-black text-white absolute right-2 top-2 z-[9999] text-[10px] font-medium uppercase px-1 py-0.5'>
                                                {
                                                    (((product.mrp - product.price) / product.mrp) * 100).toFixed(0)
                                                }
                                                % off
                                            </span>
                                            <img
                                                className='h-[300px] w-full object-cover'
                                                src={filepath + product.thumbnail} alt="best seller product"
                                            />
                                            <img
                                                className='h-[300px] w-full z-[999] absolute top-0 group-hover:block hidden object-cover'
                                                src={filepath + product.secondary_thumbnail} alt="best seller product"
                                            />
                                            <button onClick={() => setQuickAdd(true)} className={`${setQuickAdd ? <QuickAddButton /> : ""} w-[95%] text-center box-border bg-white py-3 text-[14px] font-medium absolute bottom-2 translate-x-[-50%] left-[50%]  group-hover:block hidden`}>Quick Add
                                            </button>
                                        </div>
                                        <h5 className='text-[14px] flex gap-3 mt-2 font-semibold'>{product.name}
                                        </h5>
                                        <div className='text-[14px] font-medium '>
                                            ${product.price}
                                        </div>
                                        <ul className='group-hover:flex hidden mt-1 gap-[10px]'>
                                            {product.color.map((color) => (
                                                <li key={color._id} className={`w-[20px] h-[20px] border border-[gray] hover:border-[red] border-2 rounded-full`} style={{ backgroundColor: color.code }}>
                                                </li>
                                            )
                                            )}

                                        </ul>
                                    </div>
                                </SwiperSlide>
                            ))
                        )



                    }

                </Swiper>


            </div>
        </section >
    )
}



export function QuickAddButton() {
    return (
        <button className="w-full border border-green-600 py-1 ">
            <ul className="w-full border flex justify-around border-red-700">
                <li className="py-2 px-6 hover:bg-black hover:text-white">xl</li>
                <li className="py-2 px-6  hover:bg-black hover:text-white">xl</li>
                <li className="py-2 px-6  hover:bg-black hover:text-white">xl</li>
                <li className="py-2 px-6  hover:bg-black hover:text-white">xl</li>
                <li className="py-2 px-6  hover:bg-black hover:text-white">xl</li>
            </ul>
        </button>
    );
}
