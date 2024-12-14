import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Cart.css";
import MainNav from "../components_Folder/page_Navigation";
import { useDictionary } from "../components_Folder/CartHoldings";
import { FaTimes } from 'react-icons/fa';
import { useToken } from "../components_Folder/token";

const Cart_App = () => {
  // State initialization
  const { email, firstName, lastName } = useToken();  // Get values from useToken()

  console.log(email)

  const [FirstName, setFirstName] = useState(firstName || '');  // Use default from useToken or empty string
  const [LastName, setLastName] = useState(lastName || '');
  const [Email, setEmail] = useState(email || '');
  const [Phone, setPhone] = useState(''); // Initialize with empty string or a default phone number

  useEffect(() => {
    if (firstName && lastName && email) {
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
    }
  }, [firstName, lastName, email]);  // Runs only when these values change



  // Phone number formatting
  const Change_phone = (event) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    let formattedValue = rawValue;

    // Format phone number
    if (rawValue.length >= 4) {
      formattedValue = `(${rawValue.slice(0, 3)})${rawValue.slice(3, 6)}`;
    } else if (rawValue.length > 0) {
      formattedValue = `(${rawValue.slice(0, 3)}`;
    }
    if (rawValue.length >= 7) {
      formattedValue = `${formattedValue}-${rawValue.slice(6, 10)}`;
    }

    // Update phone state
    setPhone(formattedValue);
  };

  // Zip code state management
  const [zip, setZip] = useState('');
  const Change_Zip = (event) => {
    setZip(event.target.value.replace(/\D/g, '')); // Remove non-digit characters
  };

  // Preferences state management
  const [preferences, setPreferences] = useState({
    email: false,
    text: false,
    email_address: Email,
    phone_number: Phone
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      const rawPhone = Phone.replace(/\D/g, '');  // Strip out non-digits
      const updatedPreferences = {
        ...preferences,
        phone_number: rawPhone,  // Send raw phone number (digits only)
        email_address: Email 
      };
  
      const response = await axios.post('http://127.0.0.1:8000/api/notification-preferences/', updatedPreferences, {
        email: preferences.email,    // Email preference (true/false)
        text: preferences.text,      // Text preference (true/false)
        email_address: Email,        // User email
        phone_number: Phone          
      });
      
      alert('Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Inventory management
  const { Inventory, setInventory } = useDictionary();

  const removeItem = (indexToRemove) => {
    setInventory((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <MainNav />
      <div id="Cart_Header">
        <h3 id="cart_Header">Blu's Homemade</h3>
      </div>
      <div id="cart_Holdings">
        <div id="cart_Holdings_Extras" className="cart_holdings">
        </div>
        <div id="cart_Holdings_CurrentCart" className="cart_holdings">
          <div>
            <h4>Current Items:</h4>
          </div>
          <ul>
            {Inventory.map((item, index) => (
              <li key={index}>
                {item.addedItem} ({item.addedSize}) - ${item.addedPrice}  <br />
                Quantity {item.addedAmount} <span onClick={() => removeItem(index)}><FaTimes /></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="CartDelivery">
        <div id="cartdelivery">
          <form id="deliveryForm">
            <h1 id="deliveryHeader">Delivery Instruction</h1>
            <h2>Enter Delivery Instructions</h2>

            <div id="deliveryBasic">
              <label className="deliveryText">First Name:</label>
              <input
                className="deliveryInput"
                name="FirstName"
                type="text"
                placeholder="Enter first name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)} // Update FirstName on change
                required
              />

              <label className="deliveryText">Last Name:</label>
              <input
                className="deliveryInput"
                type="text"
                placeholder="Enter last name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)} // Update LastName on change
                required
              />

              <label className="deliveryText">Email:</label>
              <input
                className="deliveryInput"
                type="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)} // Update Email on change
                required
              />

              <label className="deliveryText">Phone:</label>
              <input
                className="deliveryInput"
                type="text"
                placeholder="(XXX)XXX-XXXX"
                onChange={Change_phone}
                value={Phone}
                maxLength={13}
                required
              />
            </div>

            <br />
            <br />

            <div id="deliveryAddress">
              <label className="deliveryText">Address:</label>
              <input
                className="deliveryInput"
                type="text"
                placeholder="Address"
                required
              />

              <label className="deliveryText">State:</label>
              <select placeholder="State" id="cartState" name="cartState" required>
                <option>IN</option>
                <option>IL</option>
                <option>OH</option>
              </select>

              <label className="deliveryText">Zipcode:</label>
              <input
                className="deliveryInput"
                type="text"
                placeholder="Zip"
                onChange={Change_Zip}
                value={zip}
                maxLength={5}
                required
              />
            </div>

            <div id="deliveryContactMethod">
              <p>How would You like to be notified about your Order?</p>

              <div id="DeliveryType">
                <div className="deliveryType">
                  <input
                    type="checkbox"
                    checked={preferences.email}
                    onChange={handleCheckboxChange}
                    name="email"
                  />
                  <label>Email</label>
                </div>

                <div className="deliveryType">
                  <input
                    type="checkbox"
                    checked={preferences.text}
                    onChange={handleCheckboxChange}
                    name="text"
                  />
                  <label>Text</label>
                </div>
              </div>
            </div>

            <br />

            <div id="deliverySubmit">
              <button type="submit" onClick={handleSubmit}>Continue to Payment</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cart_App;
