import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

// Create the context
const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
  const userId = Object.keys(Cookies.get()).find(key => key.startsWith('ID_'));
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (userId) {
      const email = Cookies.get(`Email_${userId.split('_')[1]}`) || '';
      const firstName = Cookies.get(`First_N_${userId.split('_')[1]}`) || '';
      const lastName = Cookies.get(`Last_N_${userId.split('_')[1]}`) || '';

      setEmail(email);
      setFirstName(firstName);
      setLastName(lastName);
    }
  }, [userId]);

  return (
    <TokenContext.Provider value={{ email, firstName, lastName }}>
      {children}
    </TokenContext.Provider>
  );
};

// Create a custom hook to use the token data
export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
