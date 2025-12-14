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
import PendingTuitions from "../pages/Dashboard/PendingTuitions/PendingTuitions";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import ProfileSettings from "../pages/Dashboard/ProfileSettings/ProfileSettings";
import TuitionManagement from "../pages/Dashboard/TuitionManagement/TuitionManagement";
import AllTuitions from "../pages/AllTuitions/AllTuitions";
import TuitionDetails from "../pages/TuitionDetails/TuitionDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'tuitions',
                Component: AllTuitions
            },
            {
                path: 'tuitions/:id',
                Component: TuitionDetails
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
                path: 'pending-tuitions',
                Component: PendingTuitions
            },
            {
                path: 'post-new-tuition',
                Component: PostNewTuition
            },
            {
                path: 'user-profile/:id',
                Component: UserProfile
            },
            {
                path: 'profile-settings/:id',
                Component: ProfileSettings
            },
            {
                path: 'user-management',
                element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
            },
            {
                path: 'tuition-management',
                element: <AdminRoute><TuitionManagement></TuitionManagement></AdminRoute>
            }
        ]
    }
]);