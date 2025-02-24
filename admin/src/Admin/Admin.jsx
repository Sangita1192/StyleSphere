import React, { useEffect } from 'react';
import './../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

function Admin() {
  const nav = useNavigate();

  useEffect(()=>{
    const auth = Cookies.get('admin-credential');
    if(!auth) return ;
    verifyAdminLogin(auth);
  },[])

  const verifyAdminLogin = (auth)=>{
    axios.post(`${import.meta.env.VITE_API_URL}admin-panel/admin/verify-admin`, {auth})
    .then((response)=>{
      nav('/admin/dashboard/dashboard');
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_URL}admin-panel/admin/login`, e.target)
    .then((response)=>{
      console.log(response.data);
      ///saved admin credential into cookies
      Cookies.set('admin-credential', response.data.token,{ expires: 10 });   
      nav('/admin/dashboard/dashboard');
    })
    .catch((error)=>{
      if(error.status == 401){
        Swal.fire({
          title: "Invalid Credentials",
          text: "Invalid Email or Password",
          icon: "error"
        });
      }
        console.log(error);     
    })
  }

  return (
    <>
      <div className="container-fluid p-0 bg-secondary-subtle" >
        <div className="row justify-content-center align-items-center admin">
          <div className="col-5 p-lg-5 p-md-3 p-2 shadow-lg rounded-2 ">
            <h1>Login</h1>
            <p>Sign-in to your account</p>
            <form action="" method="post" onSubmit={handleLogin}>
              <div className='row'>
                <label htmlFor="" className='col-3 py-2 fs-6'>User Name: </label>
                <input
                  type="email"
                  placeholder='Enter your email'
                  className='col-9 py-2'
                  id="email"
                  name="email"
                />
              </div>
              <div className='row'>
                <label htmlFor="" className='col-3 py-2 fs-6'>Password: </label>
                <input
                  type="password"
                  placeholder='Enter your password'
                  className='col-9 py-2'
                  id="password"
                  name="password"
                />
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button className='btn btn-primary px-5' type="submit">Login </button>
                <p className='text-primary' role='button'> Forgot password? </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin