import React, { useState, useEffect } from "react";
import pre_Made_Pic1 from "../Img_Folder/veggie with BB.jpeg";
import pre_Made_Pic2 from "../Img_Folder/SweetP with BB.jpeg";
import custom_Pic from "../Img_Folder/cst_Pic.jpeg";
import "../Styles/Food.css";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useDictionary } from "../components_Folder/CartHoldings";
import cartHoldings from "./Home"

const ScrollTopDefault = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

const Food_App = () => {
  const { id } = useParams();
  const [selectedBagSize, setSelectedBagSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [addedItem, setAddedItem] = useState('');
  const [addedPrice, setAddedPrice] = useState('');
  const [addedAmount, setaddedAmount] = useState('')

  let shownFoodPic, foodTitle, foodDescription, ingredientList, smallBagCost, bigBagCost;

  const handleQuantity = (e) => {
    const value = Math.max(1, Math.min(99, e.target.value));
    setQuantity(value);
    return value
  };

  // Function to showcase the price of the bag
  const getPrice = () => {
    if (selectedBagSize === "Small") {
      return quantity > 1 ? (smallBagCost * quantity).toFixed(2) : smallBagCost;
    } else if (selectedBagSize === "Large") {
      return quantity > 1 ? (bigBagCost * quantity).toFixed(2) : bigBagCost;
    }
    return null;
  };

  const handleBagSizeChange = (event) => {
    setSelectedBagSize(event.target.value);
  };

  const { addItemToCart } = useDictionary();  // Get the function from context

  const currentCartHolding = (e) => {

    e.preventDefault();

    // The added item and price
    const addedList = {
      addedItem: foodTitle,
      addedPrice: getPrice(),
      addedAmount: quantity, // Adjust if needed
      addedSize: selectedBagSize,
    };

    // Update the global state using context function
    addItemToCart(foodTitle, getPrice(), quantity, selectedBagSize); // Example of adding item to global state

    console.log(addedList); 
  };

  // Handle data setup based on the `id` from URL params
  switch (id) {
    case "1":
      shownFoodPic = pre_Made_Pic1;
      foodTitle = "Veggies with Black Beans";
      foodDescription = "Description about veggies and black bean";
      ingredientList = "Ingredients in the Veggies and black beans";
      smallBagCost = 11.99;
      bigBagCost = 16.99;
      break;
    case "2":
      shownFoodPic = custom_Pic;
      foodTitle = "Sweet Potato and Brown Rice";
      foodDescription = "Description about sweet potato and brown rice";
      ingredientList = "Ingredients in the sweet potato and brown rice";
      smallBagCost = 11.99;
      bigBagCost = 16.99;
      break;
    case "3":
      shownFoodPic = pre_Made_Pic2;
      foodTitle = "Sweet Potato and Black Beans";
      foodDescription = "Description about sweet potato and black beans";
      ingredientList = "Ingredients in the sweet potato and black beans";
      smallBagCost = 11.99;
      bigBagCost = 16.99;
      break;
    default:
      shownFoodPic = null;
      foodTitle = "Food not found";
      foodDescription = "Sorry, we could not find the food you are looking for.";
      ingredientList = "There are no ingredients for this";
  }


    //Create the heading of the page (Should be on the left)
const { Inventory, setInventory } = useDictionary();
console.log(Inventory)
const [cartHoldings, setCartHoldings] = useState(0);

useEffect(() => {
  setCartHoldings(Inventory.length); // Set the length of the Inventory to state
}, [Inventory]); // Re-run the effect when Inventory changes




  return (
    <div>
      <div id="foodHeader">
        <Link id="shopping_Cart" to={"/UsersCart"}> 
          {cartHoldings}<FiShoppingBag />
        </Link>
        <h1>{foodTitle}</h1>
        <img src={shownFoodPic} alt={foodTitle} />
      </div>

      <div id="foodBody">
        <div>
          <p>{foodDescription}</p>
          <p>{ingredientList}</p>
        </div>

        <div id="foodAmount">
          <div id="priceShow">
            <h2>Price:</h2>
            <h2>${getPrice()}</h2>
          </div>

        
          <form id="formQuantity" onSubmit={currentCartHolding}>
            <label>Quantity:</label>
            <input
              id="qantity"
              type="number"
              min="1"
              max="99"
              step="1"
              value={quantity}
              onChange={handleQuantity}
              required
            />
            <br />
            <br />

            <div id="foodForm">
            <label className="bagText">
              <input
                type="radio"
                name="bagSize"
                className="bagSize"
                id="largeBag"
                value="Large"
                checked={selectedBagSize === "Large"}
                onChange={handleBagSizeChange}
                required
              />
              Large
            </label>
            <label className="bagText">
              <input
                type="radio"
                name="bagSize"
                className="bagSize"
                id="smallBag"
                value="Small"
                checked={selectedBagSize === "Small"}
                onChange={handleBagSizeChange}
                required
              />
              Small
            </label>
            </div>
            <br />
            <button type="submit">Add to Cart</button>
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default Food_App;
