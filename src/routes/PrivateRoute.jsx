import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingPage from '../components/LoadingPage/LoadingPage';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (user) {
        return children;
    }

    if (loading) {
        return <LoadingPage></LoadingPage>
    }

    if (!user) {
        return <Navigate state={location.state} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;