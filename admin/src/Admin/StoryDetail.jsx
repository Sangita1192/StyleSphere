import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function StoryDetail() {
    const nav = useNavigate();
    const [storyImgPreview, setStoryImg] = useState([]);
    const [bannerPrev, setBannerPrev] = useState([]);

    const handleImgPreview = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        const url = URL.createObjectURL(file);
        if (name === 'story_img') {
            setStoryImg(url);
        } else {
            setBannerPrev(url);
        }

    }
    const handleCreateStory = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/story/create-story`, e.target)
            .then((response) => {
                console.log(response.data);
                let timerInterval;
                Swal.fire({
                    title: "Story Added!!",
                    html: "I will close in <b></b> milliseconds.",
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
                       
                    }
                });
                nav('/admin/dashboard/profile/viewstory');
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Our Stories</h5>
                <form className='p-5 pt-2' method='post' onSubmit={handleCreateStory}>
                    <label htmlFor="story_name" className='form-label'> Story Name </label>
                    <input
                        type="text"
                        placeholder='Story Name'
                        className='form-control'
                        id="story_name"
                        name='story_name' />
                    <div className="mb-3">
                        <label htmlFor="story_image" className="form-label">Image</label>
                        <input
                            className="form-control"
                            type="file"
                            id="story_image"
                            name="story_img"
                            onChange={handleImgPreview}
                        />
                        {
                            (
                                <img src={storyImgPreview} className='mt-3 w-25' />
                            )
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="banner" className="form-label">Banner Image</label>
                        <input
                            className="form-control"
                            type="file"
                            id="banner"
                            name="banner"
                            onChange={handleImgPreview}
                        />
                        {
                            (
                                <img src={bannerPrev} className='mt-3 w-25' />
                            )
                        }
                    </div>

                    <label htmlFor="description" className='form-label mt-3'>Description </label>
                    <textarea
                        className='form-control mb-3'
                        placeholder="description"
                        name="description"
                        id="description"
                    />
                    <div className='d-flex gap-4 align-items-center mt-3'>
                        <label htmlFor="status" className='form-label'> Status </label>
                        <input
                            type="radio"
                            value={true}
                            name="status"
                            id="status"
                        /> Display
                        <input
                            type="radio"
                            name="status"
                            value={false}
                            id="status"
                        /> Hide
                    </div>
                    <button
                        className='mt-4 btn btn-primary px-3 text-white'
                        type="submit"
                    >
                        Add Story
                    </button>
                </form>

            </div>
        </>
    )
}

export default StoryDetail