import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

function ViewProdCat() {
  const [productCategory, setProductCategory] = useState([]);
  const [filePath, setFilePath] = useState("");
  const [checkedProduct, setCheckedProduct] = useState([]);
  const [ifAllChecked, setIfAllChecked] = useState(false);

  const handleProductCategories = () => {
    axios.get(`${import.meta.env.VITE_API_URL}admin-panel/product-category/view-categories`)
      .then((response) => {
        setProductCategory(response.data.data);
        setFilePath(response.data.filePath);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => { handleProductCategories() }, []);

  const updateStatus = (e) => {
    const status = e.target.textContent !== "Active";
    axios.put(`${import.meta.env.VITE_API_URL}admin-panel/product-category/update-status/${e.target.value}`, { status })
      .then((response) => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Product Status has been updated",
          showConfirmButton: false,
          timer: 1000
        });
        handleProductCategories();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleIsFeaturedStatus = (e)=>{
    const isFeatured = e.target.textContent !== "Yes";
         
    axios.put(`${import.meta.env.VITE_API_URL}admin-panel/product-category/update-featured-status/${e.target.value}`, { isFeatured })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Product Status has been updated",
          showConfirmButton: false,
          timer: 1000
        });
        handleProductCategories();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleCheckedProduct = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedProduct([value, ...checkedProduct])
    } else {
      setCheckedProduct(checkedProduct.filter((id) => id !== value));
    }
  }

  const handleAllChecked = (e) => {
    if (e.target.checked) {
      setCheckedProduct(productCategory.map((product) => product._id));
    } else {
      setCheckedProduct([]);
    }
  }

  useEffect(() => {
    if (productCategory.length == checkedProduct.length && productCategory != 0) {
      setIfAllChecked(true);

    } else {
      setIfAllChecked(false);
    }
  }, [productCategory, checkedProduct])

  const handleDeleteProduct = (id) => {
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
        axios.delete(`${import.meta.env.VITE_API_URL}admin-panel/product-category/delete-product/${id}`)
          .then((response) => {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted",
              icon: "success"
            });
            handleProductCategories();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    })
  }

  const deleteCheckedCategory = () => {
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
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/product-category/delete-product-categories`, {checkedProduct })
          .then((response) => {
            Swal.fire({
              title: "Deleted!",
              text: "All Checked Product is Deleted",
              icon: "success"
            });
            handleProductCategories();
          })
          .catch((error)=>{
            console.log(error);
          })
      }
    })  
}

return (
  <>
    <div className="row m-3 rounded-3 shadow-lg">
      <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">View Product Category</h5>
      <div>
        <table className='table'>
          <thead className='text-center '>
            <tr>
              <th>
                <button
                  className='btn btn-danger'
                  id='delete'
                  onClick={deleteCheckedCategory}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  className='ms-2'
                  onClick={handleAllChecked}
                  checked={ifAllChecked}

                />
              </th>
              <th>  Sr.No. </th>
              <th>  Cateogry Name </th>
              <th>  Parent Category </th>
              <th>  Description</th>
              <th>  Image </th>
              <th>  Action </th>
              <th>  Status </th>
              <th>  isFeatured </th>
            </tr>

          </thead>
          <tbody className='border-bottom-secondary text-start'>
            <Tooltip id="status-tooltip" />
            {
              (productCategory.length === 0) ?
                <tr>
                  <td colSpan={6} className='text-center'>
                    ----No Product Category Exists----
                  </td>
                </tr>
                :
                productCategory.map((product, index) => {
                  return (
                    <>
                      <tr className='text-center'>
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
                        <td>  {product.parent_category.name} </td>
                        <td>  {product.description} </td>
                        <td>  <img src={`${filePath}${product.thumbnail}`} alt="photo of the product" style={{ width: '70px' }} /></td>
                        <td >
                          <div className='d-flex gap-2'>
                            <MdDelete
                              className='text-danger'
                              onClick={() => handleDeleteProduct(product._id)}
                            /> |
                            <Link to={`/admin/dashboard/profile/updateproductcategory/${product._id}`}>
                              <CiEdit className='text-warning' />
                            </Link>

                          </div>
                        </td>
                        <td>
                          {
                            <button
                              onClick={updateStatus}
                              value={product._id}
                              className={`btn ${product.status ? 'btn-success' : 'btn-danger'}`} data-tooltip-id="status-tooltip" data-tooltip-content={`Click to ${(product.status) ? 'InActive' : 'Active'}}`}>
                              {(product.status) ? "Active"
                                : "InActive"}
                            </button>
                          }
                        </td>
                        <td>
                          {
                            <button
                              onClick={handleIsFeaturedStatus}
                              value={product._id}
                              className={`btn ${product.isFeatured ? 'btn-success' : 'btn-danger'}`} 
                              data-tooltip-id="status-tooltip" data-tooltip-content={`Click to ${(product.isFeatured) ? 'Remove from Featured Category' : 'Add to Featured Category'}}`}>
                              {(product.isFeatured) ? "Yes"
                                : "No"}
                            </button>
                          }
                        </td>
                      </tr>
                    </>
                  )
                }
                )
            }



          </tbody>
        </table>
      </div>
    </div>
  </>

)
}

export default ViewProdCat