import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';

const AdminDashboardOverview = () => {
    return (
        <div className='dashboard'>
            <title>Dashboard - eTuitionBd</title>

            <DashboardTitle
                title='Dashboard'
            ></DashboardTitle>

            <h1>Admin</h1>
        </div>
    );
};

export default AdminDashboardOverview;