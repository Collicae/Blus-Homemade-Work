import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Info from './Pages/Info';
import Product from './Pages/Products';
import Profile from './Pages/Profile';
import Home from './Pages/Home';
import Sign from './Pages/Sign-Up';


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
            </Routes>
        </Router>
    )
}

export default Routes_pages