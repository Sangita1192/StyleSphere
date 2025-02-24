import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function ProdAdd() {
    const nav = useNavigate();
    const [parentCategory, setParentCategory] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState(null);
    const [selectedColors, setSelectedColors] = useState(null);
    const [imgPreview1, setImgPreview1] = useState([]);
    const [imgPreview2, setImgPreview2] = useState([]);
    const [multipleImgPreview, setMultipleImgPreview] = useState([]);


    const ActiveParentCategory = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/parent-category/active-categories`)
            .then((response) => {
                setParentCategory(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const fetchProductCategory = (e) => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/product-category/read-product-of-parent-category/${e.target.value}`)
            .then((response) => {
                setProductCategory(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const ActiveSizes = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/size/active-sizes`)
            .then((response) => {
                const newArr = response.data.data.map((size) => ({ ...sizes, value: size._id, label: size.name }))
                setSizes(newArr);  //this array will hold on value and label

            })
            .catch((error) => {
                console.log(error);
                console.log(response.data.data);
            })
    }
    const ActiveColors = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/color/active-colors`)
            .then((response) => {
                const newArr = response.data.data.map((color) => ({ ...colors, value: color._id, label: color.name }))
                setColors(newArr);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleImgPreview = (e) => {
        const { name, files } = e.target;

        if (name === 'thumbnail') {
            const file = files[0];
            const url = URL.createObjectURL(file);
            setImgPreview1(url);
        }
        else if (e.target.name === 'secondary_thumbnail') {
            const file = files[0];
            const url = URL.createObjectURL(file);
            setImgPreview2(url);
        }
        else if (name === "images") {
            const urls = Array.from(files).map((file) => URL.createObjectURL(file));
            setMultipleImgPreview((prev) => [...prev, ...urls]);
        }
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        console.log(e.target);
        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/products/create-product`, e.target)
            .then((response) => {
                let timerInterval;
                Swal.fire({
                    title: "Product Added!!",
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
                        console.log("I was closed by the timer");
                    }
                });
                nav('/admin/dashboard/profile/productview');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        ActiveParentCategory();
        ActiveColors();
        ActiveSizes();
    }, [])

    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-5 py-3 bg-dark-subtle rounded-top-3">Product Details</h5>
                <form action="" method='post' onSubmit={handleAddProduct}>
                    <div className='px-5 pt-2 pb-5'>
                        <label htmlFor="" className='form-label'> Product Name </label>
                        <input
                            type="text"
                            placeholder='Product Name'
                            className='form-control'
                            name="name"
                        />
                        <label htmlFor="" className='form-label mt-2'> Product description </label>
                        <textarea
                            className='form-control mb-3'
                            placeholder="product description"
                            name="description"
                        />
                        <label htmlFor="" className='form-label mt-2'> Short description </label>
                        <textarea
                            className='form-control mb-3'
                            placeholder="short description"
                            name="short_description"
                        />
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Product Image</label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                name='thumbnail'
                                onChange={handleImgPreview}
                            />
                            {
                                (
                                    <img src={imgPreview1} className='mt-3 w-25' />
                                )
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Image Animation</label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                name='secondary_thumbnail'
                                onChange={handleImgPreview}
                            />
                            {
                                (
                                    <img src={imgPreview2} className='mt-3 w-25' />
                                )
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Product Gallery</label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                name="images"
                                onChange={handleImgPreview}
                                multiple
                            />
                            <div className="mt-3 d-flex flex-wrap gap-2">
                                {multipleImgPreview.map((url, index) => (
                                    <img key={index} src={url} className="w-25" alt={`Preview ${index + 1}`} />
                                ))}
                            </div>
                        </div>
                        <div className='mb-3 gap-3 d-flex'>
                            <div className='w-50'>
                                <label htmlFor="" className='form-label'> Price </label>
                                <input
                                    type="text"
                                    placeholder='Product Price'
                                    className='form-control'
                                    name="price"
                                />
                            </div>
                            <div className='w-50'>
                                <label htmlFor="" className='form-label'> MRP </label>
                                <input
                                    type="text"
                                    placeholder='Product MRP'
                                    className='form-control'
                                    name="mrp"
                                />
                            </div>
                        </div>
                        <label htmlFor="" className='form-label'> Select Parent Category </label>
                        <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            name='parent_category'
                            onChange={fetchProductCategory}>
                            <option value="default">--select parent category--</option>
                            {parentCategory.map((category, index) => (
                                <>
                                    <option key={index} value={category._id}>{category.name}</option>
                                </>
                            ))}
                        </select>
                        <label htmlFor="" className='form-label'> Select Product Category </label>
                        <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            name="product_category">
                            <option value="">--select product category--</option>
                            {productCategory.map((category, index) => (
                                <>
                                    <option key={index} value={category._id}>{category.name}</option>
                                </>
                            ))}
                        </select>
                        <div className='mb-3 gap-3 d-flex'>
                            <div className='w-50'>
                                <label htmlFor="" className='form-label'> Manage Stock </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    name="stock">
                                    <option value="">--select stock--</option>
                                    <option value="1">In Stock</option>
                                    <option value="2">Out of Stock</option>
                                </select>
                            </div>
                            <div className='w-50'>
                                <label htmlFor="" className='form-label'> Brand Name </label>
                                <input
                                    type="text"
                                    placeholder='Brand'
                                    className='form-control'
                                    name="brand" />
                            </div>
                        </div>
                        <div className='mb-3 gap-3 d-flex'>
                            <div className='w-50'>
                                <label htmlFor="" className='form-label'> Size </label>
                                <Select
                                    name="size"
                                    defaultValue={selectedSizes}
                                    onChange={setSelectedSizes}
                                    options={sizes}
                                    isMulti
                                />
                            </div>
                            <div className='w-50'>
                                <label htmlFor="" className='form-label'> Color </label>
                                <Select
                                    name="color"
                                    defaultValue={selectedColors}
                                    onChange={setSelectedColors}
                                    options={colors}
                                    isMulti
                                />
                            </div>
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


                        <button
                            className='mt-4 btn btn-primary px-3 text-white' >
                            Add Product
                        </button>
                    </div>

                </form>


            </div>
        </>
    )
}

export default ProdAdd