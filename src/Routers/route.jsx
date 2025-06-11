import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFoundPage from "../pages/NotFoundPage";
import AddCoursePage from "../pages/AddCourse";
import PrivateRoute from "../Provider/PrivateRoute";
import Course from "../pages/Course";
import MyEnrollment from "../pages/MyEnrollment";
import MyCourses from "../pages/MyCourses";
import EditCourses from "../pages/EditCourses";
import ManangeCourse from "../pages/ManangeCourse";
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
                element: <PrivateRoute><MyEnrollment/></PrivateRoute>
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
               path: "manage-courses", 
               element: <PrivateRoute><ManangeCourse/></PrivateRoute>
            }
        ],


    },
    {
        path: "*",
        Component: NotFoundPage
    }])
