import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GrFacebookOption, GrInstagram, GrTwitter, GrYoutube } from 'react-icons/gr';
import profile from './../Images/profile.jpg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';


function Profile() {
    const nav = useNavigate();

    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState({
        logo: null, // Initialize to null to avoid showing an image by default
        favicon: null,
        footer_logo: null,
        thumbnail: null,
    });
    const [adminData, setAdminData] = useState({});
    const [filePath, setFilePath] = useState("");
    const [ifOtp, setOtp] = useState(false);
    const [otpBtnText, setotpBtnText] = useState("Generate OTP");

    //get admin credential
    useEffect(() => {
        const auth =Cookies.get('admin-credential');
        verifyAdminLogin(auth);
    }, [])

    const verifyAdminLogin = (auth)=>{
        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/admin/verify-admin`, {auth})
        .then((response)=>{
          console.log(response.data);
            setAdminData(response.data.data);
            setFilePath(response.data.filePath);
        })
        .catch((error)=>{
          console.log(error);
        })
      }

    const handlePreview = (e) => {
        const { name, files } = e.target;
        const url = URL.createObjectURL(files[0]);
        setPreview((prevPreview) => ({
            ...prevPreview,
            [name]: url, // Set the preview for the respective input
        }));
    }

    const handleGenerateOtp = () => {

        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/admin/generate-otp`, { email: adminData.email })
            .then((response) => {
                console.log(response);

            })
            .catch((error) => {
                console.log(error);
            })
        setOtp(true);
        let counter = 60;  //otp stays for 10s

        let interval = setInterval(() => {
            counter -= 1;
            setotpBtnText(`Regenerate OTP in ${counter}s`);
            if (counter < 1) {
                clearInterval(interval);
                setotpBtnText("Generate OTP");
                setOtp(false);
            }
        }, 1000)
    }

    const updateEmail = () => {
        axios.post(`${import.meta.env.VITE_API_URL}admin-panel/admin/update-email`, {
            email: adminData.email,
            newemail: adminData.newemail,
            otp: adminData.otp
        })
            .then((response) => {
                console.log(response.data);
                Cookies.remove('admin-credential');
                nav('/admin');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="container my-5">
                <div className="row m-3 pb-4 rounded-3 shadow-lg align-items-center">
                    <h4 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Profile</h4>
                    <form action="" method='post' className='row'>
                        <div className="col-6">
                            <label htmlFor="" className='form-label'> Name </label>
                            <input
                                type="text "
                                className='form-control'
                                name="name"
                                onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                                value={adminData.name}
                            />
                            <label htmlFor="" className='form-label mt-3'> Social Link </label>
                            <div className='d-flex align-items-center gap-3 mb-3'>
                                <GrFacebookOption />
                                <input
                                    type="text"
                                    className='form-control'
                                    name="facebook"
                                    onChange={(e) => setAdminData({ ...adminData, facebook: e.target.value })}
                                    value={adminData.facebook}
                                />
                            </div>
                            <div className='d-flex align-items-center gap-3 mb-3'>
                                <GrInstagram />
                                <input
                                    type="text"
                                    className='form-control'
                                    name="instagram"
                                    onChange={(e) => setAdminData({ ...adminData, instagram: e.target.value })}
                                    value={adminData.instagram}
                                />
                            </div>
                            <div className='d-flex align-items-center gap-3 mb-3'>
                                <GrYoutube />
                                <input
                                    type="text"
                                    className='form-control'
                                    name="youtube"
                                    onChange={(e) => setAdminData({ ...adminData, youtube: e.target.value })}
                                    value={adminData.youtube}
                                />
                            </div>
                            <div className='d-flex align-items-center gap-3 mb-3'>
                                <GrTwitter />
                                <input
                                    type="text"
                                    className='form-control'
                                    name="twitter"
                                    onChange={(e) => setAdminData({ ...adminData, twitter: e.target.value })}
                                    value={adminData.twitter}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Logo</label>
                                <input
                                    className="form-control"
                                    type="file" id="formFile"
                                    name="logo"
                                    onChange={handlePreview}
                                />
                                {/* Render preview only if it's set */}
                                {preview.logo && (
                                    <div>
                                        <img src={preview.logo || filePath + adminData.logo}
                                            alt=""
                                            style={{ width: '70px', height: '70px' }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Favicon</label>
                                <input
                                    className="form-control"
                                    type="file" id="formFile"
                                    name="favicon"
                                    onChange={handlePreview}
                                />
                                {/* Render preview only if it's set */}
                                {preview.favicon && (
                                    <div>
                                        <img src={preview.favicon || filePath + adminData.favicon}
                                            alt=""
                                            style={{ width: '70px', height: '70px' }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Footer Logo</label>
                                <input
                                    className="form-control"
                                    type="file" id="formFile"
                                    name="footer_logo"
                                    onChange={handlePreview}
                                />
                                {/* Render preview only if it's set */}
                                {preview.logo && (
                                    <div>
                                        <img src={preview.footer_logo || filePath + adminData.footer_logo}
                                            alt=""
                                            style={{ width: '70px', height: '70px' }}
                                        />
                                    </div>
                                )}
                            </div>
                            <label htmlFor="" className='form-label'> Password </label>
                            <div className='input-group'>
                                <input
                                    type={show === false ? "password" : "text"}
                                    className='form-control'
                                    name="password"
                                    onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                                    value={adminData.password}
                                />
                                <span
                                    className='mx-2'
                                    onClick={() => { setShow(!show) }}
                                >
                                    {show ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>

                        </div>
                        <section className='col-6 text-center'>
                            <img
                                src={preview.thumbnail || filePath + adminData.footer_logo || profile}
                                alt="admin-profile-photoshot"
                                className='rounded-circle'

                                style={{ width: '200px', height: '200px' }}
                            />
                            <input
                                type="file"
                                name="thumbnail"
                                id="formFile"
                                className="form-control"
                                onChange={handlePreview}
                            />
                        </section>
                        <button className='col-2 mt-4 btn btn-primary mx-2 px-3 text-white' > Update </button>
                    </form>
                </div>
                <div className="row m-3 pb-4 rounded-3 shadow-lg align-items-center">
                    <h4 className=" px-2 py-3 bg-dark-subtle rounded-top-3">Update Email</h4>
                    <form action="" method="post">
                        <div className="row m-3 p-3 rounded-3 shadow-lg">
                            <label htmlFor="" className='form-label'> Current email </label>
                            <input
                                type="email "
                                className='form-control'
                                name='email'
                                value={adminData.email}
                            />
                            <div className={`${(ifOtp) ? 'd-block' : 'd-none'}`}>
                                <label htmlFor="" className='form-label mt-3'> OTP </label>
                                <input
                                    type="text"
                                    placeholder='Enter Otp'
                                    name="otp"
                                    className='form-control mb-3'
                                    onChange={(e) => { setAdminData({ ...adminData, otp: e.target.value }) }}
                                />
                                <input
                                    type="email"
                                    name="newemail"
                                    placeholder='Enter new email'
                                    className='form-control mb-3'
                                    onChange={(e) => setAdminData({ ...adminData, newemail: e.target.value })}
                                />
                            </div>

                            <button
                                className={` col-3 mt-4 mx-3 btn btn-primary px-3 text-white`}
                                onClick={handleGenerateOtp}
                                type="button"
                                disabled={ifOtp}
                            >
                                {otpBtnText}
                            </button>
                            <button
                                className={`${(ifOtp) ? 'd-block' : 'd-none'} col-3 mt-4 mx-3 btn btn-primary px-3 text-white`}
                                onClick={updateEmail}
                                type="button"
                            >
                                Update Email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile