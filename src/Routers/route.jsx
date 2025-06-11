import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFoundPage from "../pages/NotFoundPage";
import AddCoursePage from "../pages/AddCourse";
import PrivateRoute from "../Provider/PrivateRoute";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "add-course",
                element: <PrivateRoute><AddCoursePage/></PrivateRoute>
            }
        ],


    },
    {
        path: "*",
        Component: NotFoundPage
    }])
