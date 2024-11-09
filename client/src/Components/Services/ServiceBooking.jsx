//It is used to book the service by an user
import React, { useEffect, useState } from 'react'
import { IoDice } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthenticationContext';
import axios from 'axios';

const ServiceBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //fetching state & action from context
    const { userInfo, setUserInfo } = useAuth();

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        bikeName: '',
        bikeNumber: ''
    });

    // State to manage alert message
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setData(location.state);
    }, [])

    const labelStyle = 'w-full text-xl capitalize';
    const inputStyle = 'w-full p-3 rounded-xl text-black focus:outline-none';

    // Handle form change
    const handleFormChange = (e) => {
        setAlert(false);
        setMessage('');
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleBookNow = async (e) => {
        e.preventDefault();
        const { bikeName, bikeNumber } = formData;
        if (bikeName === '') {
            setMessage("BikeName is Mandatory")
            setAlert(true);
        }
        else if (bikeNumber === '') {
            setMessage("BikeNumber is Mandatory")
            setAlert(true);
        }
        else {
            const servicesRequired = [...data.map((item) => item.id)]
            const credentials = { email: userInfo.email, bikeName, bikeNumber, servicesRequired, paymentStatus: "COD" }
            // console.log(credentials);
            try {
                const response = await axios.post('http://localhost:4000/order/new', {
                    credentials
                })
                if (response.status === 200) {
                    navigate('/bookhub')
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className=' h-screen'>
            <div className='text-white h-full flex justify-center items-center'>
                <div className='p-4 max-w-md mx-auto space-y-5'>
                    {alert && <p className='text-sm text-red-500'>{message}</p>}
                    <div className='space-y-2'>
                        <label className={labelStyle}>bikename</label>
                        <input
                            type='text'
                            className={inputStyle}
                            name='bikeName'
                            value={formData.bikeName}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className={labelStyle}>bikenumber</label>
                        <input
                            type='text'
                            className={inputStyle}
                            name='bikeNumber'
                            style={{ textTransform: 'uppercase' }}
                            value={formData.bikeNumber}
                            onChange={handleFormChange}
                        />
                    </div>
                    <p className='text-xl capitalize font-bold'>
                        total amount : {data.reduce((total, item) => total + parseInt(item.price), 0)}
                    </p>
                    <div className='w-1/2 mx-auto'>
                        <button
                            className='capitalize w-full bg-blue-700 p-2 text-xl rounded-xl'
                            onClick={handleBookNow}
                        >
                            book now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceBooking