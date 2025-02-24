import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';

function ViewSlider() {
    const [slider, setSlider] = useState([]);
    const [filePath, setFilePath] = useState('');
    const [checkedSlider, setCheckedSlider] = useState([]); //hold the id of checked slider
    const [ifAllChecked, setIfAllChecked] = useState(false);

    const fetchSlider = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/slider/read-sliders`)
            .then((response) => {
                console.log(response.data);
                setSlider(response.data.data);
                setFilePath(response.data.filePath);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchSlider();
    }, [])

    const handleUpdateStatus = (e) => {
        const status = e.target.textContent !== "Active";
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/slider/update-status/${e.target.value}`, { status })
            .then((response) => {
                fetchSlider();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //delete specific Slider 
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}admin-panel/slider/delete-slider/${id}`)
                    .then((response) => {
                        fetchSlider();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Selected Slider has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    const handleCheckedSlider = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setCheckedSlider([value, ...checkedSlider]);
        }
        else {
            setCheckedSlider(checkedSlider.filter((id) => id !== value));
        }
    }

    const handleAllChecked = (e) => {
        if (e.target.checked) {
            setCheckedSlider(slider.map((slider) => slider._id));
        } else {
            setCheckedSlider([]);
        }
    }

    useEffect(() => {
        setIfAllChecked(slider.length === checkedSlider.length && slider.length !== 0);
    }, [slider, checkedSlider])


    //delete all checked slider
    const handleDeleteCheckedSlider = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`${import.meta.env.VITE_API_URL}admin-panel/slider/delete-sliders`, { checkedSlider })
                    .then((response) => {
                        fetchSlider();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Selected Slider has been deleted.",
                    icon: "success"
                });
            }
        });

    }
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">View Slider</h5>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        className='me-2'
                                        onClick={handleAllChecked}
                                        checked={ifAllChecked}
                                    />
                                    <button
                                        className='btn btn-danger'
                                        onClick={handleDeleteCheckedSlider}
                                    >
                                        Delete
                                    </button>

                                </th>
                                <th>  Sr.No. </th>
                                <th>  Slider Name </th>
                                <th>  Heading</th>
                                <th>  Sub Heading</th>
                                <th>  Slider Image </th>
                                <th>  Action </th>
                                <th>  Status </th>
                            </tr>

                        </thead>
                        <tbody className='border-bottom-secondary'>
                            <Tooltip id="status-tooltip" className='bg-danger' />
                            {
                                slider.length === 0 ?
                                    <h3 className='text-center'>---No Slider Details Exists---</h3>
                                    :
                                    slider.map((slider, index) => (
                                        <tr key={slider._id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    value={slider._id}
                                                    onClick={handleCheckedSlider}
                                                    checked={checkedSlider.includes(slider._id)}
                                                />
                                            </td>
                                            <td>  {index + 1}</td>
                                            <td> {slider.slider_name} </td>
                                            <td>
                                                {slider.heading}
                                            </td>
                                            <td >
                                                {slider.sub_heading}
                                            </td>
                                            <td>  <img src={filePath + slider.image} alt="" width={100} height={100} /></td>
                                            <td >
                                                <div className='d-flex gap-2 align-items-center'>
                                                    <MdDelete
                                                        className='text-danger'
                                                        onClick={() => handleDelete(slider._id)}
                                                    /> |
                                                    <Link to={`/admin/dashboard/profile/updateslider/${slider._id}`}>
                                                        <CiEdit className='text-warning' />
                                                    </Link>

                                                </div>

                                            </td>
                                            <td>
                                                <button
                                                    className={`btn ${slider.status ? 'btn-success' : 'btn-danger'}`}
                                                    data-tooltip-id='status-tooltip'
                                                    data-tooltip-content={`${slider.status ? 'InActive' : "Active"}`}
                                                    value={slider._id}
                                                    onClick={handleUpdateStatus}
                                                >
                                                    {slider.status ? 'Active' : 'InActive'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewSlider