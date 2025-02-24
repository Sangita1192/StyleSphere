import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ViewSize() {
    const nav = useNavigate();

    const [allSize, setAllSize] = useState([]);
    const [checkedSize, setCheckedSize] = useState([]);
    const [ifAllChecked, setifAllChecked] = useState(false);

    const viewAllSize = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/size/view-sizes`)
            .then((response) => {
                setAllSize(response.data.data);
                nav('/admin/dashboard/profile/viewsize');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        viewAllSize();
    }, [])

    const statusUpdate = (e) => {
        const status = e.target.textContent !== "Active";
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/size/update-status/${e.target.value}`, { status })
            .then((response) => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Status has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                viewAllSize();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleDeleteSize = (id) => {

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
                axios.delete(`${import.meta.env.VITE_API_URL}admin-panel/size/delete-size/${id}`)
                    .then((response) => {
                        viewAllSize();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Size has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    const handleCheckedSize = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedSize([value, ...checkedSize]);
        } else {
            setCheckedSize(checkedSize.filter((id) => id != value));
        }

    }

    const handleAllCheckedSizes = (e) => {
        if (e.target.checked) {
            //it will add all the ids in an array of size-list
            setCheckedSize(allSize.map((size) => size._id));
        } else {
            setCheckedSize([]);
        }
    }
    const deleteCheckedSize = () => {
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
                axios.put(`${import.meta.env.VITE_API_URL}admin-panel/size/delete-sizes`, { checkedSize })
                    .then((response) => {
                       viewAllSize();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Selected Sizes has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    useEffect(() => {
        if (allSize.length === checkedSize.length && allSize.length !== 0) {
            setifAllChecked(true);
        } else {
            setifAllChecked(false);
        }
    }, [checkedSize, allSize])
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">View Size</h5>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <button
                                        className='btn btn-danger'
                                        onClick={deleteCheckedSize}
                                    >
                                        DELETE
                                    </button>
                                    <input
                                        type="checkbox"
                                        onClick={handleAllCheckedSizes}
                                        checked={ifAllChecked}
                                    />
                                </th>
                                <th>  Sr.No. </th>
                                <th>  Size Name </th>
                                <th>  Size Order</th>
                                <th>  Action </th>
                                <th>  Status </th>
                            </tr>

                        </thead>
                        <tbody className='border-bottom-secondary'>
                            <Tooltip id="status-tooltip" />
                            {
                                allSize.map((size, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        onClick={handleCheckedSize}
                                                        value={size._id}
                                                        checked={checkedSize.includes(size._id)}
                                                    />
                                                </td>
                                                <td> {index + 1}  </td>
                                                <td>  {size.name} </td>
                                                <td>  {size.order}</td>
                                                <td>
                                                    <MdDelete
                                                        className='text-danger'
                                                        id="delete"
                                                        onClick={() => handleDeleteSize(size._id)}
                                                    /> |
                                                    <Link to={`/admin/dashboard/profile/updatesize/${size._id}`}>
                                                        <CiEdit className='text-warning' />
                                                    </Link>                                       
                                                </td>
                                                <td>
                                                    <button
                                                        className={`btn ${size.status ? 'btn-success' : 'btn-danger'}`}
                                                        onClick={statusUpdate}
                                                        value={size._id}
                                                        data-tooltip-id="status-tooltip"
                                                        data-tooltip-content={`Click to ${(size.status) ? 'InActive' : 'Active'}}`}>
                                                        {size.status ? 'Active' : 'InActive'}
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

export default ViewSize