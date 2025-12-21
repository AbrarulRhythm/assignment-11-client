import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';
import LoadingPage from '../components/LoadingPage/LoadingPage';

const TutorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useRole();

    if (loading || !user || isLoading) {
        return <LoadingPage></LoadingPage>
    }

    if (role !== 'tutor') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default TutorRoute;