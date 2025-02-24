"use client"
import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBars, FaRegHeart } from "react-icons/fa6";
import { BsBagPlus } from "react-icons/bs";
import Login from '../modals/Login';
import Cart from '../pages/cart/page';
import MobileSideBar from '../modals/MobileSideBar';
import Link from 'next/link';
import { MenMegaMenu, OurStoryMegaMenu, ThisJustInMegaMenu, WomenMegaMenu } from './MegaMenu';
import TextSlider from './TextSlider';
import { useDispatch, useSelector } from 'react-redux';
import { verifyLogin } from '../redux/slices/userSlice';
import Cookies from 'js-cookie';
import { fetchParentCategory } from '../redux/slices/parentCategorySlice';
import { fetchActiveProductCategory } from '../redux/slices/productCategorySlice';
import { fetchActiveProducts } from '../redux/slices/productSlice';
import { fetchCart } from '../redux/slices/cartSlice';
import { fetchWishlist } from '../redux/slices/wishlistSlice';
import { MdOutlineLogout } from 'react-icons/md';
import { fetchOrderDetails } from '../redux/slices/orderSlice';




export default function Header() {

  let [loginStatus, setLoginStatus] = useState(false)
  let [cartStatus, setCartStatus] = useState(false);
  let [logoutStatus, setLogoutStatus] = useState(false);
  let [menuHover, setMenuHover] = useState(null);
  const [megaMenuHover, setMegaMenuHover] = useState(false); // Track if the mega menu itself is hovered
  let [sidebarStatus, setSidebarStatus] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [user, setUser] = useState({});
  const [item, setItem] = useState(null); // total cart products
  const [wishlistItem, setWishlistItem] = useState(null);


  //to call the slice functions
  const dispatch = useDispatch();

  //useSelector Hook, for using data from store
  const category = useSelector((state) => state.parentCategory.value);
  const userData = useSelector((state) => state.user.value);
  const cartData = useSelector((state) => state.cart.value);
  const wishlistData = useSelector((state) => state.wishlist.value);

  useEffect(() => {
    if (category.data) setParentCategories(category.data);
  }, [category]);

  useEffect(() => {
    //call fetch parent category reducer
    dispatch(fetchParentCategory());
    dispatch(fetchActiveProductCategory());
    const auth = Cookies.get('frankandoak_user');
    if (!auth) return;
    dispatch(verifyLogin(auth));
  }, [dispatch])

  //add userData to 'user'
  useEffect(() => {
    if (userData.data) setUser(userData.data);
  }, [userData]);

  //call Cart function if we get userId
  useEffect(() => {
    if (user._id) {
      dispatch(fetchCart(user._id));
      dispatch(fetchWishlist(user._id));
    };
  }, [user]);

  useEffect(() => {
    if (wishlistData.data.products) setWishlistItem(wishlistData.data.products.length);
  }, [wishlistData])

  useEffect(() => {
    if (cartData.data) {
      let total = 0;
      if (cartData.data.length > 1) {
        cartData.data.forEach((item) => {
          total += item.quantity;
        })
      } else {
        total = cartData.data.quantity;
      }
      setItem(total);
    }
  }, [cartData])

  //logout function remove cookies data and navigate to home page
  const handleLogout = () => {
    Cookies.remove('frankandoak_user');
    window.location.assign('/'); // Redirect and reload the page
  }

  return (
    <div className='sticky top-0 z-[9999] w-full'>
      <TextSlider />
      <header className='shadow-md py-2 lg:py-1 px-2 sm:px-4 md:px-10 bg-[#097969] text-white flex justify-between'>
        <div className='flex gap-2 sm:gap-4 lg:items-center justify-between basis-[100%] lg:basis-[15%]'>
          <span className='font-bold md:text-[18px] text-[15px] basis-[30%] lg:basis-[100%]'>
            <img src="/images/title.jpg" alt="" className='w-full' />
          </span>
          <div>
            <FaBars onClick={() => setSidebarStatus(true)} className='lg:hidden block h-7 text-[30px]' />
          </div>
          <MobileSideBar sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} />
        </div>
        <nav className=' basis-[30%] lg:basis-[84%] md:basis-[75%]  flex items-center justify-end lg:justify-between'>
          <div className='lg:block  hidden'>
            <ul className='flex gap-6 text-[15px] font-medium'>
              {
                parentCategories.map((cat, index) =>
                (
                  <li key={cat._id}
                    onMouseOver={() => setMenuHover(`${cat._id}`)}
                    onMouseOut={() => setMenuHover(null)}
                    className='hover:bg-[#96DED1] cursor-pointer hover:underline underline-offset-4 px-3 duration-500 p-2'>
                    <Link href={`/collections/${cat.name}`}>
                      {cat.name}
                    </Link>
                    {
                      menuHover == cat._id &&
                      (
                        <MenMegaMenu 
                        menuHover={menuHover} 
                        setMenuHover={setMenuHover}
                        megaMenuHover = {megaMenuHover}
                        setMegaMenuHover = {setMegaMenuHover} />
                      )
                    }
                    
                  </li>


                ))
              }
            </ul>
          </div>
          <ul className='gap-3 sm:gap-5 lg:flex hidden'>
            <li>
              <Link href={"/pages/search"}>
                <CiSearch className='sm:w-7 sm:h-7 h-5 w-5 hover:bg-[#96DED1]' />
              </Link>
            </li>
            <li className='cursor-pointer relative'
              onClick={() => {
                if (Object.keys(user).length === 0) {
                  setLoginStatus(true); // Open Login component if user is not logged in
                } else {
                  setLogoutStatus((prev) => !prev); // Toggle dropdown visibility if user is logged in
                }
              }}
            >
              <FaRegUserCircle className='sm:w-[22px] sm:h-7 h-5 w-[18px] hover:bg-[#96DED1] ' />
              <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
              <ul className={`w-[160px] unstyled shadow-sm bg-[#40B5AD] absolute top-[100%] left-[-150%] divide-y ${(Object.keys(user).length !== 0 && logoutStatus) ? 'block' : 'hidden'}`}>
                <li className='px-[10px] py-[5px] border border-bottom-[#2AAA8A]'> Profile </li>
                <Link href={`/user-dashboard/order/${user._id}`}>
                  <li className='px-[10px] py-[5px] border border-bottom-[#2AAA8A]'> Your Order</li>
                </Link>
                <Link href={'/user-dashboard/wishlist'}>
                  <li className='px-[10px] py-[5px] border border-bottom-[#2AAA8A]'>Your WishList</li>
                </Link>
                <li
                  className='px-[10px] py-[5px]'
                  onClick={handleLogout}
                > Logout
                </li>
              </ul>

            </li>
            <li className='cursor-pointer flex items-end justify-center gap-[3px]'>
              <Link href={"/user-dashboard/wishlist"}>
                <FaRegHeart className='sm:w-[22px] sm:h-7 h-5 w-[18px] cursor-pointer hover:bg-[#96DED1]' />
              </Link>
              <span className={`text-[16px]`}>
                {wishlistItem == null || wishlistItem < 1 ? '0' : wishlistItem}
              </span>
            </li>
            <li className='cursor-pointer flex items-end justify-center gap-[3px]' >
              <BsBagPlus className='sm:w-[22px] sm:h-7 h-5 w-[18px] hover:bg-[#96DED1] ' onClick={() => setCartStatus(true)} />
              <span className={`text-[16px]`}>
                {item == null || item < 1 ? '0' : item}
              </span>
              <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}


