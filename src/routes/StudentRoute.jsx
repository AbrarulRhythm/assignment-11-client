import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';

const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useRole();

    if (loading || !user || isLoading) {
        return <div><span className="loading loading-bars loading-xl"></span></div>
    }

    if (role !== 'student') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default StudentRoute;