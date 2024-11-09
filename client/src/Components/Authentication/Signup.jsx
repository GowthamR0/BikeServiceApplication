// it is used to signup using fullName,email,password,phoneNumber and also can check the email using otp

import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//context
import { useAuth } from '../../Context/AuthenticationContext';

//react-icons
import { IoCloseOutline } from "react-icons/io5";

//headlessui
import { Dialog, Transition } from '@headlessui/react'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [tempUserId, setTempUserId] = useState('');

  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  // State to manage alert message
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState('30');
  const [hideButton, setHideButton] = useState(false);


  //dialog box for handling the otp
  const HandleOtp = () => {

    const [otp, setOtp] = useState('');

    const handleOtpChange = (e) => {
      setOtp(e.target.value);
    }

    const handleOtpSubmit = async (e) => {
      const credentials = { otp };
      try {
        const response = await axios.post(`http://localhost:4000/auth/signup/${tempUserId}`, {
          credentials
        })
        // console.log(response);
        if (response.status === 200) {
          toast.success("user created successfully");
          navigate('/login');
        }
      } catch (err) {
        toast.warning(err.response.data);
      }
    }

    const handleResendOtp = async (e) => {
      try {
        const response = await axios.put(`http://localhost:4000/auth/signup/tempuser/${tempUserId}`);
        setOtp('');
        if (response.status === 200) {
          setHideButton(true);
          setTimeout(() => {
            setHideButton(false);
          }, 1000 * 30)
          toast.warning("otp resended successfully");
        }
      } catch (err) {
        toast.warning(err.response.data);
        // console.log(err);
      }
    }

    function closeModal() {
      setIsOpen(false);
    }

    function openModal() {
      setIsOpen(true);
    }

    const handleHideButtonClick = () => {
      toast.warning("ResendOTP enabled after 30 seconds");
    }

    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className=" px-4 h-screen text-center flex justify-center items-center">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-80" />

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className='text-3xl flex justify-end' onClick={closeModal}><IoCloseOutline /></div>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Otp Sended Successfull
              </Dialog.Title>
              <div className="mt-2 space-y-2">
                <label className="">Enter the otp</label>
                <input
                  className="w-full bg-gray-900 p-2 text-white rounded-xl"
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
              <div className="mt-4 flex flex-row justify-between">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={!hideButton ? handleResendOtp : handleHideButtonClick}
                >
                  {hideButton ?
                    <p>Disabled</p> :
                    <p>ResendOtp</p>
                  }
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={handleOtpSubmit}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

  };

  //Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, phoneNumber } = formData;
    if (!fullName || !email) {
      setAlert(true);
      setMessage('Fullname and email is required');
      return;
    }
    else if (password.length < 8) {
      setAlert(true);
      setMessage('Password must be at least 8 characters');
      return;
    }
    else if (phoneNumber.length !== 10) {
      setAlert(true);
      setMessage('Phone number is equal to 10 characters');
      return;
    }
    try {
      const credentials = { fullName, password, email, phoneNumber };
      setAlert(false);
      setMessage('');
      // console.log(email + " " + fullName + " " + password + " " + phoneNumber);
      const response = await axios.post('http://localhost:4000/auth/signup/tempuser', {
        credentials
      })
      if (response.status === 200) {
        // console.log(response)
        setTempUserId(response.data);
        setIsOpen(true);
        toast.success("otp sended successfully & valid for 10 minutes");
        setHideButton(true);
        setTimeout(() => {
          setHideButton(false);
        }, 1000 * 30)
      }
    }
    catch (err) {
      // console.log(err);
      toast.warning(err.response.data);
    }
  }

  const labelStyle = 'w-full text-xl capitalize';
  const inputStyle = 'w-full p-3 rounded-xl text-black focus:outline-none';
  const buttonStyle = `w-2/5 p-2 capitalize text-xl bg-blue-600 rounded hover:bg-blue-800 transition-all duration-500 `;
  const loginButton = `w-full bg-blue-600 capitalize rounded-2xl p-2 hover:bg-blue-700 transition-all duration-500`;

  return (
    <div className=' w-full'>
      <div className='flex h-screen items-center text-white'>
        <div className='p-4 max-w-md mx-auto space-y-5'>
          {alert && <p className='text-sm text-red-500'>{message}</p>}
          <div className='space-y-2'>
            <label className={labelStyle}>fullname</label>
            <input
              className={inputStyle}
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleFormChange} // Add onChange handler
            />
          </div>
          <div className='space-y-2'>
            <label className={labelStyle}>password</label>
            <input
              className={inputStyle}
              type='password'
              name='password'
              value={formData.password}
              onChange={handleFormChange} // Add onChange handler
            />
          </div>
          <div className='space-y-2'>
            <label className={labelStyle}>gmail</label>
            <input
              className={inputStyle}
              type='email'
              name='email'
              value={formData.email}
              onChange={handleFormChange} // Add onChange handler
            />
          </div>
          <div className='space-y-2'>
            <label className={labelStyle}>phonenumber</label>
            <input
              className={inputStyle}
              type='text'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleFormChange} // Add onChange handler
            />
          </div>
          <div className='w-full space-y-3'>
            <button className={loginButton} onClick={() => navigate('/login')}>already an user? login</button>
            <div className='flex justify-between'>
              <button className={buttonStyle} onClick={() => navigate('/')}>home</button>
              <button className={buttonStyle} onClick={handleFormSubmit}>signup</button>
            </div>
          </div>
        </div>
      </div>
      <HandleOtp />
    </div>
  );
}

export default Signup;