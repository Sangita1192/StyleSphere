import React, { useEffect, useState } from 'react';
import tshirt from './../Images/Story_Img.avif';
import axios from 'axios';


function Order() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [filePath, setFilePath] = useState('');

    const fetchOrderDetails = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/order/read-orders`)
            .then((response) => {
                console.log(response.data);
                setOrderDetails(response.data.data);
                setFilePath(response.data.filePath);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchOrderDetails();
    }, [])
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Orders</h5>
                <div className='w-100'>
                    <table className='table w-100'>
                        <thead>
                            <tr>
                                <th>
                                    Delete
                                    <input type="checkbox" className='ms-2' />
                                </th>
                                <th>  Sr.No. </th>
                                <th>  Order Name </th>
                                <th>  Product Id</th>
                                <th>  Image</th>
                                <th>  Description </th>
                                <th>  Quantity </th>
                                <th>  Price </th>
                                <th>  Status </th>
                            </tr>

                        </thead>
                        <tbody className='border-bottom-secondary'>
                            {
                                orderDetails.length === 0 ?
                                    <tr >
                                        <td colSpan={9} className='fs-4 text-center w-full border border-1'>
                                            No Order Details Exists
                                        </td>
                                    </tr>
                                    :
                                    orderDetails.map((order, index) => (
                                        <tr key={order._id}>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td>  {index + 1}</td>
                                            <td>  Men's Wear </td>
                                            <td>  12345 </td>
                                            <td > <img src={tshirt} alt="photo of the product" style={{ width: '70px' }} /> </td>
                                            <td>  description</td>
                                            <td>1 </td>
                                            <td> ${order.amount} </td>
                                            <td>  {order.status} </td>
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

export default Order