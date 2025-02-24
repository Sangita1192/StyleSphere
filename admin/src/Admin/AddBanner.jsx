import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Banner = () => {
    const nav = useNavigate();
    const [imgPreview, setImgPreview] = useState(null);
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);

    const handleImgPreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImgPreview(url);
            setFormData({ ...formData, image: file });
        }
    };
    const handleAddBanner = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formElement = e.target; // The form element
        const formData = new FormData(formElement); // Create FormData from the form

        // Manually append start and end dates as they are not included in FormData automatically
        formData.append('start_date', startDate ? startDate.toISOString() : null);
        formData.append('end_date', endDate ? endDate.toISOString() : null);

        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/banner/create-banner`, formData)
            .then((response) => {
                console.log(response.data);
                let timerInterval;
                Swal.fire({
                    title: "Banner Added!!",
                    html: "Redirecting to view Banner in <b></b> milliseconds.",
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
                        nav('/admin/dashboard/profile/viewbanner');
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div className="row m-3 rounded-3 shadow-lg">
            <h5 className="px-2 py-3 bg-dark-subtle rounded-top-3">Add Banner</h5>
            <form className="p-5 pt-2" method="post" onSubmit={handleAddBanner}>
                <label htmlFor="title" className="form-label">Banner Title</label>
                <input
                    type="text"
                    placeholder="Banner Title"
                    className="form-control mb-3"
                    name="title"
                    id="title"
                />
                <label htmlFor="subtitle" className="form-label">Heading</label>
                <input
                    type="text"
                    placeholder="Subtitle"
                    className="form-control mb-3"
                    name="subtitle"
                    id="subtitle"
                />
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input
                        className="form-control"
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImgPreview}
                    />
                    {imgPreview && <img src={imgPreview} className="mt-3 w-25" />}
                </div>
                <label htmlFor="link" className="form-label">Link</label>
                <input
                    type="text"
                    placeholder="Link of the page"
                    className="form-control mb-3"
                    name="link"
                    id="link"
                />
                <label htmlFor="startDate" className="form-label me-2">Start Date</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Select Start Date"
                    id="start_date"
                    name="start_date"
                />
                <label htmlFor="endDate" className="form-label mx-2">End Date</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Select End Date"
                    id="end_date"
                    name="end_date"
                />
                <div className="d-flex gap-4 align-items-center mt-3">
                    <label htmlFor="isFallback" className="form-label">IsFallback</label>
                    <input
                        type="radio"
                        value={true}
                        name="isFallback"
                    />
                    Display
                    <input
                        value={false}
                        type="radio"
                        name="isFallback"
                    /> Hide
                </div>
                <button
                    className="mt-4 btn btn-primary px-3 text-white"
                    type="submit"
                >
                    Add Banner
                </button>
            </form>
        </div>
    );
};

export default Banner;