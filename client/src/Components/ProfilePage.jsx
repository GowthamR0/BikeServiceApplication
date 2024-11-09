import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import '../Components/Styles/Modal.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthenticationContext';
import axios from 'axios';
import Loader from './Loader';

const ProfilePage = () => {

    const { userInfo, setUserInfo } = useAuth();
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const credentials = { token }
        const fetchUser = async () => {
            try {
                const response = await axios.post("http://localhost:4000/auth/protected", {
                    credentials
                });
                if (response.status === 200) {
                    setUserInfo(response.data);
                }
            } catch (err) {
                setUserInfo('');
                localStorage.clear();
                // console.log(err);
                // navigate('/login');
            }
        }
        if (token) {
            // console.log(token);
            fetchUser();
        }
    }, [])

    //handle close button
    const handleGoBack = () => {
        // Navigate back to the previous page
        navigate(-1);
    };

    //handling logout
    const handleLogout = () => {
        localStorage.clear();
        setUserInfo('');
        navigate('/');
    }

    //handle new service creation
    const handleServiceCreation = () => {
        navigate('/servicehub/create');
    }

    //handling the user orders
    const handleUserOrders = () => {
        navigate('/bookhub');
    }

    //handling the user history i.e completed orders
    const handleHistory = () => {
        if (userInfo.role === 'admin') {
            navigate('/adminOrders');
        } else {
            navigate('/orders');
        }
    }

    const handleDeleteAccount = async () => {
        setLoader(true);
        try {
            const response = await axios.delete(`http://localhost:4000/auth/delete/${userInfo.id}`);
            if (response.status === 200) {
                setLoader(false);
                navigate('/');
                localStorage.clear();
                setUserInfo('');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='modal text-white'>
            {
                loader ?
                    <div>
                        <Loader />
                        <p
                            className='text-white absolute top-20 w-full h-screen text-center flex items-center justify-center font-mono'
                        >
                            This may take a while
                        </p>
                    </div>
                    :
                    <div className='modal-content'>
                        <div className='p-4 space-y-5'>
                            <div className='modal-header'>
                                <h1 className='modal-h1'>myprofile</h1>
                                <div onClick={handleGoBack}>
                                    <IoCloseOutline className='cursor-pointer' />
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <div className='modal-body' >
                                    <span className='cursor-pointer ' onClick={() => navigate('/login')}>login</span>
                                </div>
                                <div className='modal-body'>
                                    <span className='cursor-pointer' onClick={() => navigate('/signup')}>signup</span>
                                </div>
                                {
                                    userInfo &&
                                    <div className='space-y-4'>
                                        <div className='modal-body'>
                                            <span className='cursor-pointer' onClick={handleLogout}>logout</span>
                                        </div>
                                        <div className='modal-body'>
                                            <span className='cursor-pointer' onClick={handleUserOrders}>orders</span>
                                        </div>
                                        <div className='modal-body' >
                                            <span className='cursor-pointer' onClick={handleHistory}>history</span>
                                        </div>
                                    </div>
                                }

                                {
                                    userInfo && userInfo.role.toLowerCase() !== 'admin' &&
                                    <div>
                                        <div className='modal-body'>
                                            <span className='cursor-pointer' onClick={handleDeleteAccount}>Delete Account</span>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                        {userInfo && userInfo.role.toLowerCase() === 'admin' && (
                            <div>
                                <hr />
                                <div className='p-4 space-y-2'>
                                    <div className='modal-body' >
                                        <span className='cursor-pointer' onClick={handleServiceCreation}>create</span>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
            }

        </div>
    )
}

export default ProfilePage;
