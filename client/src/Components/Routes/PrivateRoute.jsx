import React, { useEffect } from 'react';
import { useAuth } from '../../Context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
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
                    if (response.status === 200) {
                        setUserInfo(response.data);
                    }
                } catch (err) {
                    setUserInfo('');
                    localStorage.clear();
                    console.log(err);
                    navigate('/login');
                }
            }

        };

        fetchData(); // Call fetchData function

    }, []);

    return (
        <div>
            {
                userInfo &&
                children
            }
        </div>
    );
};

export default PrivateRoute;
