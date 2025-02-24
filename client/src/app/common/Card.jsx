"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCart } from "../redux/slices/cartSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Login from "../modals/Login";
import Swal from "sweetalert2";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchWishlist } from "../redux/slices/wishlistSlice";
import Link from 'next/link';

export function Card({ product, filepath }) {
  
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);

  const userData = useSelector((state) => state.user.value);
  const wishListData = useSelector((state) => state.wishlist.value);

  const user = userData?.data?._id;

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist(user)); // Fetch wishlist data when user is available
    }
  }, [user, dispatch]);


  useEffect(() => {
    if (wishListData.data.products) {
      // Check if the current product is in the wishlist
      setIsInWishlist(wishListData.data.products.some(item => item._id === product._id));
    }

  }, [wishListData, product])

  const handleAddToCart = (size) => {
    if (!user) {
      setLoginStatus(true); //trigger login modal if user isn't logged in
      return;
    }
    if (!selectedColor) {
      toast.warning("Select Color!!");
      return;
    }
    if (!selectedSize) {
      toast.warning("Please select size!")
      return;
    }
    setLoading(true);
    const cartData = {
      user: user,
      product: product._id,
      color: selectedColor,
      size
    }
    axios.post('http://localhost:4800/api/website/cart/create-cart', cartData)
      .then((response) => {
        dispatch(fetchCart(user));
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart',
          text: 'The item has been successfully added to your cart.',
          zIndex: 99999
        });
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

  //using toastify for messages in this function
  const handleWishList = (product) => {
    if (!user) {
      setLoginStatus(true);
      return;
    }

    //check if specific product already in list- remove from wishlist
    if (isInWishlist) {
      //Remove from wishList
      axios.delete(`http://localhost:4800/api/website/wishlist/remove-from-wishlist`, { params: { user, product } }) // Send data as query parameters // Send data as query parameters)
        .then((response) => {
          setIsInWishlist(false);
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
          setIsInWishlist(true);
          dispatch(fetchWishlist(user));
          toast.success("Added to Wishlist");
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
  return (
    <div className='cursor-pointer shadow-md shadow-slate-900 p-2 rounded-lg group relative'>
      {
        product &&
        <div className=' w-full h-full'>
        <div className='group relative'>
          <span className='bg-black text-white absolute right-2 top-2 z-[999] text-[8px] sm:text-[10px] font-medium uppercase px-0.5 sm:px-1 py-0.5'>
            {
              (((product.mrp - product.price) / product.mrp) * 100).toFixed(0)
            }
            % off
          </span>
          <img className='h-[300px] w-full object-cover' src={filepath + product.thumbnail} alt="Womens Denim" />
          <img className='h-[300px] w-full duration-300 z-[999] absolute top-0 group-hover:block hidden object-cover' src={filepath + product.secondary_thumbnail} alt="Womens Denim" />
          <button
            className='w-[95%] text-center box-border bg-blue-300  py-3 text-[14px] font-medium absolute bottom-2 left-[2%] z-[999]'
            onClick={() => handleAddToCart(selectedSize)}
          >
            Add to Cart
          </button>
          {loginStatus && <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} />}
        </div>
        <div className="flex justify-between items-center">
          <Link href={`/product/product-details/${product._id}`}>
            <h5 className="sm:text-[14px] text-[12px] flex gap-3 mt-2 font-semibold hover:underline">
              {product.name}
            </h5>
          </Link>
          <FaHeart
            title={`${isInWishlist ? 'Remove to Wishlist' : "Add to Wishlist"}`}
            className={`${isInWishlist ? 'text-[red]' : 'text-[#D3D3D3]'}`}
            onClick={() => handleWishList(product._id)}
          />
        </div>

        <div className='sm:text-[14px] text-[13px] font-medium mt-1 sm:mt-3'>
          <span> ${product.price} </span>
          <span className="text-gray-500 line-through ms-2"> ${product.mrp} </span>
        </div>
        <span className='sm:text-[16px] text-[12px] block'>{product.color.length} color</span>
        <div className='flex mt-1'>
          {
            product.length == 0 ?
              <div className="w-full text-center">---No Products Found---</div>
              :
              product.color.map((color, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => setSelectedColor(color._id)}
                      className={`${selectedColor == color._id ? "shadow-[0_0_2px_5px_rgba(0,0,0,0.5)]" : ""} me-3 sm:w-5 sm:h-5 h-3 w-3 rounded-full border border-black flex items-center justify-center`}
                      style={{ backgroundColor: color.code }}
                    >
                    </div>
                  </>
                )
              })
          }
        </div>
        <div className='mt-3'>
          <label htmlFor="size-select" className='block text-sm font-medium'>Select Size:</label>
          <select
            id="size-select"
            className="w-full p-2 border rounded text-sm"
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">-- Select Size --</option>
            {product.size.map((size) => (
              <option key={size._id} value={size._id}>{size.name}</option>
            ))}
          </select>
        </div>
      </div>
      }
      
    </div>
  )
}
