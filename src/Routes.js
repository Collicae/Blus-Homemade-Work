import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Info from '../src/Pages/Info';
import Product from '../src/Pages/Products';
import Profile from '../src/Pages/Profile';
import Home from '../src/Pages/Home';
import Sign from '../src/Pages/Sign-Up';
import Food from "../src/Pages/Food";
import Cart from "../src/Pages/Cart";
import UserProfile from "./components_Folder/token";

const Routes_pages = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" Component={Home}>
                   
                </Route>

                <Route path="/Info" Component={Info}>
                    
                </Route>

                <Route path="/Product" Component={Product}>
                    
                </Route>

                <Route path="/Profile" Component={Profile}>
                   
                </Route>

                <Route path="/Sign" Component={Sign}>

                </Route>

                <Route path="/Food/:id" element={<Food />} />

                <Route path="/UsersCart" element={<Cart/>} />
            </Routes>
        </Router>
    )
}

export default Routes_pages