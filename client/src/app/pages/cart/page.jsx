"use client"
import { BsArrowLeft } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/app/redux/slices/cartSlice";
import axios from "axios";


export default function Cart({ cartStatus, setCartStatus }) {

  const [cart, setCart] = useState([]);
  const [filePath, setFilePath] = useState("");
  const [items, setItem] = useState(null);
  const [totalAmt, setTotalAmt] = useState(null);

  const cartData = useSelector((state) => state.cart.value);
  
  useEffect(() => {
    if (cartData.data) {
      setCart(cartData.data);
      setFilePath(cartData.filePath);

      if (cartData.data) {
        let total = 0;
        cartData.data.forEach(item => {
          total += item.product.price * item.quantity;
        })
        setTotalAmt(total);
        setItem(cartData.data.length);
      }
    }
  }, [cartData])

  
  return (
    <>
          <div className={`${cartStatus ? "opacity-100 visible" : "opacity-0 invisible"} duration-500 lg:w-[38%] w-full  fixed top-0 right-0 z-[999999] bg-white text-black h-screen flex-column overflow-y-scroll`}>
            <div onClick={() => setCartStatus(!cartStatus)} className='py-3 px-6 flex items-center gap-2 bg-[#F9F9F9] cursor-pointer'>
              <BsArrowLeft className='font-bold' />
              <div className='text-sm font-semibold'>Contine Shopping</div>
            </div>
            <div className=' bg-black text-[12px] text-center font-bold py-1.5'>Free shipping on orders $99+ and free returns</div>
            <div className='md:px-8 px-4 flex-grow-1'>
              {
                cart.map((product, index) => {
                  return (
                    <>
                      <CartProducts key={index} product={product} filePath={filePath} />
                    </>
                  )
                })
              }

            </div>
            <div className="sticky bottom-0 px-8 bg-[#f9f9f9] py-4 w-full">
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-semibold">Subtotal <span className="text-[14px] font-semibold text-customGray">({items} items)</span></div>
                <div className="text-[18px] font-semibold">${totalAmt}</div>
              </div>
              <Link href="/checkouts">
                <button
                  className="text-[20px] hover:shadow-[5px_5px_0px_0px_#DDD] font-semibold flex justify-center items-center gap-2 bg-black p-3 w-full mt-5 text-white"
                  onClick={() => setCartStatus(false)}
                >
                  Secure Checkout <IoLockClosedOutline size={20} />
                </button>
              </Link>
            </div>
           
          </div>

    </>
  )
}

function CartProducts({ product, filePath }) {
  const dispatch = useDispatch();
  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:4800/api/website/cart/delete-cartitem/${id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(fetchCart(product.user));
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleUpdateQuantity = (e) => {
    const quantity = (e.target.textContent == '+') ? product.quantity + 1 : product.quantity - 1;
    axios.put(`http://localhost:4800/api/website/cart/update-quantity/${e.target.value}`, { quantity })
      .then((response) => {
        console.log(response.data);
        dispatch(fetchCart(product.user));
      })
      .catch((error) => {
        console.log(error);
      })

  }
  return (
    <div className='grid grid-cols-[25%_auto] gap-3 py-5 border-b border-customBorder'>
      <img className='w-full' src={filePath + product.product.thumbnail} alt="" />
      <div className='flex flex-col justify-between'>
        <div>
          <div className='flex items-center justify-between'>
            <h5 className='text-sm font-semibold'>{product.product.name}</h5>
            <MdClose size={20} onClick={() => handleDeleteItem(product._id)} />
          </div>
          <div className='font-semibold text-[12px] text-customGray'>Size:{product.size.name}</div>
          <div className='text-[12px] mt-1.5 text-customGray font-medium flex items-center gap-1 underline underline-offset-2'>Move to Wishlist <CiHeart size={16} /></div>
        </div>
        <div className='flex items-center justify-between'>
          <div className=''>
            <button
              disabled={product.quantity <= 1}
              className='px-2.5 py-0.5 text--[20px] border border-customBorder'
              value={product._id}
              onClick={handleUpdateQuantity}>
              -
            </button>
            <button
              className='px-2.5 py-0.5 border border-customBorder'>
              {product.quantity}
            </button>
            <button
              className='px-2.5 py-0.5 text--[20px] border border-customBorder'
              value={product._id}
              onClick={handleUpdateQuantity}>
              +
            </button>
          </div>
        </div>
        <div className='text-[15px] font-semibold text-right'>
          <span> {product.product.price} * </span>
          <span> {product.quantity} = </span>
          <span> ${product.product.price * product.quantity}</span>
        </div>
      </div>
    </div>
  )
}
