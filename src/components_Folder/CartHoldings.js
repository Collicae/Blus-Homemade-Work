import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Custom hook to use the context
export const useDictionary = () => {
  return useContext(CartContext);
};

// CartProvider that will wrap the App and provide the context
export const CartProvider = ({ children }) => {
  // Load the inventory from localStorage (or an empty array if not found)
  const loadInventory = () => {
    const savedInventory = localStorage.getItem('inventory');
    return savedInventory ? JSON.parse(savedInventory) : [];
  };

  const [Inventory, setInventory] = useState(loadInventory);

  // Whenever Inventory changes, update localStorage
  useEffect(() => {
    if (Inventory.length > 0) {
      localStorage.setItem('inventory', JSON.stringify(Inventory));
    }
  }, [Inventory]);

  const addItemToCart = (itemTitle, itemPrice, itemAmount, itemSize) => {
    console.log('Adding item to cart:', itemTitle, itemPrice, itemAmount, itemSize); // Log the input parameters
    
    setInventory((prevItems) => {
      const newItem = {
        addedItem: itemTitle,
        addedPrice: itemPrice,
        addedAmount: itemAmount,
        addedSize: itemSize
      };
  
      console.log('Previous Inventory:', prevItems); // Log the previous state (cart items)
      console.log('New Item:', newItem); // Log the new item that will be added to the cart
  
      return [...prevItems, newItem]; // Add new item to the cart
    });
  };

  // Make sure you pass setInventory in the context value
  return (
    <CartContext.Provider value={{ Inventory, setInventory, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};