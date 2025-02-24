"use client"
import { fetchProduct } from "@/app/redux/slices/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'next/navigation';
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";
import axios from "axios";
import { fetchWishlist } from "@/app/redux/slices/wishlistSlice";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { pid } = useParams();
  const dispatch = useDispatch();
  let [faq, setFaq] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [product, setProduct] = useState([]);
  const [ifItemInWishlist, setIfItemInWishlist] = useState(false);

  const userData = useSelector((state) => state.user.value);
  const productData = useSelector((state) => state.product.value);
  const wishListData = useSelector((state) => state.wishlist.value);
  const filepath = productData?.filePath;

  const user = userData?.data?._id;


  useEffect(() => {
    dispatch(fetchProduct(pid));
  }, [pid, dispatch]);

  // Update view count when the product details are successfully fetched
  useEffect(() => {
    if (pid) {
      // Trigger the view count update when the productId changes
      axios.get(`http://localhost:4800/api/website/products/view-count/${pid}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [pid]); // Trigger effect when productId changes

  useEffect(() => {
    if (productData.data) {
      setLoading(false);
      setProduct(productData.data);
    };
  }, [productData]);

  useEffect(() => {

    if (wishListData.data.products && product && product._id) {
      setIfItemInWishlist(wishListData.data.products.some((item) => item._id === product[0]._id));
    }
  }, [wishListData, product])

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

  const handleCart = (id) => {
    console.log('handleCart called');
    if (!user) {
      setLoginStatus(true); //trigger login modal if user isn't logged in
      return;
    }
    if (!selectedColor || !selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please select a size and color before adding to cart.",
      });
      return;
    }
    setLoading(true);
    const cartData = {
      user: user,
      product: id,
      color: selectedColor,
      size: selectedSize
    }
    axios.post('http://localhost:4800/api/website/cart/create-cart', cartData)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart',
          text: 'The item has been successfully added to your cart.',
          zIndex: 99999
        });
      })
      .then(() => {
        //refresh the page so that cart value updated
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the item to the cart.',
        });
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleWishList = (product) => {
    if (!user) {
      setLoginStatus(true);
      return;
    }

    //check if specific product already in list- remove from wishlist
    if (ifItemInWishlist) {
      //Remove from wishList
      axios.delete(`http://localhost:4800/api/website/wishlist/remove-from-wishlist`, { params: { user, product } }) // Send data as query parameters // Send data as query parameters)
        .then((response) => {
          setIfItemInWishlist(false);
          dispatch(fetchWishlist(user));
          toast.error("Remove From Wishlist");
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else {
      axios.post(`http://localhost:4800/api/website/wishlist/create-wishlist`, { user, product })
        .then((response) => {
          setIfItemInWishlist(true);
          dispatch(fetchWishlist(user));
          toast.success("Added to Wishlist");
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  return (
    <>
      {
        product.length <= 0 ? (
          <h1 className="text-center"> No Product Details Available... </h1>
        )
          :
          product.map((prod) => (
            <section key={prod._id} className="w-full grid lg:grid-cols-[60%_38%] md:grid-cols-[40%_60%] grid-cols-1 justify-between mt-[50px] p-2 ">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                <img src={filepath + prod.thumbnail} alt="" className="w-full h-full" />
                <img src={filepath + prod.secondary_thumbnail} alt="" className="w-full h-full" />
                {
                  prod.images && Array.isArray(prod.images) && prod.images.length > 0 ? (
                    prod.images.map((img, index) => (
                      <img key={index} src={filepath + img} alt="" className="w-full h-full" />
                    ))
                  ) : null
                }


              </div>
              <div className="p-10">
                <div className="text-[13px] font-medium">
                  {" "}
                  <span className="underline underline-offset-2">Home</span> /{" "}
                  <span className="underline underline-offset-2">{prod.parent_category.name}</span> /{" "}
                  <span className="underline underline-offset-2">New In</span>
                </div>
                <div className="py-5">
                  <span className="bg-black text-white text-[10px] font-medium uppercase p-1">
                    new
                  </span>
                  <h3 className="text-[24px] font-semibold mt-3 mb-5">
                    {prod.name}
                  </h3>
                  <div className="text-[16px] font-semibold mb-2">
                    <span> ${prod.price} </span>
                    <span className="text-gray-500 line-through ms-2"> ${prod.mrp} </span>
                  </div>
                  <p className="text-[13px] font-medium">
                    4 interest-free payments of ${prod.price / 4} with <b>Klarna</b>.{" "}
                    <u>Learn More</u>{" "}
                  </p>
                </div>
                <div className="py-8 border-y border-gray-300">
                  <p className="text-[14px] font-semibold mb-4">Select a size</p>
                  <div className="space-x-2">
                    {
                      prod.size.map((size) => (
                        <button
                          key={size._id}
                          className={`${selectedSize == size._id ? "shadow-[0_0_2px_5px_rgba(0,0,0,0.5)]" : ""} text-[14px] font-semibold py-2 px-2.5 border border-gray-300 hover:border-gray-600 uppercase`}
                          value={size._id}
                          onClick={() => setSelectedSize(size._id)}
                        >
                          {size.name}
                        </button>
                      ))
                    }
                  </div>
                </div>
                <div className="py-8 border-y border-gray-300">
                  <p className="text-[14px] font-semibold mb-4">Select Color</p>
                  <div className="space-x-2">
                    {
                      prod.color.map((color) => (
                        <button
                          key={color._id}
                          className={`w-[30px] h-[25px] ${selectedColor == color._id ? "shadow-[0_0_2px_5px_rgba(0,0,0,0.5)]" : ""} border border-[black]`}
                          style={{ backgroundColor: color.code }}
                          value={color._id}
                          onClick={() => setSelectedColor(color._id)}
                        >
                        </button>
                      ))
                    }
                  </div>
                </div>
                <div className="py-6 border-b border-gray-300">
                  <div className="grid grid-cols-[78%_13%] gap-3 relative ">
                    <button
                      className="bg-[#023020] text-[16px] font-semibold text-white py-5 px-10 w-full hover:bg-[#C1E1C1]"
                      onClick={() => handleCart(prod._id)}
                    >
                      Add to cart
                    </button>
                    {loginStatus && <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} />}
                    <button
                      className="py-5 border-2 border-[#023020] hover:bg-[#C1E1C1]"
                      onClick={() => handleWishList(prod._id)}
                      title={`${ifItemInWishlist ? 'Remove from Wishlist' : "Add to Wishlist"}`}
                    >
                      <svg className="mx-auto" width="20" height="20" viewBox="0 0 20 20" fill={`${ifItemInWishlist ? 'red' : "none"}`} xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3666 3.84123C16.941 3.4154 16.4356 3.07761 15.8794 2.84714C15.3232 2.61667 14.727 2.49805 14.1249 2.49805C13.5229 2.49805 12.9267 2.61667 12.3705 2.84714C11.8143 3.07761 11.3089 3.4154 10.8833 3.84123L9.99994 4.72457L9.1166 3.84123C8.25686 2.98149 7.0908 2.49849 5.87494 2.49849C4.65907 2.49849 3.49301 2.98149 2.63327 3.84123C1.77353 4.70098 1.29053 5.86704 1.29053 7.0829C1.29053 8.29876 1.77353 9.46482 2.63327 10.3246L3.5166 11.2079L9.99994 17.6912L16.4833 11.2079L17.3666 10.3246C17.7924 9.89894 18.1302 9.39358 18.3607 8.83736C18.5912 8.28115 18.7098 7.68497 18.7098 7.0829C18.7098 6.48083 18.5912 5.88465 18.3607 5.32844C18.1302 4.77222 17.7924 4.26686 17.3666 3.84123Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex gap-5 py-6 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                    <img src="images/blackTruck.svg" alt="" />
                    <p className="text-[13px] font-medium">
                      Free Shipping over $99
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="images/blackReturn.svg" alt="" />
                    <p className="text-[13px] font-medium">Free Returns</p>
                  </div>
                </div>
                <div className="py-6 border-b border-gray-30">
                  <h5 className="text-[18px] font-semibold mb-5">Overview</h5>
                  <p className="text-[14px] font-medium mb-4">{prod.description}</p>
                  {<p className="text-[14px] font-medium ">TENCEL™ Lyocell, a material made from regenerated cellulosic fibres sourced from sustainably managed forests. It offers superior softness, durability, and breathability.</p>}
                </div>
              </div>
            </section >
          ))
      }
    </>
  );
}
