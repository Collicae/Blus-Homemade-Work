import React, { useState, useEffect } from "react";
import '/Users/calebcollins/Desktop/first_website_r/src/Styles/Info.css';
import {FiAlignJustify, FiX} from "react-icons/fi";
import MainNav from "../components_Folder/page_Navigation";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import {FiAlignJustify} from "react-icons/fi";


const Scroll_Top_Default = () => {
    React.useEffect(() => {
      window.scrollTo(0,0);
    }, []);
  }


//Used for the Zip-Code input to only allow numerical values and up to 6 characters at a time

const Zip_Comp = () => {
    const [value, setvalue] = useState('');

    const Value_ONLY_Comp = (event) => {
        const new_Val = event.target.value.replace(/\D/d, '');

        const Limit_Comp = new_Val.slice(0,6);

        setvalue(Limit_Comp)
    }
}

const Info_Comp = () => {
    useEffect(() => {
      const handle_Scroll = () =>{
  
        const Hesitant_P_1 = document.getElementById('info_P_1');
        const Hesitant_P_2 = document.getElementById('info_P_2');
        const nav_Bar_Head = document.querySelector('nav');
        const scroll_Position = window.scrollY;
        console.log(window.innerHeight)
      
        if (scroll_Position > 100) {
          Hesitant_P_1.classList.add('show')
        };
        if (scroll_Position > 140) {
            Hesitant_P_2.classList.add('show')
          };

    
        nav_Bar_Head.style.backgroundColor = 'rgba(164, 188, 206, 1)'
      }
      window.addEventListener('scroll', handle_Scroll);
  
      return () => {
        window.removeEventListener('scroll', handle_Scroll);
      };
    }, []);
  
  };


let form_BTN_Txt = "Find Location";





const Info_App = () => {
   

        const [add, setadd] = useState("");
        const [state, setstate] = useState('');
        const [zip, setzip] = useState('');
    
    
        const FormSubmit = () => {
            document.addEventListener('submit', (event) =>{
            event.preventDefault();
            console.log(add, state, zip)
            document.getElementById('user_Information').querySelector('p').innerHTML = add + ', ' + state + ', ' +zip;
            })}
    
    
        const Change_Address = (event) => {
            setadd(event.target.value);
            
        };
    
    
        const Change_State = (event) => {
            setstate(event.target.value)
        };
    
    
        const Change_Zip = (event) => {
            setzip(event.target.value.replace( /\D/g, ''))
        };
    
    
  


    return(
        <div>
        <Scroll_Top_Default />
        <Info_Comp />

        <MainNav/>

        <div id="info_Delivery_INFO">
            <h1>Delivery Information</h1>
            <p>Purchases made within Fishers and surrounding areas won't be charged shipping <strong>(Before Tax)</strong> for orders <strong>$48 or higher</strong></p>

            <h2>To test if your address is within the radius of free shipping insert here</h2>

            <form id="UniqueForm" name="UniqueForm">
                <div>
                <label>Address: </label>
                <input type="text" id="Address_Info" name="Address_Info" onChange={Change_Address} value={add} placeholder="Enter Address" required/>
                </div>

                <div>
                <label>State: </label>
                <input  type="text" placeholder="State" id="State_Info" name="State_Info" onChange={Change_State} value={state}  required />
                </div>

                <div>
                <label>Zip-Code: </label>
                <input type="text"  onChange={Change_Zip} value={zip} id="Zip_Info" name="Zip_Info"  placeholder="Zip-Code" maxLength={5} required/>
                </div>

                <input id="address_Confirmation_BTN" name="address_Confirmation_BTN" type="submit" onSubmit={FormSubmit}  value={form_BTN_Txt}/>
            </form>
        </div>

        <div id="info_MAP">
           <MapContainer center={[39.940336, -85.840163]} zoom={9}>
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
           </MapContainer>
        </div>

        <div id="user_Information">
          <p><FormSubmit/></p>
        </div>

        <div id="info_Body">
            <h2>Hesitant to Buy?</h2>
            <p className="info_Under_Txt" id="info_P_1">No worries. Just request a sample bag and one will be shipped to you for free</p>
            <p className="info_Under_Txt" id="info_P_2">Sample bags come in a smaller size compared to the regular bags</p>
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


export default Info_App;