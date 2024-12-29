import React from "react";
import { useState } from "react"
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Profile.css"
import MainNav from "../components_Folder/page_Navigation";
import Main_App from "./Home";

const Profile_App = () => {

    const [gotEmail, setgotEmail] = useState('')
    const [gotPass, setgotPass] = useState('')
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate()
    
    const handleLogin = async (e) => {
      e.preventDefault();
      
      const credentials = {
        email: gotEmail,
        password: gotPass,
      };
    
      try {
        const response = await axios.post("https://blushomemade-e0fkbbdtaadtcuhw.canadacentral-01.azurewebsites.net/api/token/", credentials);
        const { access } = response.data;
        const decodedToken = jwtDecode(access);
        const { user_id } = decodedToken;
    
        // Make the second request with user_id
        const userResponse = await axios.get(`https://blushomemade-e0fkbbdtaadtcuhw.canadacentral-01.azurewebsites.net/api/create/${user_id}`, {
          headers: {
            Authorization: `Bearer ${access}`
          }
        });
        
        //COOKIES ARE SET TO FALSE NOW DUE TO DEVELOPMENT ONCE DEVELOPMENT IS OVER CHANGE SECURE BACK TO TRUE
        const { email, first_name, last_name } = userResponse.data;
        Cookies.set(`ID_${user_id}`, user_id.toString(), { expires: 0.0833, path: '/', secure: false });
        Cookies.set(`Email_${user_id}`, email, { expires: 0.0833, path: '/', secure: false });
        Cookies.set(`First_N_${user_id}`, first_name, { expires: 0.0833, path: '/', secure: false });
        Cookies.set(`Last_N_${user_id}`, last_name, { expires: 0.0833, path: '/', secure: false });
        setUserId(user_id); // Set user ID to state
        navigate('/'); 
    
      } catch (error) {
        // Check if user_id can be accessed safely
        const user_id = error.response?.data?.user_id || null;
    
        if (user_id) {
          console.error('Error:', error.response.data);
          Cookies.remove(`ID_${user_id}`);
          Cookies.remove(`Email_${user_id}`);
          Cookies.remove(`First_N_${user_id}`);
          Cookies.remove(`Last_N_${user_id}`);
        } else {
          console.error('Error:', error.response ? error.response.data : error.message);
        }
      }
    };

    return(

        <div>
            <MainNav/>
           

            <div id="body_Div">

            </div>

            <div id="head_Profile">
                Join the Family
            </div>

            <div id="form_Entry">

                <div id="user_Already_Signed_Up">
                        <div id="user_Already_Signed_Up_Form">
                          <form method="POST" id="log-in_Form" onSubmit={handleLogin} >
                            <h1>Log-In</h1>
                              <input type="text" placeholder="Email" name="established_UserName" id="established_UserName" value={gotEmail} onChange={(e)=>setgotEmail(e.target.value)}  required />

                              <input type="password" placeholder="Password" name="established_Password" id="established_Password" value={gotPass} onChange={(e) => setgotPass(e.target.value)} required />

                            <input type="submit" name="Log-In_Btn" id="Log-In_Btn" value="Log-In"/>
                          </form>
                        </div>
                </div>

                <div id="Sign-Up_Area">
                  <div id="Sign-Up_Area_Parameter">
                      <div id="Sign-Up_Area_Seperator"> </div>

                        <p>Don't have an account? Don't worry you can sign up for free</p>
                            <div id="Sign-Up_Btn">
                               <Link to="/Sign">Sign-Up</Link>
                            </div>
                        </div>
                    </div>
            </div>
            {userId && <Main_App user_Id={userId} />}




            <footer>
        <table>
          <thead>
          <tr>
            <th>Contact Us</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>Person 1</td>
            <td>"Insert Number Here"</td>
          </tr>
        <tr>
          <td>Person 2</td>
          <td>"Insert Number Here"</td>
        </tr>
        </tbody>
       
        </table>


        <table>
          <tbody>
          <tr>
            <td>More Options coming soon</td>
          </tr>
          </tbody>
        </table>

        
        {/* Only add if they have other social media accounts they would like to add */}
        {/*<h2 id="footer_Socials">Follows Us on Other sites</h2>*/}

      </footer>
        </div>



    )
    
}

export default Profile_App;
