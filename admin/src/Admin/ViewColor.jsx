import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';

function ViewColor() {

    const [allColors, setAllColors] = useState([]);
    const [checkedColor, setCheckedColor] = useState([]);
    const [ifAllChecked, setIfAllChecked] = useState(false);


    const fetchAllColors = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/color/view-colors`)
            .then((response) => {
                console.log(response.data);
                setAllColors(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            }
            )
    }

    useEffect(() => {
        fetchAllColors();
    }, [])

    const updateStatus = (e) => {
        const status = e.target.textContent !== "Active";
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/color/update-status/${e.target.value}`, { status })
            .then((response) => {
                console.log(response.data);
                fetchAllColors();

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteColor = (id) => {
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
                axios.delete(`${import.meta.env.VITE_API_URL}admin-panel/color/delete-color/${id}`)
                    .then((response) => {
                        console.log(response.data);
                        fetchAllColors();
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                Swal.fire({
                    title: "Deleted!",
                    text: "Color has been deleted.",
                    icon: "success"
                });
            }
        });

    }
    const handleCheckedColor = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedColor([value, ...checkedColor]);
        } else {
            setCheckedColor(checkedColor.filter((id) => id !== value));
        }
    }

    useEffect(() => {
        setIfAllChecked(checkedColor.length == allColors.length && allColors !== 0);
    }, [checkedColor, allColors]);

    const checkedAllColor = (e) => {
        if (e.target.checked) {
            setCheckedColor(allColors.map((color) => color._id));
        } else {
            setCheckedColor([]);
        }
    }

    const deleteCheckedColor = () => {
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
                axios.put(`${import.meta.env.VITE_API_URL}admin-panel/color/delete-colors`, { checkedColor })
                    .then((response) => {
                        console.log(response.data);
                        fetchAllColors();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">View Color</h5>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <button
                                        className='btn btn-danger me-2'
                                        onClick={deleteCheckedColor}
                                    >
                                        Delete
                                    </button>
                                    <input
                                        type="checkbox"
                                        onClick={checkedAllColor}
                                        checked={ifAllChecked}
                                    />
                                </th>
                                <th>  Sr.No. </th>
                                <th>  Color Name </th>
                                <th>  Color</th>
                                <th>  Action </th>
                                <th>  Status </th>
                            </tr>

                        </thead>
                        <tbody className='border-bottom-secondary'>
                            <Tooltip id="status-tooltip" />
                            {
                                allColors.map((color, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        value={color._id}
                                                        onClick={handleCheckedColor}
                                                        checked={checkedColor.includes(color._id)}

                                                    />
                                                </td>
                                                <td>  {index + 1} </td>
                                                <td>  {color.name}</td>
                                                <td>
                                                    <input
                                                        type="color"
                                                        class="form-control form-control-color"
                                                        value={color.code}
                                                    >
                                                    </input>
                                                </td>
                                                <td >
                                                    <div className='d-flex gap-2'>
                                                        <MdDelete
                                                            className='text-danger'
                                                            onClick={() => deleteColor(color._id)}
                                                        /> |
                                                        <Link to={`/admin/dashboard/profile/updatecolor/${color._id}`}>
                                                            <CiEdit className='text-warning' />
                                                        </Link>

                                                    </div>

                                                </td>
                                                <td >
                                                    <button
                                                        onClick={updateStatus}
                                                        value={color._id}
                                                        className={`btn ${color.status ? 'btn-success' : 'btn-danger'}`} data-tooltip-id="status-tooltip" data-tooltip-content={`Click to ${(color.status) ? 'InActive' : 'Active'}}`}>
                                                        {(color.status) ? "Active"
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

export default ViewColor