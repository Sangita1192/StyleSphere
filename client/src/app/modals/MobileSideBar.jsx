"use client"
import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { IoMdAdd } from "react-icons/io";
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function MobileSideBar({ sidebarStatus, setSidebarStatus }) {
  const [parentCategory, setParentCategory]= useState([]);

  const category = useSelector((state)=>state.parentCategory.value);

  useEffect(()=>{
    setParentCategory(category.data);
    console.log('parentCat mobileSidebar==>',category);
  },[category])

  return (
    <section className={` ${sidebarStatus ? "translate-x-0" : "-translate-x-full"} z-99duration-300 transform absolute top-0 left-0 bg-[black] w-[90%] h-screen`}>
      <div className='flex justify-between p-3'>
        <img src="/images/title.jpg" alt="logo for the website" className='w-[150px] h-[70px]' />
        <MdClose size={28} onClick={() => setSidebarStatus(false)} />
      </div>
      <div className='my-2 border border-1 border-[white] rounded-[8px] p-3 bg-[lightgray]'>
        <Link href={"/pages/search"}>
          <CiSearch size={28} />
        </Link>
      </div>

      {/* <div className='flex flex-grow flex-col bg-[black]'>
        <button className='grow text-sm font-medium p-3 px-2'>This Just In</button>
        <button className='grow text-sm font-medium p-3  px-2'>Women</button>
        <button className='grow text-sm font-medium p-3  px-2'>Men</button>
        <button className='grow text-sm font-medium p-3  px-2'>Our Story</button>
      </div> */}
      <div className=' w-full h-full px-5'>
        <div>
          <Disclosure>
            <DisclosureButton className="py-3 text-[18px] font-semibold flex items-center justify-between border border-red-600 w-full">Women&apos;s New Arrivals
              <IoMdAdd size={20} fontWeight={400} />
            </DisclosureButton>
            <DisclosurePanel className=" duration-500 ">
              <ul className="space-y-2">
                <li className="text-[15px] font-semibold cursor-pointer hover:underline">
                  Shop All
                </li>
                <li className="text-[15px] font-semibold cursor-pointer hover:underline">
                  Tops
                </li>
                <li className="text-[15px] font-semibold cursor-pointer hover:underline">
                  Bottoms
                </li>
                <li className="text-[15px] font-semibold cursor-pointer hover:underline">
                  Jackets & Coats
                </li>
                <li className="text-[15px] font-semibold cursor-pointer hover:underline">
                  Blazers
                </li>
                <li className="text-[15px] font-semibold cursor-pointer hover:underline">
                  Dresses
                </li>
                <li className="text-[15px] font-semibold cursor-pointer hover:underline">
                  Accessories
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </div>

      </div>
    </section>
  )
}

