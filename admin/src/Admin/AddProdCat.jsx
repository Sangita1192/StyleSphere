import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddProdCat() {
    const nav = useNavigate();

    const [parentCategory, setParentCategory] = useState([]);
    const [imgPreview, setImgPreview] = useState([]);

    const handleActiveParentCategory = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/parent-category/active-categories`)
            .then((response) => {
                setParentCategory(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCreateCategory = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/product-category/create-category`, e.target)
            .then((response) => {
                console.log(response.data);
                let timerInterval;
                Swal.fire({
                    title: "Category Added!!",
                    html: "Redirecting to View product category in <b></b> milliseconds.",
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
                        nav('/admin/dashboard/profile/viewproductcategory');
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleImgPreview = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImgPreview(url);
    }

    useEffect(() => {
        handleActiveParentCategory();
    }, [])

    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Add Product Category</h5>
                <form action="" method="post" onSubmit={handleCreateCategory}>
                    <div className='p-3'>
                        <label htmlFor="" className='form-label'> Category Name </label>
                        <input
                            type="text"
                            placeholder='Category Name'
                            className='form-control'
                            name='name'
                            id="category-name"
                        />
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Category Image</label>
                            <input
                                className="form-control"
                                type="file"
                                id="category-image"
                                name='thumbnail'
                                onChange={handleImgPreview}
                            />
                            {
                                (
                                    <img src={imgPreview} className='mt-3 w-25' />
                                )
                            }
                        </div>
                        <select className="form-select" aria-label="" name="parent_category">
                            <option value="default"> ----Select Parent Category----</option>
                            {parentCategory.map((category, index) => (
                                <>
                                    <option key={index} value={category._id}>{category.name}</option>
                                </>
                            ))}
                        </select>
                        <label htmlFor="" className='form-label mt-3'> Category description </label>
                        <textarea
                            className='form-control mb-3'
                            id='category-description'
                            name='description'
                        />
                        <div className="mb-3">
                            <label htmlFor='slug' className="form-label">Slug</label>
                            <input
                                className="form-control"
                                type="text"
                                id="slug"
                                name='slug'
                                placeholder="Slug"
                            />
                        </div>
                        <div className='d-flex gap-4 align-items-center mt-3'>
                            <label htmlFor="" className='form-label'> Featured Category </label>
                            <input
                                type="radio"
                                id="isFeatured"
                                value={true}
                                name="isFeatured"
                            /> Yes
                            <input
                                type="radio"
                                id="isFeatured"
                                value={false}
                                name="isFeatured"
                            /> No
                        </div>
                        <div className='d-flex gap-4 align-items-center mt-3'>
                            <label htmlFor="" className='form-label'> Status </label>
                            <input
                                type="radio"
                                id="categoryStatus"
                                value={true}
                                name="status"
                            /> Display
                            <input
                                type="radio"
                                id="categoryStatus"
                                value={false}
                                name="status"
                            /> Hide
                        </div>
                        <button type="submit" className='mt-4 btn btn-primary px-3 text-white' > Add Category </button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default AddProdCat