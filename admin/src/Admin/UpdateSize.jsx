import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateSize() {
    const {id} =useParams();
    const nav = useNavigate();
    const [fetchSize, setfetchSize] = useState({});

    const fetchSizeCategory =()=>{
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/size/view-size/${id}`)
        .then((response)=>{
            console.log(response.data);
            setfetchSize(response.data.data);
        })
        .catch((error)=>{
            console.log(error);
        })    
    }

    useEffect(()=>{
        fetchSizeCategory();
    },[id])
    
    
    const updateSize =(e)=>{
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/size/update-size/${id}`, e.target)
        .then((response)=>{
            console.log(response.data);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Size Updated",
                showConfirmButton: false,
                timer: 1000
              });
              nav('/admin/dashboard/profile/viewsize');
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Update Size</h5>
                <form action="" method='post' onSubmit={updateSize}>
                    <div className='p-3'>
                        <label htmlFor="" className='form-label'> Size Name </label>
                        <input
                            type="text"
                            placeholder='Size Name'
                            className='form-control'
                            id='size-name'
                            name="name"
                            value={fetchSize.name}
                            onChange={(e)=> setfetchSize({...fetchSize, name:e.target.value})}
                        />
                        <label htmlFor="" className='form-label mt-3'> Size Order </label>
                        <input
                            type="text"
                            placeholder='Size Order'
                            className='form-control mb-3'
                            id='size-order'
                            name="order"
                            value={fetchSize.order}
                            onChange={(e)=>setfetchSize({...fetchSize, order:e.target.value})}
                        />
                       
                        <button className='mt-4 btn btn-primary px-3 text-white' > Update Size </button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default UpdateSize