import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci'
import { MdCategory, MdDelete } from 'react-icons/md'
import { Tooltip } from 'react-tooltip'
import Swal from 'sweetalert2'

function ViewCat() {
    const [viewCategories, setViewCateogries] = useState([]);
    const [checkedCat, setCheckedCat] = useState([]);
    const [ifAllChecked, setAllChecked] = useState(false);

    const handleFetchCategory = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/parent-category/view-category`)
            .then((response) => {
                setViewCateogries(response.data.data);
                
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        handleFetchCategory();
    }, []);

    const updateStatus = (e)=>{
        const status = e.target.textContent !== "Active";
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/parent-category/update-status/${e.target.value}`, {status})
        .then((response)=>{
            handleFetchCategory();
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Category Updated",
                showConfirmButton: false,
                timer: 1000
              });
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleDelete = (id)=>{
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
                axios.delete(`${import.meta.env.VITE_API_URL}admin-panel/parent-category/delete-category/${id}`)
                .then((response)=>{
                    Swal.fire({
                        title: "Deleted!",
                        text: "Category has been deleted",
                        icon: "success"
                      });
                    handleFetchCategory();
                })
                .catch((error)=>{
                    console.log(error);
                })
             
            }
          });
        
    }

    const handleCheckedCategory = (e)=>{
        //destructured the value
        const {value, checked} = e.target;
       
        if(checked){
            setCheckedCat([value, ...checkedCat]);
        }
        else{
            setCheckedCat(checkedCat.filter((id) => id !== value));
        }
    }

    const deleteCheckedCategory = ()=>{
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
                axios.put(`${import.meta.env.VITE_API_URL}admin-panel/parent-category/delete-categories`, {checkedCat})
                .then((response)=>{
                    console.log(response);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Category has been deleted",
                        icon: "success"
                })
                .catch((error)=>{
                    console.log(error);
                })
              });
            }
          });
    }
    const AllCheckedCategories = (e)=>{
        if(e.target.checked){
            setCheckedCat(viewCategories.map((cat)=> cat._id));
        }else{
            setCheckedCat([]);
        }
    }

    useEffect(()=>{
        setAllChecked(checkedCat.length == viewCategories.length && viewCategories.length !== 0);
      },[checkedCat, viewCategories]);

    return (
        <div className="row m-3 rounded-3 shadow-lg">
            <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">View Category</h5>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>
                                <button 
                                className='btn btn-danger'
                                id="delete"
                                onClick={deleteCheckedCategory}
                                > 
                                    Delete 
                                </button>
                                <input type="checkbox" 
                                className='ms-2' 
                                onClick={AllCheckedCategories}
                                checked={ifAllChecked}/>
                                
                            </th>
                            <th>  Sr.No. </th>
                            <th>  Cateogry Name </th>
                            <th>  Description</th>
                            <th>  Action </th>
                            <th>  Status </th>
                        </tr>

                    </thead>
                    <tbody className='border-bottom-secondary'>
                    <Tooltip id="status-tooltip" />
                        {
                            (viewCategories.length === 0) ?
                                <tr> 
                                    <td colSpan={6} className='text-center'>
                                    ----No Category Exists---- 
                                    </td>
                                </tr>
                                :
                                viewCategories.map((category, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    <input 
                                                    type="checkbox"
                                                    value={category._id}
                                                    onClick={handleCheckedCategory}
                                                    checked = {checkedCat.includes(category._id)}
                                                     />
                                                </td>
                                                <td>  {index + 1}</td>
                                                <td>  {category.name} </td>
                                                <td>  {category.description}</td>
                                                <td>
                                                    <MdDelete 
                                                            className='text-danger'
                                                            onClick={()=>handleDelete(category._id)}
                                                            /> |
                                                    <Link to={`/admin/dashboard/profile/updatecategory/${category._id}`}>
                                                        <CiEdit className='text-warning' /> 
                                                    </Link>
                                                    
                                                </td>
                                                <td>  
                                                    <button 
                                                        onClick={updateStatus} 
                                                        value = {category._id}
                                                        className={`btn ${category.status? 'btn-success': 'btn-danger'}`} data-tooltip-id="status-tooltip" data-tooltip-content={`Click to ${(category.status)? 'InActive' : 'Active'}}`}> 
                                                        {(category.status)? "Active"
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
    )
}

export default ViewCat