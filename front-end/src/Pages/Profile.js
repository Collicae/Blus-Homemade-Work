import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Profile.css"
import MainNav from "../components_Folder/page_Navigation";

const Profile_App = () => {
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
                        <h1>Log-In</h1>
                        <form method="POST" id="log-in_Form">
                            <input type="text" placeholder="UserName" name="established_UserName" id="established_UserName" required />

                            <input type="password" placeholder="Password" name="established_Password" id="established_Password" required />

                            <input type="submit" name="Log-In_Btn" id="Log-In_Btn" value="Log-In" />
                        </form>

                        

                        <div id="Sign-Up_Area">
                        <p>Don't have an account? Don't worry you can sign up for free</p>
                            <div id="Sign-Up_Btn">
                               <Link to="/Sign">Sign-Up</Link>
                            </div>
                        </div>
                </div>

            </div>



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