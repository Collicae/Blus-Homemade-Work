import React, { useState, useEffect } from "react";
import '../Styles/Info.css';
import { FiAlignJustify, FiX } from "react-icons/fi";
import MainNav from "../components_Folder/page_Navigation";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios"; 
import markerPic from "../Img_Folder/maps-and-flags.png";

const Scroll_Top_Default = () => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

const InfopageComp = () => {
  useEffect(() => {
    const handle_Scroll = () =>{
      const subTxt1 = document.getElementById("info_P_1")
      const subTxt2 = document.getElementById("info_P_2")
      const nav_Bar_Head = document.querySelector('nav');
      const scroll_Position = window.scrollY;
      console.log(window.innerHeight)
    
      if(scroll_Position > 400) {
        subTxt1.classList.add('show')
      };
    
      if(scroll_Position > 500) {
        subTxt2.classList.add('show')
      };
    
      if (scroll_Position > 500) {
        nav_Bar_Head.style.backgroundColor = 'rgba(164, 188, 206, 1)'
      } else {
        nav_Bar_Head.style.backgroundColor = 'rgba(164, 188, 206, 0.75)'
      };
    
    }
    window.addEventListener('scroll', handle_Scroll);
    return () => {
      window.removeEventListener('scroll', handle_Scroll);
    };
  }, []);
}




function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => deg * (Math.PI / 180);
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Returns the distance in kilometers
}

const Info_App = () => {
    const [add, setadd] = useState("");
    const [state, setstate] = useState('');
    const [zip, setzip] = useState('');
    const [markerPosition, setMarkerPosition] = useState([39.940336, -85.840163]); // Default coordinates
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");  // New state for error message

    // Geocode the address
    // Reference point: Fishers, Indiana (latitude and longitude)
    const referenceLat = 39.9556;  // Fishers, IN latitude
    const referenceLon = -86.0136; // Fishers, IN longitude

    // Radius in kilometers (e.g., 10 km)
    const radiusInKm = 10;

  const geocodeAddress = async (address) => {
      try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
              params: {
                  q: address,
                  format: 'json',
                  addressdetails: 1,
                  limit: 1,
              },
          });

          const { lat, lon } = response.data[0] || {};
          if (lat && lon) {
              // Convert to numbers
              const latitude = parseFloat(lat);
              const longitude = parseFloat(lon);

              // Calculate the distance between the geocoded address and the reference point (Fishers, IN)
              const distance = haversineDistance(latitude, longitude, referenceLat, referenceLon);

              // Check if the distance is within the allowed radius (e.g., 10 km)
              if (distance <= radiusInKm) {
                  setMarkerPosition([latitude, longitude]);
                  setErrorMessage("");  
              } else {
                  setErrorMessage(`Address is outside the range for Fishers, so does not qualify for free shipping`);
                  setMarkerPosition([latitude, longitude]);
              }
          } else {
              setErrorMessage('Address not found');
          }
      } catch (error) {
          console.error("Error geocoding address:", error);
          setErrorMessage('Error geocoding address');
      }
  };

  // Handle form submission
  const FormSubmit = (event) => {
      event.preventDefault();
      const fullAddress = `${add}, ${state} ${zip}`;
      setAddress(fullAddress);  // Store the full address to show in the popup
      geocodeAddress(fullAddress); // Geocode the address and update the map
  }

  // Handle input changes
  const Change_Address = (event) => {
      setadd(event.target.value);
  };

  const Change_State = (event) => {
      setstate(event.target.value);
  };

  const Change_Zip = (event) => {
      setzip(event.target.value.replace(/\D/g, ''));
  };

  const custIcon = new L.Icon({
      iconUrl: markerPic,
      iconSize: [40, 40]
  });

  // Update map center when marker position changes
  const UpdateMapCenter = () => {
      const map = useMap();
      map.setView(markerPosition, 13);  // Update the map view to new position
      return null;
  };


    return (
        <div>
            <Scroll_Top_Default />
            <InfopageComp/>
            <MainNav />

            <div id="info_Delivery_INFO">
                <h1>Delivery Information</h1>
                <p>Purchases made within Fishers and surrounding areas won't be charged shipping <strong>(Before Tax)</strong> for orders <strong>$48 or higher</strong></p>

                <h2>To test if your address is within the radius of free shipping, insert here</h2>
            

            <div id="UniqueForm">
                <form id="uniqueForm" name="uniqueform" onSubmit={FormSubmit}>

                <div id="form_Container">
                        <div>
                            <label>Address: </label>
                            <input className="infoInformation" type="text" id="Address_Info" name="Address_Info" onChange={Change_Address} value={add} placeholder="Enter Address" required />
                        </div>

                        <div>
                            <label>State: </label>
                            <select className="infoInformation" placeholder="State" id="State_Info" name="State_Info" onChange={Change_State} value={state} required >
                                <option>IN</option>
                                <option>IL</option>
                                <option>OH</option>
                            </select>
                        </div>

                        <div>
                            <label>Zip-Code: </label>
                            <input className="infoInformation" type="text" onChange={Change_Zip} value={zip} id="Zip_Info" name="Zip_Info" placeholder="Zip-Code" maxLength={5} required />
                        </div>

                        <input id="address_Confirmation_BTN" name="address_Confirmation_BTN" type="submit" value="Find Location" />
                    </div>
                </form>
            </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
            </div>

            <div id="info_MAP">
                <MapContainer center={markerPosition} zoom={13} style={{ height: "500px", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <UpdateMapCenter />  {/* Ensures the map updates to the new marker position */}
                    {markerPosition && (
                        <Marker position={markerPosition} icon={custIcon}>
                            <Popup>{address}</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>

            <div id="user_Information">
                <p>{address}</p>
            </div>

            <div id="info_Body">
                <h2>Hesitant to Buy?</h2>
                <p className="info_Under_Txt" id="info_P_1">No worries. Just request a sample bag and one will be shipped to you for free</p>
                    <br/>
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
            </footer>
        </div>
    )
}

export default Info_App;
