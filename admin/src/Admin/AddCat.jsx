import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function AddCat() {
    const nav = useNavigate();
    const handleCategory = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/parent-category/create-category`, e.target)
            .then((response) => {
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
                    nav('/admin/dashboard/profile/viewcategory');
                });
                
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Add Category</h5>
                <form action="" method='post' onSubmit={handleCategory}>
                    <div className='p-3'>
                        <label htmlFor="" className='form-label'> Category Name </label>
                        <input type="text"
                            placeholder='Category Name'
                            className='form-control'
                            id='category-name'
                            name="name"
                        />
                        <label htmlFor="" className='form-label mt-3'> Category description </label>
                        <textarea
                            type="file"
                            className='form-control mb-3'
                            name="description"
                            id="category-description"
                        />
                        <div className='d-flex gap-4 align-items-center mt-3'>
                            <label htmlFor="" className='form-label'> Status </label>
                            <input
                                type="radio"
                                name="status"
                                id="category-status"
                                value={true}
                            /> Display
                            <input
                                type="radio"
                                name="status"
                                id="category-status"
                                value={false}
                            /> Hide
                        </div>


                        <button className='mt-4 btn btn-primary px-3 text-white' > Add Category </button>
                    </div>
                </form>


            </div>
        </>

    )
}

export default AddCat