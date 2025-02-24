import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddSize() {
    const navigate = useNavigate();
    const AddSize = (e)=>{
        
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/size/create-size`,e.target)
        .then((response)=>{
            console.log(response.data);
            let timerInterval;
                Swal.fire({
                    title: "Category Added!",
                    html: "You will be redirecting to view page in <b></b> milliseconds.",
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* it will redirect to this page */
                    navigate('/admin/dashboard/profile/viewsize');
                });   
        })
        .catch((error) =>{
            console.log(error);
        })

    }

    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Add Size</h5>
                <form action="" method='post' onSubmit={AddSize}>
                    <div className='p-3'>
                        <label htmlFor="" className='form-label'> Size Name </label>
                        <input
                            type="text"
                            placeholder='Size Name'
                            className='form-control'
                            id='size-name'
                            name="name"
                        />
                        <label htmlFor="" className='form-label mt-3'> Size Order </label>
                        <input
                            type="text"
                            placeholder='Size Order'
                            className='form-control mb-3'
                            id='size-order'
                            name="order"
                        />
                        <div className='d-flex gap-4 align-items-center mt-3'>
                            <label htmlFor="" className='form-label'> Display </label>
                            <input
                                type="radio"
                                name="status"
                                id="size-status"
                                value={true}
                            /> Display
                            <input
                                type="radio"
                                name="status"
                                id="size-status"
                                value={false}
                            /> Hide
                        </div>
                        <button className='mt-4 btn btn-primary px-3 text-white' > Add Size </button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default AddSize