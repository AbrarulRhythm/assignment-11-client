import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import useRole from '../../../hooks/useRole';
import AdminDashboardOverview from './AdminDashboardOverview';
import TutorDashboardOverview from './TutorDashboardOverview';
import StudentDashboardOverview from './StudentDashboardOverview';

const DashboardOverview = () => {
    const { isLoading, role } = useRole();

    if (isLoading) {
        return (
            <div className='text-start md:text-center'>
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if (role === 'admin') {
        return <AdminDashboardOverview></AdminDashboardOverview>
    }
    else if (role === 'tutor') {
        return <TutorDashboardOverview></TutorDashboardOverview>
    }
    else {
        return <StudentDashboardOverview></StudentDashboardOverview>
    }
};

export default DashboardOverview;