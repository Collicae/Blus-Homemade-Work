import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Cookies from 'js-cookie';

const UserSign = () => {
    const [currentInfo, setCurrentInfo] = useState({
        password: '',
        email: '',
        f_name: '',
        l_name: '',
    });
    const [userId, setUserId] = useState(null); // Changed to null for a single user ID
    const [error, setError] = useState(null); // For error handling
    const navigate = useNavigate();

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setCurrentInfo(prevState => ({
            ...prevState, 
            [name]: value
        }));
    };

    const handleSubmission = async (e) => {
        e.preventDefault();

        const dataToSend = {
            first_name: currentInfo.f_name,
            last_name: currentInfo.l_name,
            email: currentInfo.email,
            password: currentInfo.password
        };

        try {
            const response = await axios.post("https://blushomemade-e0fkbbdtaadtcuhw.canadacentral-01.azurewebsites.net/api/create/", dataToSend);
            console.log(response.data)
            const { access, refresh, user_id } = response.data;

            // Fetch user data after delay if needed (optional)
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            //await axios.get(`http://127.0.0.1:8000/api/create/${user_id}`);

            navigate('/Profile'); // Navigate after fetching user data
        } catch (error) {
            console.log(error);
            setError("An error occurred during sign-up."); // Set error message
            if (userId) { // Ensure userId is defined before removing cookies
                Cookies.remove(`ID_${userId}`);
                Cookies.remove(`access_${userId}`);
                Cookies.remove(`refresh_${userId}`);
            }
        }
    };

    return (
        <div id="formDiv">
            <form id="signup_Form" method="POST" onSubmit={handleSubmission}>
                <h1>Sign Up</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}


                <div className="additionalInfo">
                    <label className="additional_Text">First Name: </label>
                    <input className="additional_Input" type="text" name="f_name" placeholder="Enter your first name" value={currentInfo.f_name} onChange={handleChanges} required/>
                </div>

                
                <div className="additionalInfo">
                    <label className="additional_Text">Last Name:</label>
                    <input className="additional_Input" type="text" name="l_name" placeholder="Enter your last name" value={currentInfo.l_name} onChange={handleChanges} required/>
                </div>


                <div className="additionalInfo">
                    <label className="additional_Text">Email:</label>
                    <input className="additional_Input" type="email" name="email" placeholder="Enter your email" value={currentInfo.email} onChange={handleChanges} required/>
                </div>

                <div className="additionalInfo">
                    <label className="additional_Text">Password:</label>
                    <input className="additional_Input" type="password" name="password" placeholder="Enter your password" value={currentInfo.password} onChange={handleChanges} required/>
                </div>
                <div id="sign_UP_USER">
                    <button type="submit">Create</button>
                </div>
            </form>

            {/*{userId && <AutoLogin userId={userId} />} {/* Pass userId directly */}
        </div>
    );
};

export default UserSign;
