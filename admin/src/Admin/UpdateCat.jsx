import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateCat() {
    const nav = useNavigate();
    const { id } = useParams();  ///destruct the id
    const [category, setCategory] = useState({}); //hold to fetchedCategory Data

    const fetchCategoryData = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/parent-category/read-category/${id}`)
            .then((response) => {
                setCategory(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchCategoryData();
    }, [id])

    const handleUpdateCategory = (e) => {
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/parent-category/update-category/${id}`, e.target)
            .then((response) => {
                let timerInterval;
                Swal.fire({
                    title: "Category Updated!",
                    html: "Redirecting to View Category in <b></b> milliseconds.",
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
                        nav('/admin/dashboard/profile/viewcategory');
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Update Category</h5>
                <form action="" method='post' onSubmit={handleUpdateCategory}>
                    <div className='p-3'>
                        <label htmlFor="" className='form-label'> Category Name </label>
                        <input type="text"
                            placeholder='Category Name'
                            className='form-control'
                            id='category-name'
                            name="name"
                            onChange={(e) => setCategory({ ...category, name: e.target.value })}
                            value={category.name}
                        />
                        <label htmlFor="" className='form-label mt-3'> Category description </label>
                        <textarea
                            type="file"
                            className='form-control mb-3'
                            name="description"
                            id="category-description"
                            onChange={(e) => setCategory({ ...category, description: e.target.value })}
                            value={category.description}
                        />
                        <button className='mt-4 btn btn-primary px-3 text-white' > Update Category </button>
                    </div>
                </form>


            </div>

        </>
    )
}

export default UpdateCat