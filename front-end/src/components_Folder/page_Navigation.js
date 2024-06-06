import React from "react";
import { Link } from "react-router-dom";
import {FiAlignJustify, FiX} from "react-icons/fi";



function menu_Enabler(){
    const sidebar = document.getElementById('nav_Head_Side');
    sidebar.style.display = 'flex';
  };
function menu_Disabler(){
    const sidebar = document.getElementById('nav_Head_Side');
    sidebar.style.display ='none';
  };
  

function MainNav(){
    return <div>
    <div className="side_Bar" onClick={menu_Enabler}>
     <FiAlignJustify />
 </div>

 <div>
   <nav id="nav_Head">
       <ul className="nav_List">
         <li className="navlist_Head"><Link to="/">Home</Link></li>
         <li className="navlist_Head"><Link to="/Product">Products</Link></li>
         <li className="navlist_Head"><Link to="/Info">Info</Link></li>
         <li className="navlist_Head"><Link to="/Profile">Profile</Link></li>
     </ul>
   </nav>
 </div>

   <nav id="nav_Head_Side">
     <ul className="nav_List">
       <li className="navlist_Head" id="sidebar_MenuToggle" onClick={menu_Disabler}><FiX /></li>
       <li className="navlist_Head"><Link to="/">Home</Link></li>
       <li className="navlist_Head"><Link to="/Product">Products</Link></li>
       <li className="navlist_Head"><Link to="/Info">Info</Link></li>
       <li className="navlist_Head"><Link to="/Profile">Profile</Link></li>
     </ul>
 </nav>

</div>
};



export default MainNav;
   