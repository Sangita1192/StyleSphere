import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import tshirt from './../Images/mens-tshirt.webp'
import axios from 'axios'
import { Tooltip } from 'react-tooltip'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function ProdView() {
    const [allProducts, setAllProducts] = useState([]);
    const [filePath, setFilePath] = useState("");
    const [checkedProduct, setCheckedProduct] = useState([]);
    const [ifAllChecked, setIfAllChecked] = useState(false);

    const fetchAllProducts = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/products/read-products`)
            .then((response) => {
                setFilePath(response.data.filePath);
                setAllProducts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchAllProducts();
    }, [])

    //update product status (active or inactive)
    const updateStatus = (e) => {
        const status = e.target.textContent !== "Active";
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/products/update-status/${e.target.value}`, { status })
            .then((response) => {
                console.log(response.data);
                fetchAllProducts();
            })
            .catch((error) => {
                console.log(error);
            })

    }

    //delete single clicked products
    const handleSingleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}admin-panel/products/delete-product/${id}`)
                    .then((response) => {
                        console.log(response);
                        fetchAllProducts();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });

    }

    const handleCheckedProduct = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setCheckedProduct([value, ...checkedProduct]);
        }
        else {
            setCheckedProduct(checkedProduct.filter((id) => id !== value));
        }
    }

    const AllCheckedProducts = (e) => {
        if (e.target.checked) {
            setIfAllChecked(true);
            const newArr = allProducts.map((product) => product._id);
            setCheckedProduct(newArr);
        } else {
            setIfAllChecked(false);
            setCheckedProduct([]);
        }
    }

    const handleDeleteCheckedProduct = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`${import.meta.env.VITE_API_URL}admin-panel/products/delete-products`, { checkedProduct })
                    .then((response) => {
                        console.log(response.data);
                        fetchAllProducts();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });

    }

    useEffect(() => {
        if (checkedProduct.length === allProducts.length && allProducts.length !== 0) {
            setIfAllChecked(true);
        } else {
            setIfAllChecked(false);
        }
    })
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">View Product</h5>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <button
                                        className='btn btn-danger'
                                        onClick={handleDeleteCheckedProduct}
                                    >
                                        Delete
                                    </button>
                                    <input
                                        type="checkbox"
                                        className='ms-2'
                                        onClick={AllCheckedProducts}
                                        checked={ifAllChecked}
                                    />
                                </th>
                                <th>  Sr.No. </th>
                                <th>  Product Name </th>
                                <th>  Description</th>
                                <th>  Short Description</th>
                                <th>  Thumbnail </th>
                                <th>  Action </th>
                                <th>  Status </th>
                            </tr>

                        </thead>
                        <tbody className='border-bottom-secondary'>
                            <Tooltip id="status-tooltip" />
                            {
                                (allProducts.length === 0) ?
                                    <tr>
                                        <td colSpan={6} className='text-center'>
                                            ----No Product Exists----
                                        </td>
                                    </tr>
                                    :
                                    allProducts.map((product, index) => {
                                        return (
                                            <>
                                                <tr key={product._id}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={product._id}
                                                            onClick={handleCheckedProduct}
                                                            checked={checkedProduct.includes(product._id)}

                                                        />
                                                    </td>
                                                    <td>  {index + 1}</td>
                                                    <td>  {product.name} </td>
                                                    <td>  {product.description}</td>
                                                    <td>  {product.short_description}</td>
                                                    <td>
                                                        <img src={filePath + product.thumbnail} alt="photo of the product"
                                                            style={{ width: '70px' }} />
                                                    </td>
                                                    <td >
                                                        <div className='d-flex gap-2'>
                                                            <MdDelete
                                                                className='text-danger'
                                                                onClick={() => handleSingleDelete(product._id)}
                                                            /> |
                                                            <Link to={`/admin/dashboard/profile/updateproduct/${product._id}`}>
                                                                <CiEdit className='text-warning' />
                                                            </Link>
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={updateStatus}
                                                            value={product._id}
                                                            className={`btn ${product.status ? 'btn-success' : 'btn-danger'}`} data-tooltip-id="status-tooltip" data-tooltip-content={`Click to ${(product.status) ? 'InActive' : 'Active'}}`}>
                                                            {(product.status) ? "Active"
                                                                : "InActive"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProdView