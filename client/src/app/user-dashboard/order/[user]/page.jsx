'use client'
import BreadCrumb from "@/app/common/BreadCrumb";
import React, { useEffect, useState } from "react";
import { AccountSideBar } from "../../account/page";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { fetchOrderDetails } from "@/app/redux/slices/orderSlice";

export default function Order() {
  const dispatch = useDispatch();
  const userId = useParams();
  const [orders, setOrders] = useState([]);
  const [filepath, setFilepath] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    dispatch(fetchOrderDetails(userId.user));
    
  },[userId,dispatch])

  const orderDetails = useSelector((state)=>state.order.value);
  console.log('orderDetails===>', orderDetails)

  useEffect(() => { 
      if (orderDetails.data)  setOrders(orderDetails.data);
      if (orderDetails.filePath) setFilepath(orderDetails.filePath);
      if(orderDetails.data) setLoading(false);  
  }, [orderDetails]);
  
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
          prop3={"Orders & returns"}
        />
        <div className="grid lg:grid-cols-[20%_auto] grid-cols-1 gap-10">
          <AccountSideBar />
          <div>
            <h3 className="md:text-[34px] text-[28px] font-medium">
              Orders & returns
            </h3>
            <div className="pt-5">
              <div className=" w-full border border-1 rounded-t-lg  bg-gray-200 pt-2 px-1 text-sm md:text-xl font-bold text-md pb-5">
                Order History
              </div>
              <div className=" w-full border border-bottom-black bg-gray-100 p-2">
                <ul className="grid grid-cols-7">
                  <li className="col-span-2 font-semibold">Order</li>
                  <li className="font-semibold">Quantity</li>
                  <li className="font-semibold">Amount</li>
                  <li className="font-semibold"> Status</li>
                  <li className="font-semibold">Order Details</li>
                  <li className="font-semibold">Return/Review</li>
                </ul>
              </div>
              {
                orders.length <= 0 ?
                  <p className="text-center">----No Order Details Exist----</p>
                  :
                  orders.map((order, index) => (
                    <div className=" w-full  bg-gray-100 p-2" key={order._id}>
                      <ul className="grid grid-cols-7 ">
                        <li className="col-span-2 flex gap-2 flex-wrap">
                          {order.items.map((img) => (
                            <img src={img.price_data.product_data.images[0]} alt="" className="w-[70px] h-[90px]" />
                          ))}
                        </li>
                        <li>
                          {order.items.reduce((total, item) => total + item.quantity, 0)}
                        </li>
                        <li>${order.amount}</li>
                        <li>{order.status == 'success' ? 'Delivered' : "Not Delivered"}</li>
                        <li>order details</li>
                        <li className="font-semibold">
                          {order.status == 'success' ? 'Return' : "Review"}
                        </li>
                      </ul>
                    </div>
                  ))
              }


              {/* <button className="border border-black hover:shadow-Btn-shadow py-2 px-16 text-[13px] font-medium">
                Shop Now
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
