import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';
import LoadingPage from '../components/LoadingPage/LoadingPage';

const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useRole();

    if (loading || !user || isLoading) {
        return <LoadingPage></LoadingPage>
    }

    if (role !== 'student') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default StudentRoute;