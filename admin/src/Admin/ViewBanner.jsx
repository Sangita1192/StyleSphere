import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';

export const ViewBanner = () => {
  const [banner, setBanner] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [checkedBanner, setCheckedBanner] = useState([]); //hold the id of checked banner
  const [ifAllChecked, setIfAllChecked] = useState(false);

  const fetchBanner = () => {
    axios.get(`${import.meta.env.VITE_API_URL}admin-panel/banner/read-banners`)
      .then((response) => {
        console.log(response.data);
        setBanner(response.data.data);
        setFilePath(response.data.filePath);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchBanner();
  }, [])

  const handleUpdateIsFallback = (e) => {
    const isFallback = e.target.textContent !== "Active";
    axios.put(`${import.meta.env.VITE_API_URL}admin-panel/banner/update-isfallback/${e.target.value}`, { isFallback })
      .then((response) => {
        fetchBanner();
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: "Banner isFallback status Updated",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //delete specific Banner 
  const handleDeleteBanner = (id) => {
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
        axios.delete(`${import.meta.env.VITE_API_URL}admin-panel/banner/delete-banner/${id}`)
          .then((response) => {
            fetchBanner();
          })
          .catch((error) => {
            console.log(error);
          })
        Swal.fire({
          title: "Deleted!",
          text: "Selected Banner has been deleted.",
          icon: "success"
        });
      }
    });

  }

  const handleCheckedBanner = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCheckedBanner([value, ...checkedBanner]);
    }
    else {
      setCheckedBanner(checkedBanner.filter((id) => id !== value));
    }
  }

  const handleAllChecked = (e) => {
    if (e.target.checked) {
      setCheckedBanner(banner.map((banner) => banner._id));
    } else {
      setCheckedBanner([]);
    }
  }

  useEffect(() => {
    setIfAllChecked(banner.length === checkedBanner.length && banner.length !== 0);
  }, [banner, checkedBanner])


  //delete all checked banners
  const handleDeleteCheckedBanner = () => {
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
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/banner/delete-banners`, { checkedBanner })
          .then((response) => {
            fetchBanner();
          })
          .catch((error) => {
            console.log(error);
          })
        Swal.fire({
          title: "Deleted!",
          text: "Selected Banners has been deleted.",
          icon: "success"
        });
      }
    });

  }
  return (
    <>
      <div className="row m-3 rounded-3 shadow-lg">
        <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">View Banner</h5>
        <div className='overflow-x-auto'>
          <table className="min-w-full table-auto border-collapse border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    className='me-2'
                    onClick={handleAllChecked}
                    checked={ifAllChecked}
                  />
                  <button
                    className='btn btn-danger'
                    onClick={handleDeleteCheckedBanner}
                  >
                    Delete
                  </button>

                </th>
                <th className="px-4 py-2 text-left">  Sr.No. </th>
                <th className="px-4 py-2 text-left">  Banner Title </th>
                <th className="px-4 py-2 text-left">  Sub title</th>
                <th className="px-4 py-2 text-left">  Image </th>
                <th className="px-4 py-2 text-left">  Link</th>
                <th className="px-4 py-2 text-left">  Start Date</th>
                <th className="px-4 py-2 text-left">  End Date</th>
                <th className="px-4 py-2 text-left">  Action </th>
                <th className="px-4 py-2 text-left">  isFallback </th>
              </tr>

            </thead>
            <tbody className="divide-y divide-gray-300">
              <Tooltip id="status-tooltip" className='bg-danger' />
              {
                banner.length === 0 ?
                  <h3 className="text-center col-span-10 py-4">---No Banner Details Exists---</h3>
                  :
                  banner.map((banner, index) => (
                    <tr key={banner._id}>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          value={banner._id}
                          onClick={handleCheckedBanner}
                          checked={checkedBanner.includes(banner._id)}
                        />
                      </td>
                      <td className="px-4 py-2 text-center">  {index + 1}</td>
                      <td className="px-4 py-2 text-center"> {banner.title} </td>
                      <td className="px-4 py-2 text-center"> {banner.subtitle}</td>
                      <td className="px-4 py-2 text-center">  <img src={filePath + banner.image} alt="" width={100} height={100} /></td>
                      <td className="px-4 py-2 text-center"> {banner.link}</td>
                      <td className="px-4 py-2 text-center">
                        {new Date(banner.start_date).toLocaleDateString('en-CA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {new Date(banner.end_date).toLocaleDateString('en-CA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <MdDelete
                          className='text-danger'
                          onClick={() => handleDeleteBanner(banner._id)}
                        /> |
                        <Link to="{`/admin/dashboard/profile/updatecategory/${category._id}`}">
                          <CiEdit className='text-warning' />
                        </Link>
                      </td>
                      <td>
                        <button
                          className={`btn ${banner.isFallback ? 'btn-success' : 'btn-danger'}`}
                          data-tooltip-id='status-tooltip'
                          data-tooltip-content={`${banner.isFallback ? 'InActive' : "Active"}`}
                          value={banner._id}
                          onClick={handleUpdateIsFallback}
                        >
                          {banner.isFallback ? 'Active' : 'InActive'}
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
