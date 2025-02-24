'use client'
import { Card } from '@/app/common/Card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from 'react-redux';

export default function Search() {
    const [searchProducts, setSearchProducts] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState([]);
    const [trendingSearch, setTrendingSearch] = useState([]);
    const [filepath, setFilepath] = useState('');
    const [user, setUser] = useState(null);

    const userData = useSelector((state) => state.user.value);

    useEffect(() => {
        if (userData.data) setUser(userData.data._id);
    }, [userData])

    useEffect(() => {
        fetchSearchedKeyword(user);
    }, [user])

    useEffect(() => {
        fetchTrendingSearch();
    }, [])

    const handleSearchProduct = (e, keyword = null) => {
        e.preventDefault();
        const searchKeyword = keyword || e.target.search.value;
        axios.post(`http://localhost:4800/api/website/products/search-products/${searchKeyword}`)
            .then((response) => {
                console.log('searched Products==>', response.data.data);
                setSearchProducts(response.data.data);
                setFilepath(response.data.filePath);
                axios.post(`http://localhost:4800/api/website/search/add-search-keyword`, { user, keyword })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const fetchSearchedKeyword = () => {
        const url = user ? `/searched-keyword/${user}` : `/searched-keyword`
        axios.get(`http://localhost:4800/api/website/search${url}`)
            .then((response) => {
                setSearchKeywords(response.data.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const fetchTrendingSearch = () => {
        axios.get(`http://localhost:4800/api/website/search/trending-search`)
            .then((response) => {
                setTrendingSearch(response.data.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <section className='mt-20 w-full'>
            <form method='post' onSubmit={(e) => handleSearchProduct(e)} className='bg-white w-[95%] m-auto border border-dark-subtle rounded-lg flex flex-row gap-3 items-center px-5'>
                <input
                    className='w-full py-5 text-[18px] text-black border-none font-medium outline-none focus:border-none focus:ring-0'
                    type="search"
                    placeholder='Search Products'
                    name='search'
                />
                <button
                    className='sm:px-4 px-3 sm:py-2 py-1.5 rounded-full border border-black flex items-center justify-center'
                    type='submit'>
                    <BsArrowRight size={25} />
                </button>
            </form>
            <div className='grid lg:grid-cols-[20%_auto] md:grid-cols-[35%_auto] grid-cols-1 md:px-5 px-3 pt-24 py-5'>
                <div className='w-full md:h-screen h-full'>
                    <div className='border-b border-[#E2E9E7] mx-4 pb-6'>
                        <h4 className='text-[18px] font-medium pb-3'>Recent Searches</h4>
                        <ul className='space-y-2'>
                            {searchKeywords.length < 1 ?
                                <li className='text-[13px] cursor-pointer font-semibold hover:underline'>"No History Available"</li>
                                :
                                searchKeywords.map((keyword) => (
                                    <li key={keyword._id}
                                        className='text-[13px] cursor-pointer font-semibold hover:underline'
                                        onClick={(e) => handleSearchProduct(e, keyword.keyword)}
                                    >"{keyword.keyword}"</li>
                                ))
                            }

                        </ul>
                    </div>
                    <div className='mx-4 pb-6 pt-5'>
                        <h4 className='text-[18px] font-medium pb-3'>Trending Searches</h4>
                        <ul className=' flex flex-wrap items-center gap-2.5'>
                            {trendingSearch.length < 1 ?
                                <li className='text-[13px] cursor-pointer font-semibold hover:underline'>"No Trending Search History Available"</li>
                                :
                                trendingSearch.map((trending) => (
                                    <li>
                                        <button
                                            key={trending._id}
                                            className='border border-black p-1.5 text-[13px] font-semibold bg-white text-black hover:bg-black hover:text-white duration-300'
                                            onClick={(e) => handleSearchProduct(e, trending.keyword)}
                                        >{trending.keyword}</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className='w-full h-screen overflow-y-scroll scrollbar-hide'>
                    <h4 className='text-[18px] font-medium pb-2'>Searched Products</h4>
                    {
                        searchProducts.length < 1 ?
                            <div className="text-center fs-3 font-bold py-3 w-full">
                                ----No Results Found----
                            </div>
                            :
                            <div className='p-1 py-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-10'>
                                {searchProducts.map((product, index) => (
                                    <Card key={index} product={product} filepath={filepath} />
                                ))}
                            </div>
                    }



                </div>
            </div >
        </section >
    )
}
