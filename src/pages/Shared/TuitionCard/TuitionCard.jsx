import React from 'react';
import openBook from '../../../assets/open-book.png';
import locationIcon from '../../../assets/icon-3.png';
import TK from '../../../assets/icon-1.png';
import time from '../../../assets/icon-2.png';
import orange from '../../../assets/bg/orange.png';
import blue from '../../../assets/bg/blue.png';
import green from '../../../assets/bg/green.png';
import yellow from '../../../assets/bg/yellow.png';
import pink from '../../../assets/bg/pink.png';
import red from '../../../assets/bg/red.png';
import violet from '../../../assets/bg/violet.png';
import cyan from '../../../assets/bg/cyan.png'
import { TiBookmark } from "react-icons/ti";
import { Link } from 'react-router';

const TuitionCard = ({ tuition }) => {
    const { _id, subject, class: tuitionClass, location, budget, schedule, bg } = tuition;

    return (
        <div className='w-full md:w-6/12 lg:w-3/12 px-3 mb-6'>
            <div className='flex flex-col h-full bg-white rounded-md border border-dark-03 group'>
                <div className='h-full bg-white  rounded-md relative'>
                    <div className='relative'>
                        <div className='relative'>
                            <img src={
                                bg === 'orange'
                                    ? `${orange}`
                                    : bg === 'blue'
                                        ? `${blue}`
                                        : bg === 'green'
                                            ? `${green}`
                                            : bg === 'yellow'
                                                ? `${yellow}`
                                                : bg === 'pink'
                                                    ? `${pink}`
                                                    : bg === 'red'
                                                        ? `${red}`
                                                        : bg === 'violet'
                                                            ? `${violet}`
                                                            : `${cyan}`
                            } className='rounded-t-md w-full' alt="bg-color" />
                        </div>
                        <img src={openBook} className='absolute top-[50%] left-[50%] -translate-[50%] group-hover:scale-110 duration-300' alt="open book icon" />
                        <span className='text-[12px] bg-white absolute bottom-4 left-4 py-1.5 px-2.5 rounded-sm'>Class<span className='text-[9px]'>/</span>Grade: {tuitionClass}</span>
                    </div>
                    <div className='p-4'>
                        <h3 className='text-xl font-semibold text-dark-09 mb-4'>{subject}</h3>
                        <ul className='space-y-4'>
                            <li className='text-sm flex items-center gap-2'><img src={locationIcon} alt="location" /> {location}</li>
                            <li className='text-sm flex items-center gap-2'><img src={TK} alt="tk" /> Budget: {budget}/month</li>
                            <li className='text-sm flex items-center gap-2'><img src={time} alt="tk" /> {schedule}</li>
                        </ul>
                    </div>
                </div>

                <div className='flex items-center justify-between border-t border-dark-03 text-sm'>
                    <button className='flex items-center justify-center p-4 gap-1 cursor-pointer hover:bg-dark-02 w-[50%] border-r border-dark-03 duration-150'><TiBookmark className='text-lg' /> Book Mark</button>
                    <Link to={`/tuitions/${_id}`} className='p-4 cursor-pointer hover:bg-dark-02 w-[50%] duration-150 text-center'>View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default TuitionCard;