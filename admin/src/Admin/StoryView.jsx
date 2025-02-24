import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md';
import tshirt from './../Images/Story_Img.avif';
import banner from './../Images/Story_Banner.webp';
import axios, { all } from 'axios';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function StoryView() {
    const [allStories, setAllStories] = useState([]);
    const [filePath, setFilePath] = useState('');
    const [checkedStory, setCheckedStory] = useState([]);
    const [ifAllChecked, setIfAllChecked] = useState(false);

    const viewAllStories = () => {
        axios.get(`${import.meta.env.VITE_API_URL}admin-panel/story/read-stories`)
            .then((response) => {
                console.log(response.data);
                setAllStories(response.data.data);
                setFilePath(response.data.filePath);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => { viewAllStories() }, [])

    //update Story Status function
    const updateStatus = (e) => {
        const status = e.target.textContent !== "Active";
        axios.put(`${import.meta.env.VITE_API_URL}admin-panel/story/update-status/${e.target.value}`, { status })
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "Status has been updated",
                    showConfirmButton: false,
                    timer: 1000
                });
                viewAllStories();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //handle Delete particular Story
    const handleDelete = (id) => {
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
                axios.delete(`${import.meta.env.VITE_API_URL}admin-panel/story/delete-story/${id}`)
                    .then((response) => {
                        console.log(response.data);
                        viewAllStories();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Story has been deleted!!",
                    icon: "success"
                });
            }
        });
    }

    //handle checked stories
    const handleCheckedStory = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedStory([value, ...checkedStory])   //add value to the checkedStory in the begining
        } else {
            setCheckedStory(checkedStory.filter((storyId) => storyId !== value));
        }
    }

    //Checked-unChecked All Stories
    const handleAllCheckedStory = (e) => {
        if (e.target.checked) {
            setCheckedStory(allStories.map((story) => story._id));
        } else {
            setCheckedStory([]);
        }
    }

    //useEffect to set If all story checked or not
    useEffect(() => {
        setIfAllChecked(allStories.length === checkedStory.length && allStories.length !== 0)
    }, [allStories, checkedStory])

    //Handle Delete All Checked Story
    const handleDeleteAllCheckedStory = () => {
        if (checkedStory.length === 0) {
            Swal.fire({
                text: "Please Select items to delete?",
                icon: "warning"
            });
        } else {
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
                    axios.put(`${import.meta.env.VITE_API_URL}admin-panel/story/delete-stories`, { checkedStory })
                        .then((response) => {
                            console.log(response.data);
                            viewAllStories();
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    Swal.fire({
                        title: "Deleted!",
                        text: "All Selected Stories has been deleted!!",
                        icon: "success"
                    });
                }
            });
        }

    }


    return (
        <>
            <div className="row m-3 rounded-3 shadow-lg">
                <h5 className=" px-2 py-3 bg-dark-subtle rounded-top-3">View Stories</h5>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <button
                                        className='btn btn-danger'
                                        onClick={handleDeleteAllCheckedStory}
                                    >
                                        Delete
                                    </button>
                                    <input
                                        type="checkbox"
                                        className='ms-2'
                                        onClick={handleAllCheckedStory}
                                        checked={ifAllChecked}
                                    />
                                </th>
                                <th>  Sr.No. </th>
                                <th>  Story Name </th>
                                <th>  Image</th>
                                <th>  Banner</th>
                                <th>  Description </th>
                                <th>  Action </th>
                                <th>  Status </th>
                            </tr>

                        </thead>
                        <tbody className='border-bottom-secondary'>
                            <Tooltip id="status-tooltip" className='bg-danger' />
                            {
                                allStories.length <= 0 ?
                                    <p className='text-center'>----No Story Exists----</p>
                                    :
                                    allStories.map((story, index) => (
                                        <tr key={story._id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    value={story._id}
                                                    onClick={handleCheckedStory}
                                                    checked={checkedStory.includes(story._id)}
                                                />
                                            </td>
                                            <td>  {index + 1}</td>
                                            <td> {story.story_name} </td>
                                            <td>  <img src={filePath + story.story_img} alt="photo of the product" style={{ width: '70px' }} /></td>
                                            <td > <img src={filePath + story.banner} alt="photo of the product" style={{ width: '150px', height: "70px" }} /> </td>
                                            <td>  {story.description}</td>
                                            <td >
                                                <div className='d-flex gap-2'>
                                                    <MdDelete
                                                        className='text-danger'
                                                        onClick={() => handleDelete(story._id)}
                                                    /> |
                                                    <Link to={`/admin/dashboard/profile/updatestory/${story._id}`}>
                                                        <CiEdit className='text-warning' />
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    className={`btn ${story.status ? 'btn-success' : 'btn-danger'}`} data-tooltip-id='status-tooltip'
                                                    data-tooltip-content={(story.status ? "In-Active" : "Active")}
                                                    onClick={updateStatus}
                                                    value={story._id}
                                                >
                                                    {story.status ? "Active" : "InActive"}
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

export default StoryView