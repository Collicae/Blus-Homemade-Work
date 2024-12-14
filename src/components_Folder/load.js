import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AutoLogin = ({ userId }) => {
    const accessToken = Cookies.get('access');
    
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            if (accessToken && Array.isArray(userId) && userId.length > 0) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                try {
                    const userRequests = userId.map(id => 
                        axios.get(`http://127.0.0.1:8000/api/create/${id}`)
                    );

                    const responses = await Promise.all(userRequests);
                    const data = responses.reduce((acc, response) => {
                        acc[response.data.id] = response.data; // assuming response data has an 'id'
                        return acc;
                    }, {});

                    setUserData(data);
                    console.log('User data:', data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                console.log('No access token or no user IDs provided for AutoLogin.');
            }
        };

        fetchUserData();
    }, [userId, accessToken]);

    return (
        <>
            {/* Render user data here */}
        </>
    );
};

export default AutoLogin;

