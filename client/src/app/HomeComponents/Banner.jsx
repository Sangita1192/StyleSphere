'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBanner } from '../redux/slices/bannerSlice';
export default function Banner() {
    const dispatch = useDispatch();
    const [banner, setBanner] = useState([]);
    const [filePath, setFilePath] = useState('');

    const bannerData = useSelector((state) => state.banner.value);

    useEffect(() => {
        if (bannerData.data) setBanner(bannerData.data);
        if (bannerData.filePath) setFilePath(bannerData.filePath);

    }, [bannerData])

    useEffect(() => {
        dispatch(fetchBanner());
    }, [dispatch])

    return (
        <section className='w-full'>
            {
                banner &&
                (
                    <div className='h-[350px] sm:h-[350px] md:h-[500px] lg:h-[600px] relative'>
                        <img className=' w-full h-full' src={filePath+banner.image}alt="Banner" />
                        <div className='absolute z-[99] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center'>
                            <h2 className='text-[44px] md:text-[78px] tracking-tighter font-semibold leading-tight  text-white '>{banner.title}</h2>
                            <h3 className='text-[20px] text-white md:text-[30px] font-medium tracking-tight'>{banner.subtitle}</h3>
                            <div className='md:space-x-7 space-y-5 mt-6'>
                                <button className='py-3 md:inline block px-12 md:px-14 text-white bg-[#023020] text-[18px] font-normal'>Women</button>
                                <button className='py-3 md:inline block px-[62px] md:px-16 text-white bg-[#023020] text-[18px] font-normal'>Men</button>
                            </div>
                        </div>
                        <BannerFeatures />
                    </div>
                )
            }

        </section>
    )
}


function BannerFeatures() {
    return (
        <div className='w-full  bg-[#023020] text-white py-4'>
            <ul className='flex md:space-x-20 space-x-0 justify-center md:items-start items-center md:gap-y-0 gap-y-3  flex-wrap'>
                <li className='flex md:basis-auto basis-[50%] sm:justify-normal md:justify-center items-center gap-2'>
                    <img className='w-5 h-5' src="/images/truck.png" alt="" />
                    <span className=' text-[12px] sm:text-[14px] font-medium'>Free Shipping over $99</span>
                </li>
                <li className='flex md:basis-auto basis-[50%] sm:justify-normal md:justify-center items-center gap-2'>
                    <img className='w-5 h-5' src="/images/return.png" alt="" />
                    <span className=' text-[12px] sm:text-[14px] font-medium'>Free Returns</span>
                </li>
                <li className='flex md:basis-auto basis-[50%] sm:justify-normal md:justify-center items-center gap-2'>
                    <img className='w-5 h-5' src="/images/earnpoints.webp" alt="" />
                    <span className=' text-[12px] sm:text-[14px] font-medium'>Earn Points</span>
                </li>
                <li className='flex md:basis-auto basis-[50%] sm:justify-normal md:justify-center items-center gap-2'>
                    <img className='w-5 h-5' src="/images/Sezzle.webp" alt="" />
                    <span className=' text-[12px] sm:text-[14px] font-medium'>Buy Now, Pay Later</span>
                </li>
            </ul>
        </div>
    )
}
