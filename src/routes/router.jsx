import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardOverview from "../pages/Dashboard/DashboardOverview/DashboardOverview";
import MyTuitions from "../pages/Dashboard/MyTuitions/MyTuitions";
import PostNewTuition from "../pages/Dashboard/PostNewTuition/PostNewTuition";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'overview',
                Component: DashboardOverview
            },
            {
                path: 'my-tuitions',
                Component: MyTuitions
            },
            {
                path: 'post-new-tuition',
                Component: PostNewTuition
            }
        ]
    }
]);