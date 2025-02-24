'use client'
import { fetchCart } from '@/app/redux/slices/cartSlice';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SiTicktick } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux';

function PaymentSucess() {
    const  dispatch = useDispatch();
    const {orderid} = useParams();
    const router= useRouter();
    const [userId,setUserId] = useState('');
    const [time, setTime] = useState(10);

    const cartData = useSelector((state)=>state.cart.value);
    const userData = useSelector((state)=> state.user.value);

    // useEffect(()=>{
    //     if(cartData.data?.[0]?.user) console.log(cartData.data[0].user); 
    // },[cartData]);
    
    useEffect(()=>{
        if(userData.data?._id) setUserId(userData.data._id); 
    },[userData])

    const timerCount = ()=>{
        let count = time;
        const timespan = setInterval(()=>{  
            if(count >= 1){
                count --;
                setTime(count);
            }else{
                clearInterval(timespan);
                router.push('/');
            }
        },1000)
    }
    
    useEffect(()=>{
        timerCount();
        if(!orderid) return;
        axios.put(`http://localhost:4800/api/website/payment/update-payment-status/${orderid}`, {status: "success"})
        .then((response)=>{
            console.log("payment==>",response);
            axios.put(`http://localhost:4800/api/website/cart/delete-cartitems/${userId}`)
            .then((response)=>{
                console.log('deletecart==>', response);
                dispatch(fetchCart(userId));
            })
            .catch((error)=>{
                console.log(error);
            })
        })
        .catch((error)=>{
            console.log(error);
        })

    },[orderid, userId])
  return (
    <>
    <div className='flex flex-col h-[40vh] justify-center items-center'>
        <div className='w-[40%]  shadow-lg flex flex-col justify-center items-center p-3'>
            <h2 className='text-lg font-semibold py-2'>Payment Successfull</h2>
            <div className="h-[40px] w-[40px] bg-green-600 rounded-full flex justify-center items-center py-2">
                <SiTicktick size={20} className='text-white'/>
            </div>
            <p> You will be redirect to home page in {time} seconds</p>
        </div>

    </div>
    </>
  )
}

export default PaymentSucess