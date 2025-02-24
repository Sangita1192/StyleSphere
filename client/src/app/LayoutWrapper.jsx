"use client"
import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function LayoutWrapper({ children }) {

  let [removeCommons, setRemoveCommons] = useState(false)
  const router = usePathname(); //to set removeCommons dynamically.


  return (
    <main className="bg-[#F9F9F9]">
      <Header />
      {/* {removeCommons && <Header /> } */}
      {children}
      <ToastContainer className="mt-[70px]"
        position="top-right"
        autoClose={800}
        newestOnTop={false}
        closeOnClick
      />
      {/* {removeCommons && <Footer /> } */}
      <Footer />
    </main>
  );
}