import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdInfoOutline } from 'react-icons/md';
import { GrLocation } from "react-icons/gr";
import { FaRegBuilding } from 'react-icons/fa';
import { AiOutlineEdit } from "react-icons/ai";
import { TbAlignBoxCenterBottom } from "react-icons/tb";
import moment from 'moment';

const UserProfile = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: user = [] } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${id}`);
            return res.data;
        }
    });

    return (
        <div className='dashboard'>
            <title>{isLoading ? 'User Profile' : user.displayName}</title>

            <div className='relative rounded-md overflow-hidden'>
                {isLoading ? (
                    <div className='text-center'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : (
                    <>
                        {/* Error State */}
                        {!user ? (
                            <div className='text-center'>
                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                <span className='text-base'>User Not Found</span>
                            </div>
                        ) : (
                            // Data Row
                            <>
                                <div className='bg-linear-to-t to-sky-500 from-indigo-500 h-[300px] bg-cover bg-no-repeat bg-cenre bg-center rounded-md'>
                                    <div className='text-white relative z-30 p-6 md:p-8 lg:p-10 h-full'>
                                        <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
                                            <div className='rounded-full border-4 border-white w-[110px] h-[110px] overflow-hidden'>
                                                <img src={user?.photoURL} className='w-[110px] h-[110px] object-cover rounded-full' alt="" />
                                            </div>

                                            <div>
                                                <h1 className='text-2xl font-semibold'>{user?.displayName}</h1>
                                                <span className='block text-sm text-dark-03'>{user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}</span>

                                                {/* Show User Company and location */}
                                                {(user?.location || user?.company) && (
                                                    <div className='mt-4 text-dark-03 text-sm flex flex-col md:flex-row gap-2 md:gap-4'>
                                                        {user.location && (
                                                            <div className='flex items-center gap-1'>
                                                                <GrLocation /> {user.location}
                                                            </div>
                                                        )}
                                                        {user.company && (
                                                            <div className='flex items-center gap-1'>
                                                                <FaRegBuilding /> {user.company}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className='flex justify-between items-center absolute left-6 lg:left-8 right-6 lg:right-8 bottom-6'>
                                            <div className='flex items-center gap-2'>
                                                <button className='bg-theme-primary/90 py-2.5 px-4 rounded-md cursor-pointer text-sm'>
                                                    <span className='hidden lg:block'>Overview</span> <TbAlignBoxCenterBottom className='text-xl block lg:hidden' />
                                                </button>
                                            </div>
                                            <Link to={`/dashboard/profile-settings/${user._id}`} className='flex items-center gap-2 text-sm bg-amber-600 py-2.5 px-4 rounded-md cursor-pointer hover:bg-amber-700 duration-300'>
                                                <AiOutlineEdit className='text-lg' /> Edit Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-4'>
                                    <div className='flex flex-wrap -mx-3'>
                                        <div className='w-full md:w-5/12 lg:w-4/12 px-3 mb-4 mb-lg-0'>
                                            <div className='bg-white rounded-md p-6'>
                                                <span className='block mb-4'>Info</span>
                                                <ul className='text-sm space-y-5'>
                                                    <li>
                                                        <span className='text-dark-08 font-medium'>Full Name:</span> {user.displayName}
                                                    </li>
                                                    <li>
                                                        <span className='text-dark-08 font-medium'>Mobile:</span> {user.phone ? user.phone : 'Not avaliable'}
                                                    </li>
                                                    <li>
                                                        <span className='text-dark-08 font-medium'>Email:</span> {user.email}
                                                    </li>
                                                    {user?.location && (
                                                        <li>
                                                            <span className='text-dark-08 font-medium'>Email:</span> {user.emil}
                                                        </li>
                                                    )}
                                                    <li>
                                                        <span className='text-dark-08 font-medium'>Joining Date:</span> {moment(user.createdAt).format('ll')}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='w-full md:w-7/12 lg:w-8/12 px-3'>
                                            <div className='bg-white rounded-md p-6'>
                                                <span className='block mb-4'>About</span>
                                                {user.about && (
                                                    <p>{user.about}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfile;