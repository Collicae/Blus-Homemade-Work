import React from "react";
import MainNav from "../components_Folder/page_Navigation";
import "../Styles/Sign-Up.css";
import { useState } from "react";
import Signup_Form from "../components_Folder/Sign_Up"


const User_Sign_Up = () => {


    return(
        <div id="form_container">
            <MainNav />
            <Signup_Form/>
        </div>
    )
};

export default User_Sign_Up;