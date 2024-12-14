import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './components_Folder/CartHoldings';
import { TokenProvider } from './components_Folder/token'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TokenProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </TokenProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

