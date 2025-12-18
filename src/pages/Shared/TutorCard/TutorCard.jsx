import React from 'react';
import { BsStar, BsStarFill } from "react-icons/bs";
import { Link } from 'react-router';

const TutorCard = ({ tutor }) => {
    const { _id, displayName, photoURL, subjects, experience, rating, rate } = tutor;

    return (
        <div className='w-full md:w-6/12 lg:w-3/12 px-3 mb-6'>
            <div className='bg-white p-4 border border-dark-03 rounded-md h-full group relative z-20'>
                <div className='rounded-md mb-4 overflow-hidden'>
                    <img src={photoURL} className='w-full max-h-[235px] object-cover rounded-md group-hover:scale-110 duration-500' alt="Tutor Photo" />
                </div>
                <h3 className='text-dark-09 text-xl font-semibold mb-px'>{displayName}</h3>
                {subjects && <p className='text-sm'>Subjects: {subjects}</p>}
                <div className='flex items-center justify-between mt-2.5'>
                    {experience && <p className='text-sm'>{experience}</p>}
                    {rating ? (
                        <div className='text-sm flex items-center gap-1.5'>
                            <BsStarFill className='text-yellow-500' />
                            <div><span className='text-dark-09 font-semibold'>{rating}</span> Reviews</div>
                        </div>
                    ) : (
                        <div className='text-sm flex items-center gap-1.5'>
                            <BsStar className='text-yellow-500' />
                            <div><span className='text-dark-09 font-semibold'>0</span>(0 Reviews)</div>
                        </div>
                    )}
                </div>
                <div className='flex items-center justify-between mt-2.5'>
                    {rate && <>
                        <div>
                            <span className='text-[12px] block mb-px'>Starting from</span>
                            <h6 className='text-sm text-dark-09 font-semibold'>৳{rate}<span className='text-[11px]'>/</span>Month</h6>
                        </div>
                    </>}
                    <Link to={`/tutors/${_id}`} className='font-medium text-sm text-theme-primary hover:text-pink-600 duration-300'>View Profile</Link>
                </div>
            </div>
        </div>
    );
};

export default TutorCard;