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
import AppliedTutors from "../pages/Dashboard/AppliedTutors/AppliedTutors";
import StudentRoute from "./StudentRoute";
import MyApplications from "../pages/Dashboard/MyApplications/MyApplications";
import TutorRoute from "./TutorRoute";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import OngoingTuitions from "../pages/Dashboard/OngoingTuitions/OngoingTuitions";
import CompletedTutions from "../pages/Dashboard/CompletedTutions/CompletedTutions";

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
                path: 'user-profile/:id',
                Component: UserProfile
            },
            {
                path: 'profile-settings/:id',
                Component: ProfileSettings
            },
            {
                path: 'payment/:id',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            // Student Route
            {
                path: 'my-tuitions',
                element: <StudentRoute><MyTuitions></MyTuitions></StudentRoute>
            },
            {
                path: 'pending-tuitions',
                element: <StudentRoute><PendingTuitions></PendingTuitions></StudentRoute>
            },
            {
                path: 'post-new-tuition',
                element: <StudentRoute><PostNewTuition></PostNewTuition></StudentRoute>
            },
            {
                path: 'applied-tutors',
                element: <StudentRoute><AppliedTutors></AppliedTutors></StudentRoute>
            },
            // Tutor Route
            {
                path: 'my-applications',
                element: <TutorRoute><MyApplications></MyApplications></TutorRoute>
            },
            {
                path: 'ongoing-tuitions',
                element: <TutorRoute><OngoingTuitions></OngoingTuitions></TutorRoute>
            },
            {
                path: 'completed-tutions',
                element: <TutorRoute><CompletedTutions></CompletedTutions></TutorRoute>
            },
            // Admin Route
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