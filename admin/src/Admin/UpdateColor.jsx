import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateColor() {
    const nav = useNavigate();
    const { id } = useParams();
    const [color, setColor] = useState("#FFFFFF");  // Store the selected color code
    const [isPicketVisible, setIsPicketVisible] = useState(false); // Control the visibility of the color picker
    const [fetchColor, setfetchColor] = useState([]);

    // Handle color change from color picker
    const handleColorChange = (newColor) => {
        setColor(newColor.hex);  // Update the color state with the selected hex value
    };

    const fetchColorCategory = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/color/view-color/${id}`)
            .then((response) => {
                setfetchColor(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchColorCategory();
    }, [id])

    const handleUpdateColor = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            code: e.target.code.value
        }
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/color/update-color/${id}`, {data})
            .then((response) => {
                console.log(response.data);
                let timerInterval;
                Swal.fire({
                    title: "Color Updated!",
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
                        nav('/admin/dashboard/profile/viewcolor');
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
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Update Color</h5>
                <form action="" method="post" onSubmit={handleUpdateColor}>
                    <div className='p-3'>
                        <label htmlFor="" className='form-label'> Color Name </label>
                        <input
                            type="text"
                            placeholder='Color Name'
                            className='form-control'
                            name='name'
                            value={fetchColor.name}
                            onChange={(e) => setfetchColor({ ...fetchColor, name: e.target.value })}
                        />
                        <label htmlFor="" className='form-label mt-3'> Color Code </label>
                        <input
                            type="text"
                            placeholder='Color Code'
                            className='form-control mb-3'
                            id="color"
                            name="code"
                            value={fetchColor.code}
                        //onChange={()=>setfetchColor({...fetchColor, code:color})}


                        />
                        <button
                            className='mt-3 btn btn-primary px-3 text-white mx-2'
                            onClick={() => setIsPicketVisible(!isPicketVisible)}
                        >
                            Pick Color
                        </button>
                        {
                            isPicketVisible && (
                                <div className='mt-2'>
                                    <SketchPicker
                                        color={color}
                                        onChange={handleColorChange}
                                    />
                                </div>
                            )
                        }
                        <button
                            className='btn btn-primary mt-3 mx-2'
                            type='submit'
                        >
                            Add Color
                        </button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default UpdateColor