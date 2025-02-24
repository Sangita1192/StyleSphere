import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateSlider = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [Slider, setSlider] = useState({});
    const [filePath, setFilePath] = useState('');
    const [imgPreview, setImgPreview] = useState(null);

    //fetch Slider Details
    const fetchSlider = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/slider/read-slider/${id}`)
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
    }, [id]);

    const handleImgPreview = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImgPreview(url);
    }

    const handleUpdateSlider = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/slider/update-slider/${id}`, e.target)
            .then((response) => {
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "Slider has been updated",
                    showConfirmButton: false,
                    timer: 800
                  });
                  nav('/admin/dashboard/profile/viewslider');

            })
            .catch((error) => {
                console.log(error);
            })

    }
    return (
        <div className="row m-3 rounded-3 shadow-lg">
            <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Update Slider</h5>

            <form className='p-5 pt-2' method='post' onSubmit={handleUpdateSlider} >
                <label htmlFor="slider" className='form-label'> Slider Name </label>
                <input
                    type="text"
                    placeholder='Slider Name'
                    className='form-control mb-3'
                    name='slider_name'
                    id="slider"
                    value={Slider.slider_name}
                    onChange={(e) => setSlider({ ...Slider, slider_name: e.target.value })}

                />
                <label htmlFor="Heading" className='form-label'>Heading </label>
                <input
                    type="text"
                    placeholder='Heading'
                    className='form-control mb-3'
                    name="heading"
                    id="heading"
                    value={Slider.heading}
                    onChange={(e) => setSlider({ ...Slider, heading: e.target.value })}

                />
                <label
                    htmlFor="Sub-heading"
                    className='form-label'>
                    Sub Heading
                </label>
                <input
                    type="text"
                    placeholder='Sub Heading'
                    className='form-control mb-3'
                    id='sub_heading'
                    name="sub_heading"
                    value={Slider.sub_heading}
                    onChange={(e) => setSlider({ ...Slider, sub_heading: e.target.value })}
                />
                <div className="mb-3">
                    <label htmlFor="Image"
                        className="form-label">
                        Image
                    </label>
                    <input
                        className="form-control"
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImgPreview}
                    />
                    <img src={imgPreview || filePath + Slider.image} className='mt-3 w-25' />
                </div>

                <button
                    className='mt-4 btn btn-primary px-3 text-white'
                    type='submit'
                >
                    Update Slider
                </button>
            </form>

        </div>
    )
}

export default UpdateSlider