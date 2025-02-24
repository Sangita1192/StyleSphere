import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom'

const UpdateStory = () => {
    const { id } = useParams();
    const nav = useNavigate();

    const [fetchStory, setFetchStory] = useState({});
    const [filePath, setFilePath] = useState('');
    const [StoryImg, setStoryImg] = useState(null);
    const [bannerPrev, setBannerPrev] = useState(null);

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

    const fetchStoryToBeUpdate = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/story/read-story/${id}`)
            .then((response) => {
                console.log(response.data);
                setFetchStory(response.data.data);
                setFilePath(response.data.filePath);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchStoryToBeUpdate();
    }, [id])


    //Update Story Handler
    const handleUpdateStory = (e)=>{
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/story/update-story/${id}`, e.target)
        .then((response)=>{
            console.log(response.data);
            nav('/admin/dashboard/profile/viewstory');
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3"> Update Stories</h5>
                <form className='p-5 pt-2' method='post' onSubmit={handleUpdateStory}>
                    <label htmlFor="story_name" className='form-label'> Story Name </label>
                    <input
                        type="text"
                        placeholder='Story Name'
                        className='form-control'
                        id="story_name"
                        name='story_name'
                        value={fetchStory.story_name}
                        onChange={(e) => setFetchStory({ ...fetchStory, story_name: e.target.value })}
                    />
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
                                <img src={StoryImg || filePath + fetchStory.story_img} className='mt-3 w-25' />
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
                                <img src={bannerPrev||filePath + fetchStory.banner} className='mt-3 w-25 h-25' />
                            )
                        }
                    </div>

                    <label htmlFor="description" className='form-label mt-3'>Description </label>
                    <textarea
                        className='form-control mb-3'
                        placeholder="description"
                        name="description"
                        id="description"
                        value={fetchStory.description}
                        onChange={(e) => setFetchStory({ ...fetchStory, description: e.target.value })}
                    />
                    <button
                        className='mt-4 btn btn-primary px-3 text-white'
                        type="submit"
                    >
                        Update Story
                    </button>
                </form>

            </div>
        </>
    )
}

export default UpdateStory