// update the services
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthenticationContext';

const ServiceUpdation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState();

    const [updatedData, setUpdatedData] = useState({
        itemName: '',
        brand: '',
        itemDescription: '',
        price: ''
    });

    // State to manage alert message
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const data = location.state.item
        setCurrentData(data);
        setUpdatedData(data);
    }, [])

    const labelStyle = 'w-full text-xl capitalize';
    const inputStyle = 'w-full p-3 rounded-xl text-black focus:outline-none';
    const buttonStyle = `w-1/2 p-2 capitalize text-xl bg-blue-600  hover:bg-blue-800 transition-all duration-500 border-r border-gray-700 `;

    //handling the form change
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setAlert(false);
        setMessage('');
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value
        }))

    }

    //handling the formSubmit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(currentData);
        const { itemName, brand, itemDescription, price } = updatedData;
        if (itemName === '' || itemDescription === '' || price === '' || brand === '') {
            setAlert(true);
            setMessage("all fields are mandatory")
        }
        else {
            const credentials = { itemName, brand, itemDescription, price };
            try {
                const response = await axios.put(`http://localhost:4000/service/update/${currentData._id}`, {
                    credentials
                })
                if (response.status === 200) {
                    navigate('/servicehub');
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className=' h-full text-white'>
            <div className='pt-20 pb-24'>
                <div className='p-4 max-w-md mx-auto space-y-5'>
                    {alert && <p className='text-sm text-red-500'>{message}</p>}
                    <div className='space-y-2'>
                        <label className={labelStyle}>name</label>
                        <input type='text'
                            className={inputStyle}
                            name='itemName'
                            value={updatedData.itemName}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className={labelStyle}>brand</label>
                        <input type='text'
                            className={inputStyle}
                            name='brand'
                            value={updatedData.brand}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className={labelStyle}>description</label>
                        <textarea type='text'
                            className={inputStyle}
                            name='itemDescription'
                            value={updatedData.itemDescription}
                            rows="3"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className={labelStyle}>price</label>
                        <input
                            type='text'
                            className={inputStyle}
                            name='price'
                            value={updatedData.price}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div>
                        <button className={buttonStyle} onClick={() => navigate(-1)}>back</button>
                        <button className={buttonStyle} onClick={handleFormSubmit} type='submit'>submit</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ServiceUpdation