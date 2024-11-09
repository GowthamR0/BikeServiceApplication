// it is used to login using username and password

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//context
import { useAuth } from '../../Context/AuthenticationContext';
import axios from 'axios';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  //fetching state & action from context
  const { userInfo, setUserInfo } = useAuth();

  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State to manage alert message
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');

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
    const { email, password } = formData;

    if (!email || !password) {
      setAlert(true);
      setMessage('Email and Password is required');
    }
    else {
      setAlert(false);
      setMessage('');
      // console.log(email + " " + password);
      try {

        const credentials = { email, password };

        const response = await axios.post('http://localhost:4000/auth/login', {
          credentials
        })
        // console.log(response);
        if (response.status === 200) {
          // console.log(response.data.token);
          localStorage.setItem('token', response.data.token);
          setUserInfo(response.data.user);
          toast.success("Login successfull")
          // console.log("navigating");
          navigate('/');
        }

      } catch (err) {
        toast.warning(err.response.data);
        // console.log(err);
      }
    }
  }


  const labelStyle = 'w-full text-xl capitalize';
  const inputStyle = 'w-full p-3 rounded-xl text-black focus:outline-none';
  const buttonStyle = `w-2/5 p-2 capitalize text-xl bg-blue-600 rounded hover:bg-blue-800 transition-all duration-500 `;
  const loginButton = `w-full bg-blue-600 capitalize rounded-2xl p-2 hover:bg-blue-700 transition-all duration-500`;


  return (
    <div className='w-full'>
      <div className='flex h-screen items-center text-white'>
        <div className='p-4 max-w-md mx-auto space-y-5'>
          {alert && <p className='text-sm text-red-500'>{message}</p>}
          <div className='space-y-2'>
            <label className={labelStyle}>email</label>
            <input
              className={inputStyle}
              required
              type='text'
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <div className='space-y-2'>
            <label className={labelStyle}>password</label>
            <input
              className={inputStyle}
              required
              type='password'
              name='password'
              value={formData.password}
              onChange={handleFormChange}
            />
          </div>
          <div className='w-full space-y-3'>
            <button className={loginButton} onClick={() => navigate('/signup')}>create an account</button>
            <div className='flex justify-between'>
              <button className={buttonStyle} onClick={() => navigate('/')}>home</button>
              <button className={buttonStyle} onClick={handleFormSubmit}>login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
