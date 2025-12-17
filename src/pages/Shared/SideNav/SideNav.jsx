import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { NavLink } from 'react-router';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineCategory, MdOutlinePostAdd, MdOutlineSpoke, MdPendingActions } from 'react-icons/md';
import { SlBookOpen } from "react-icons/sl";
import { TbArrowBarToLeft } from 'react-icons/tb';
import logoIcon from '../../../assets/logo-icon.png';
import { PiUsersThree } from "react-icons/pi";
import useRole from '../../../hooks/useRole';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaRegFileAlt } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuHistory } from "react-icons/lu";

const SideNav = ({ sideMenuOpen, setSideMenuOpen }) => {
    const { isLoading, role } = useRole();

    return (
        <div className='relative h-full'>
            <div className='px-6 py-6 duration-300'>
                {sideMenuOpen ? (
                    <img src={logoIcon} alt="" />
                ) : (
                    <div className='duration-300'>
                        <Logo></Logo>
                    </div>
                )}
            </div>

            <div className='px-6 side-nav overflow-hidden'>
                <ul>
                    <li>
                        <NavLink to='/dashboard/overview' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                            <div><RxDashboard className='text-[19px]' /></div>
                            <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>Dashboard</span>
                        </NavLink>
                    </li>

                    {isLoading ? (
                        <div className='space-y-2'>
                            <div className="skeleton py-6 w-full"></div>
                            <div className="skeleton py-6 w-full"></div>
                            <div className="skeleton py-6 w-full"></div>
                        </div>
                    ) : (
                        <>
                            {/* Student Only Routes */}
                            {role === 'student' && <>
                                <li>
                                    <NavLink to='/dashboard/my-tuitions' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><SlBookOpen className='text-[18px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>My Tuitions</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/pending-tuitions' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><MdPendingActions className='text-[22px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>Pending Tuitions</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/post-new-tuition' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><MdOutlinePostAdd className='text-[24px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>Post New Tuition</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/applied-tutors' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><LiaChalkboardTeacherSolid className='text-[24px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>Applied Tutors</span>
                                    </NavLink>
                                </li>
                            </>}

                            {/* Tutor Only Routes */}
                            {role === 'tutor' && <>
                                <li>
                                    <NavLink to='/dashboard/my-applications' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><FaRegFileAlt className='text-[24px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>My Applications</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/ongoing-tuitions' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><MdOutlineSpoke className='text-[24px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>Ongoing Tuitions</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/completed-tutions' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><IoMdCheckmarkCircleOutline className='text-[24px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>Completed Tutions</span>
                                    </NavLink>
                                </li>
                            </>}

                            {/* Admin Only Routes */}
                            {role === 'admin' && <>
                                <li>
                                    <NavLink to='/dashboard/user-management' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><PiUsersThree className='text-[24px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>User Management</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/tuition-management' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><MdOutlineCategory className='text-[24px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>Tuition Management</span>
                                    </NavLink>
                                </li>
                            </>}

                            {/* Tutor and Student */}
                            {role !== 'admin' && <>
                                <li>
                                    <NavLink to='/dashboard/payment-history' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                                        <div><LuHistory className='text-[22px]' /></div>
                                        <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>Payment History</span>
                                    </NavLink>
                                </li>
                            </>}
                        </>
                    )}
                </ul>
            </div>
            <div className='block lg:hidden absolute bottom-0 left-0 right-0 py-5 px-6'>
                <button onClick={() => setSideMenuOpen(!sideMenuOpen)} className='flex items-center space-x-2 text-sm cursor-pointer w-full'>
                    <TbArrowBarToLeft className='text-xl' /> <span>Collapsed View</span>
                </button>
            </div>
        </div>
    );
};

export default SideNav;