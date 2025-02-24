import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdatePCat() {
    const nav = useNavigate();
    const { id } = useParams();

    const [fetchProduct, setFetchProduct] = useState({});
    const [imgPreview, setImgPreview] = useState(null);
    const [filePath, setfilePath] = useState("");

    const handleImgPreview = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImgPreview(url);
    }

    const fetchProductCategory = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/product-category/view-product-category/${id}`)
            .then((response) => {
                setFetchProduct(response.data.data);
                setfilePath(response.data.filePath);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => { fetchProductCategory() }, [id]);


    const UpdateProductCat = (e) => {
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/product-category/update-product-category/${id}`, e.target)
            .then((response) => {
                console.log(response.data);
                let timerInterval;
                Swal.fire({
                    title: "Product Category Updated",
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
                nav('/admin/dashboard/profile/viewproductcategory');
            })
            .catch((error) => {
                console.log(error);
            })
        console.log(e.target.name.value, e.target.description.value);

    }
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Update Product Category</h5>
                <form action="" method="post" onSubmit={UpdateProductCat}>
                    <div className='p-3'>
                        <label htmlFor="" className='form-label'> Product Category Name </label>
                        <input
                            type="text"
                            placeholder='Category Name'
                            className='form-control'
                            name='name'
                            id="category-name"
                            onChange={(e) => setFetchProduct({ ...fetchProduct, name: e.target.value })}
                            value={fetchProduct.name}
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

                            <img src={imgPreview || filePath + fetchProduct.thumbnail} className='mt-3 w-25' style={{ width: '100px', height: '170px' }} />
                        </div>
                        <label htmlFor="" className='form-label mt-3'> Category description </label>
                        <textarea
                            className='form-control mb-3'
                            id='category-description'
                            name='description'
                            onChange={(e) => setFetchProduct({ ...fetchProduct, description: e.target.value })}
                            value={fetchProduct.description}
                        />
                        <button type="submit" className='mt-4 btn btn-primary px-3 text-white' > Update Product Category </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdatePCat