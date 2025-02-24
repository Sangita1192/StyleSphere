import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [parentCategory, setParentCategory] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [prodDetail, setProdDetail] = useState({});
    const [filePath, setFilePath] = useState('');
    const [prodImgPrev, setProdImgPrev] = useState(null);
    const [secondImgPrev, setSecondImgPrev] = useState(null);
    const [multiImgPrev, setMultiImgPrev] = useState([]);

    const fetchProduct = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/products/read-product/${id}`)
            .then((response) => {
                console.log(response.data);
                setProdDetail(response.data.data);
                setFilePath(response.data.filePath);
                console.log(prodDetail);
            })
            .catch((error) => {
                console.log(error);
            })
    }
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


    useEffect(() => {
        fetchProduct();
        ActiveParentCategory();
        ActiveColors();
        ActiveSizes();
    }, [id])

    //useEffect(() => { console.log(prodDetail.parent_category.name) }, [prodDetail])


    const handleImgPreview = (e) => {
        const { name, files } = e.target;
        if (name == "thumbnail") {
            const file = files[0];
            const url = URL.createObjectURL(file);
            setProdImgPrev(url);
        }
        else if (name == 'secondary_thumbnail') {
            const file = files[0];
            const url = URL.createObjectURL(file);
            setSecondImgPrev(url);
        } else if (name == 'images') {
            const filesArray = Array.from(files);
            const urls = filesArray.map((file) => URL.createObjectURL(file));
            setMultiImgPrev(urls);
        }
    }

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/products/update-product/${id}`, prodDetail)
            .then((response) => {
                console.log(response.data);
                let timerInterval;
                Swal.fire({
                    title: "Product has been updated!",
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

    return (
        <div className="row m-3 rounded-3 shadow-lg">
            <h5 className=" px-5 py-3 bg-dark-subtle rounded-top-3">Update Product</h5>
            <form action="" method='post' onSubmit={handleUpdateProduct}>
                <div className='px-5 pt-2 pb-5'>
                    <label htmlFor="" className='form-label'> Product Name </label>
                    <input
                        type="text"
                        placeholder='Product Name'
                        className='form-control'
                        name="name"
                        value={prodDetail.name}
                        onChange={(e) => setProdDetail({ ...prodDetail, name: e.target.value })}

                    />
                    <label htmlFor="" className='form-label mt-2'> Product description </label>
                    <textarea
                        className='form-control mb-3'
                        placeholder="product description"
                        name="description"
                        value={prodDetail.description}
                        onChange={(e) => setProdDetail({ ...prodDetail, description: e.target.value })}
                    />
                    <label htmlFor="" className='form-label mt-2'> Short description </label>
                    <textarea
                        className='form-control mb-3'
                        placeholder="short description"
                        name="short_description"
                        value={prodDetail.short_description}
                        onChange={(e) => setProdDetail({ ...prodDetail, short_description: e.target.value })}
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
                                <img src={prodImgPrev || filePath + prodDetail.thumbnail} className='mt-3 w-25' />
                            )
                        }
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
                                    <img src={secondImgPrev || filePath + prodDetail.secondary_thumbnail} className='mt-3 w-25' />
                                )
                            }
                        </div>
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
                            {
                                (multiImgPrev.length === 0) ?
                                    (prodDetail.images && prodDetail.images.length > 0 ? (
                                        prodDetail.images.map((img, index) => (
                                            <img key={index} src={filePath + img} className="w-25" alt={`Preview ${index + 1}`} />
                                        ))
                                    ) : <p>No images available</p>)
                                    :
                                    multiImgPrev.map((url, index) => (
                                        <img key={index} src={url} className="w-25" alt={`Preview ${index + 1}`} />
                                    ))
                            }
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
                                value={prodDetail.price}
                                onChange={(e) => setProdDetail({ ...prodDetail, price: e.target.value })}
                            />
                        </div>
                        <div className='w-50'>
                            <label htmlFor="" className='form-label'> MRP </label>
                            <input
                                type="text"
                                placeholder='Product MRP'
                                className='form-control'
                                name="mrp"
                                value={prodDetail.mrp}
                                onChange={(e) => setProdDetail({ ...prodDetail, mrp: e.target.value })}
                            />
                        </div>
                    </div>
                    <label htmlFor="" className='form-label'> Select Parent Category </label>
                    <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        name='parent_category'
                        //value={prodDetail.parent_category._id}
                        onChange={fetchProductCategory}
                    >
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
                                name="stock"
                            //value={prodDetail.stock}
                            >
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
                                name="brand"
                                value={prodDetail.brand}
                                onChange={(e) => setProdDetail({ ...prodDetail, brand: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='mb-3 gap-3 d-flex'>
                        <div className='w-50'>
                            <label htmlFor="" className='form-label'> Size </label>
                            <Select
                                name="size"
                                //defaultValue={selectedSizes}
                                //onChange={setSelectedSizes}
                                options={sizes}
                                isMulti
                            />
                        </div>
                        <div className='w-50'>
                            <label htmlFor="" className='form-label'> Color </label>
                            <Select
                                name="color"
                                //defaultValue={selectedColors}
                                //onChange={setSelectedColors}
                                options={colors}
                                isMulti
                            />
                        </div>
                    </div>
                    <button
                        className='mt-4 btn btn-primary px-3 text-white'
                        type='submit'>
                        Update Product
                    </button>
                </div>

            </form>


        </div>
    )
}

export default UpdateProduct