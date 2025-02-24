'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {MdError } from 'react-icons/md'

function paymentFailed() {
    const {orderid} = useParams();
    const router = useRouter();
    const [time, setTime] = useState(10);

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

        axios.put(`http://localhost:4800/api/website/payment/update-payment-status/${orderid}`, {status: "failed"})
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })

    },[orderid])
    return (
        <div className='flex flex-col h-[40vh] justify-center items-center'>
            <div className='w-[40%]  shadow-lg flex flex-col justify-center items-center p-3'>
                <h2 className='text-lg font-semibold py-2 text-red-500'>Payment failed</h2>
                <div className="h-[40px] w-[40px] bg-red-600 rounded-full flex justify-center items-center py-2">
                    <MdError size={24} className='text-white' />
                </div>
                <p className='text-gray-600 py-3'> Sorry!! we couldn't process this payment for security reasons.</p>
                <p> You will be redirect to home page in {time} seconds</p>
            </div>

        </div>

  )
}

export default paymentFailed