import React, { useState } from 'react';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AddColor() {
    const nav = useNavigate();
    const [color, setColor] = useState("#FFFFFF");  // Store the selected color code
    const [imageSrc, setImageSrc] = useState("");  // Store the image source for preview
    const [isPicketVisible, setIsPicketVisible] = useState(false); // Control the visibility of the color picker

    // Handle image upload and preview
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);  // Update image preview source
        };
        reader.readAsDataURL(file);
    };

    // Handle color change from color picker
    const handleColorChange = (newColor) => {
        setColor(newColor.hex);  // Update the color state with the selected hex value
    };

    const handleAddColor = (e) => {
        e.preventDefault();
        console.log(e.target);
        const createColor = {
            name: e.target.name.value,
            code: e.target.code.value,
            status:e.target.status.value
        }

        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/color/create-color`, createColor)
            .then((response) => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Color Added",
                    showConfirmButton: false,
                    timer: 1000
                });
                nav('/admin/dashboard/profile/viewcolor');
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <div className="row m-3 rounded-3 shadow-lg">
            <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Add Colors</h5>
            <form action="" method="post" onSubmit={handleAddColor}>
                <div className='p-3'>
                    <label htmlFor="" className='form-label'> Color Name </label>
                    <input
                        type="text"
                        placeholder='Color Name'
                        className='form-control'
                        name='name'
                    />
                    <label htmlFor="" className='form-label mt-3'> Color Code </label>
                    <input
                        type="text"
                        placeholder='Color Code'
                        className='form-control mb-3'
                        id="color"
                        name="code"
                        value={color}
                        readOnly

                    />
                    <div class="mb-3 w-50">
                        <span className="w-100 object-contain my-2">
                            {imageSrc && (
                                <img
                                    src={imageSrc}
                                    alt="Select product"
                                    id="image_preview"
                                    width={300}
                                    height={200}
                                />
                            )}

                        </span>
                        <input
                            class="form-control"
                            type="file"
                            id="image_src"
                            name='image'
                            onChange={handleImageUpload}
                        />
                    </div>
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

                    <div className='d-flex gap-4 align-items-center mt-3'>
                        <label htmlFor="" className='form-label'> Status </label>
                        <input
                            type="radio"
                            name="status"
                            id="color-status"
                            value={true}
                        /> Display
                        <input
                            type="radio"
                            name="status"
                            id="color-status"
                            value={false}
                        /> Hide
                    </div>
                    <button
                        className='btn btn-primary mt-3 mx-2'
                        type='submit'
                    >
                        Add Color
                    </button>
                </div>
            </form>


        </div>
    )
}

export default AddColor