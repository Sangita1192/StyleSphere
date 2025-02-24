'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post(`http://localhost:4800/api/website/users/forgot-password`, { email })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message || 'Password reset link sent to your email.',
          position: 'top-center',
          customClass: {
            popup: '!rounded-lg',
            title: '!text-lg !font-semibold !text-gray-800',
            htmlContainer: '!text-sm !text-gray-600',
            confirmButton: '!bg-black !text-white !px-4 !py-2 !rounded-md !text-sm'
          },
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to send reset password email.',
          position: 'top-center',
          customClass: {
            popup: '!rounded-lg',
            title: '!text-lg !font-semibold !text-gray-800',
            htmlContainer: '!text-sm !text-gray-600',
            confirmButton: '!bg-black !text-white !px-4 !py-2 !rounded-md !text-sm'
          },
        });
      })
      .finally(() => {
        setLoading(false);
      })
  }
  return (
    <>
      <section className="w-full my-[30px]">
        <section className='w-[90%] md:w-[70%] lg:w-[50%] m-auto  border-1'>
          <h1 className='text-2xl font-bold'>Forgot Password?</h1>
          <p className='text-sm py-2'>Please enter your email below and we will send you a link to reset your password.</p>
          <form method="post" className='flex flex-col py-2' onSubmit={handleSubmit}>
            <label htmlFor="email" className='w-full font-semibold'>Email Address:</label>
            <input
              type="email"
              className='my-[5px] w-[90%] md:w-[70%] lg:w-[50%] p-2 border rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Enter your email'
            />
            <button
              className='bg-[navy] max-w-fit text-white px-[15px] py-[10px] my-[10px] rounded-lg'
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </section>
      </section>
      <div className='absolute  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>

    </>
  )
}
