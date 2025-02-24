'use client'
import Login from '@/app/modals/Login';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { Circles } from 'react-loader-spinner';
import Swal from 'sweetalert2';

function ResetPassword() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
      });
    }
    setLoading(true);

    axios.post(`http://localhost:4800/api/website/users/reset-password`, { token, password })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successfully',
          text: response.data.message
        })
        .then(()=>{
          window.location.assign('/');
        })
        ;
        setLoginStatus(true);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to reset password.',
        });
      })
      .finally(() => {
        setLoading(false);
      })

  }
  return (
    <div className="w-full max-w-md mx-auto p-5 relative">
      <h1 className="text-2xl font-bold text-center">Reset Password</h1>
      <form className="mt-4" method="post" onSubmit={handleResetPassword}>
        <label className="block mb-2">New Password</label>
        <input
          type="password"
          name='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <label className="block mb-2">Confirm Password</label>
        <input
          type="password"
          name='confirmpasaword'
          id="confirmpassowrd"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Circles
            height="80"
            width="80"
            color="black"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      )}
       {
        loginStatus && (
          <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
        )
      }
    </div>
  )   
}

export default ResetPassword