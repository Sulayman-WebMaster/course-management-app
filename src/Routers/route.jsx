import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/> 
            }
        ],
    
    }])
            