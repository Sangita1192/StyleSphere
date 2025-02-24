'use client'
import BreadCrumb from "@/app/common/BreadCrumb";
import Header from "@/app/common/Header";
import React, { useEffect, useState } from "react";
import { AccountSideBar } from "../account/page";
import { Card } from "@/app/common/Card";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [filePath, setFilePath] = useState("");
  const [loading, setLoading] = useState(true);

  const wishListData = useSelector((state) => state.wishlist.value);

  useEffect(() => {
    if (wishListData.data) {
      if(wishListData.data.products) setWishlist(wishListData.data.products);
      setFilePath(wishListData.filePath);
      setLoading(false);
    }
  }, [wishListData])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval
          height={80}
          width={80}
          color="#4A90E2"
          secondaryColor="#A1D1FF"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
  return (
    <>
      <section className="pt-[60px] px-[30px]">
        <BreadCrumb
          prop1={"Home"}
          prop2={"My Account"}
          prop3={"Wishlist"}
        />
        <div className="grid lg:grid-cols-[20%_auto] grid-cols-1 gap-10">
          <AccountSideBar />
          <div>
            <div className="pb-10 border-b border-customBorder">
              <h3 className="md:text-[34px] text-[28px] font-medium">
                Wishlist
              </h3>
              <div className="py-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
              {
                  wishlist.length > 0 ? (
                    wishlist.map((product) => (
                      <Card 
                        key={product._id} 
                        product={product} 
                        filepath={filePath} 
                      />
                    ))
                  ) : (
                    <p>No items in your wishlist.</p>
                  )
                }
                
              </div>
            </div>
            <div className="md:pt-10 pt-5">
              <h3 className="md:text-[32px] text-[20px] font-medium">
                Picked Just For You
              </h3>
              <div className="md:py-10 py-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
                {/* <Card/>
              <Card/>
              <Card/>
              <Card/> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
