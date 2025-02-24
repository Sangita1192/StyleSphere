import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Slider() {
    const nav = useNavigate();
    const [imgPreview, setImgPreview] = useState([]);

    const handleImgPreview = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImgPreview(url);
    }
    const handleAddSlider = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/slider/create-slider`, e.target)
            .then((response) => {
                console.log(response.data);
                let timerInterval;
                Swal.fire({
                    title: "Story Added!!",
                    html: "I will close in <b></b> milliseconds.",
                    timer: 800,
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
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {

                    }
                });
                nav('/admin/dashboard/profile/viewslider');
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Add Slider</h5>
                <form className='p-5 pt-2' method='post' onSubmit={handleAddSlider}>
                    <label htmlFor="slider" className='form-label'> Slider Name </label>
                    <input
                        type="text"
                        placeholder='Slider Name'
                        className='form-control mb-3'
                        name='slider_name'
                        id="slider"

                    />
                    <label htmlFor="Heading" className='form-label'>Heading </label>
                    <input
                        type="text"
                        placeholder='Heading'
                        className='form-control mb-3'
                        name="heading"
                        id="heading"

                    />
                    <label
                        htmlFor="Sub-heading"
                        className='form-label'>
                        Sub Heading
                    </label>
                    <input
                        type="text"
                        placeholder='Sub Heading'
                        className='form-control mb-3'
                        id='sub_heading'
                        name="sub_heading"
                    />
                    <div className="mb-3">
                        <label htmlFor="Image"
                            className="form-label">
                            Image
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImgPreview}
                        />
                        {
                            (
                                <img src={imgPreview} className='mt-3 w-25' />
                            )

                        }
                    </div>
                    <div className='d-flex gap-4 align-items-center mt-3'>
                        <label htmlFor="" className='form-label'> Status </label>
                        <input
                            type="radio"
                            value={true}
                            name='status'
                        />
                        Display
                        <input
                            value={false}
                            type="radio"
                            name="status"
                        /> Hide
                    </div>
                    <button
                        className='mt-4 btn btn-primary px-3 text-white'
                        type='submit'
                    >
                        Add Slider
                    </button>
                </form>

            </div>
        </>
    )
}

export default Slider