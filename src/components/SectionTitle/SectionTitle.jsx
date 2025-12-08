import React from 'react';

const SectionTitle = ({ title, subTitle, classes = 'text-center', spacing = 'mb-10 lg:mb-12' }) => {
    return (
        <div className={`${classes} ${spacing}`}>
            <span className='inline-block text-base font-medium text-theme-primary py-[9px] px-6 rounded-3xl bg-theme-primary/10 mb-3'>{title}</span>
            <h1 className='text-dark-09 text-[28px] md:text-3xl lg:text-[40px] font-bold leading-[1.4]'>{subTitle}</h1>
        </div>
    );
};

export default SectionTitle;