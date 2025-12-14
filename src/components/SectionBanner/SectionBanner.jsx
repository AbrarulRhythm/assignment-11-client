import React from 'react';
import { Link } from 'react-router';
import { AiOutlineDoubleRight } from "react-icons/ai";

const SectionBanner = ({ title, currentLink }) => {
    return (
        <section className='mt-[92px] lg:mt-[118px] py-20 lg:py-[130px] bg-theme-primary/15'>
            <div className='container'>
                <div className='text-center'>
                    <h1 className='text-dark-09 font-semibold text-4xl md:text-5xl lg:text-[44px] mb-4'>{title}</h1>
                    <div className='flex items-center justify-center gap-2'>
                        <Link to='/' className='hover:text-theme-primary duration-200'>Home</Link>
                        <AiOutlineDoubleRight />
                        <span>{currentLink}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionBanner;