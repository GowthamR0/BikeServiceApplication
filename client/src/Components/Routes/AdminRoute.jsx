import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../Context/AuthenticationContext';
import axios from 'axios';

const AdminRoute = ({ children }) => {
    const { userInfo, setUserInfo } = useAuth();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {

        const credentials = { token };

        const fetchData = async () => {
            if (token === null) {
                navigate('/login');
            }
            else {
                try {
                    const response = await axios.post("http://localhost:4000/auth/protected", {
                        credentials
                    });
                    if (response.status === 200 && response.data.role === 'admin') {
                        setUserInfo(response.data);
                    } else {
                        navigate('/login');
                    }
                } catch (err) {
                    console.log(err);
                    navigate('/login');
                }
            }

        };

        fetchData(); // Call fetchData function

    }, []);

    return (
        <div>
            {children}
        </div>
    )
}

export default AdminRoute