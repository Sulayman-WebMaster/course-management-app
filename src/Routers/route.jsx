import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFoundPage from "../pages/NotFoundPage";
import AddCoursePage from "../pages/AddCourse";
import PrivateRoute from "../Provider/PrivateRoute";
import Course from "../pages/Course";
import EditCourses from "../pages/EditCourses";
import Enrollment from "../pages/Enrollment";
import MyCourses from "../pages/MyCourses";
import Courses from "../pages/Courses";
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
            },
            {
                path: "course/:courseId",
                element: <Course />
            },
            {
                path: "my-enrollments",
                element: <PrivateRoute><Enrollment/></PrivateRoute>
            },
            {
                path: "my-courses",
                element: <PrivateRoute><MyCourses/></PrivateRoute>
            },
            {
                path: "edit-courses/:courseId",
                element: <PrivateRoute><EditCourses/></PrivateRoute>
            },
            {
                path: "show-all",
                element: <Courses/>
            }
            
        ],


    },
    {
        path: "*",
        Component: NotFoundPage
    }])
