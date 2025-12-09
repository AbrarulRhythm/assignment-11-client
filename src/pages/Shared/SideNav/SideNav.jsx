import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { NavLink } from 'react-router';
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePostAdd } from 'react-icons/md';
import { SlBookOpen } from "react-icons/sl";
import { TbArrowBarToLeft } from 'react-icons/tb';
import logoIcon from '../../../assets/logo-icon.png';

const SideNav = ({ sideMenuOpen, setSideMenuOpen }) => {
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
                    <li>
                        <NavLink to='/dashboard/my-tuitions' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                            <div><SlBookOpen className='text-[18px]' /></div>
                            <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>My Tuitions</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/post-new-tuition' className={`${sideMenuOpen && 'lg:justify-center'} flex items-center`}>
                            <div><MdOutlinePostAdd className='text-[24px]' /></div>
                            <span className={`${sideMenuOpen && 'lg:hidden'} text-sm pl-2`}>Post New Tuition</span>
                        </NavLink>
                    </li>
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