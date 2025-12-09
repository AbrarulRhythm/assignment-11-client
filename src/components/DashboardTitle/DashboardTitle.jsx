import React from 'react';

const DashboardTitle = ({ title }) => {
    return (
        <div className='mb-6'>
            <h1 className='text-[22px] lg:text-[28px] font-semibold text-dark-09'>{title}</h1>
        </div>
    );
};

export default DashboardTitle;