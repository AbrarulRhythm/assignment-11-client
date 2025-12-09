import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import ProfileMenu from '../../../components/ProfileMenu/ProfileMenu';
import defaultUser from '../../../assets/default-user.png';

const BottomHeader = () => {
    const [openNavMenu, setOpenNavMenu] = useState(false);
    const [navStickyMovedUp, setNavStickyMovedUp] = useState(false);
    const [stickyNavTransition, setStickyNavTransition] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { user } = useAuth();
    const menuRef = useRef(null);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);

    // Sticky Navbar
    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;

            if (scroll >= 153) {
                setNavStickyMovedUp(true);
            }
            else {
                setNavStickyMovedUp(false);
            }

            // Apply Transition
            if (scroll >= 250) {
                setStickyNavTransition(true);
            }
            else {
                setStickyNavTransition(false);
            }

            // Sticky On
            if (scroll >= 500) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`
        ${navStickyMovedUp ? 'fixed top-0 -mt-[108px]' : 'absolute'}
        ${stickyNavTransition ? 'duration-500' : ''}
        ${isSticky ? 'mt-0 duration-500 shadow-md bg-white py-4 lg:py-3' : 'py-6'}
        left-0 right-0  bottom-header z-50`}>
            <div className='container'>
                <nav className='primary-menu relative'>
                    <div className='flex flex-wrap -mx-3 items-center justify-between'>
                        {/* Logo */}
                        <div className='w-6/12 lg:w-3/12 px-3'>
                            <Logo color='text-dark-08'></Logo>
                        </div>
                        {/* Logo End */}

                        <div className='w-auto lg:w-6/12 px-3'>
                            <div className={`${openNavMenu ? 'translate-y-0 opacity-100 visible duration-300' : '-translate-y-2.5 lg:translate-y-0 opacity-0 lg:opacity-100 invisible lg:visible duration-300'} mt-6 lg:mt-0 header-nav absolute lg:static top-[99%] left-0 right-0 bg-white lg:bg-transparent p-4 lg:p-0 rounded-md border lg:border-0 border-dark-03`}>
                                <ul className='main-menu flex-col lg:flex-row text-dark-07'>
                                    <li>
                                        <NavLink to='/'>Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/tuitions'>Tuitions</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/tutors'>Tutors</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/about'>About</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/contact'>Contact</NavLink>
                                    </li>
                                </ul>
                                <div className='flex lg:hidden flex-col text-center gap-3 mt-4'>
                                    <Link to='/login' className='text-dark-09 py-3 px-7 rounded-md border border-dark-03 hover:bg-dark-09 hover:text-white hover:border-dark-09 duration-300 cursor-pointer'>Login</Link>
                                    <Link to='/register' className='bg-theme-primary text-white py-3 px-7 rounded-md border hover:shadow-btn-inner hover:text-white duration-300 cursor-pointer'>Sign Up</Link>
                                </div>
                            </div>
                        </div>
                        <div className='w-auto lg:w-3/12 px-3'>
                            <div className='flex justify-end items-center gap-2.5'>
                                <div onClick={() => setOpenNavMenu(!openNavMenu)} className='w-11 h-11 rounded-sm justify-center items-center text-2xl flex lg:hidden bg-theme-primary/14 text-theme-primary'>
                                    {openNavMenu ? <MdClose /> : <HiMiniBars3BottomRight />}
                                </div>

                                {
                                    user ? (
                                        <div ref={menuRef} className='relative'>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenProfileMenu(!openProfileMenu);
                                                }}
                                                className='cursor-pointer w-14 h-14'>
                                                <img src={user?.photoURL || defaultUser} className='w-14 h-14 rounded-full object-cover bg-gray-300' alt="" />
                                                {/* <img src={`${user && user.photoURL}`} className='w-14 h-14 rounded-full object-cover bg-gray-300' alt="" /> */}
                                            </div>
                                            <ProfileMenu
                                                menuRef={menuRef}
                                                openProfileMenu={openProfileMenu}
                                                setOpenProfileMenu={setOpenProfileMenu}
                                            ></ProfileMenu>
                                        </div>
                                    ) : (
                                        <div className='space-x-3 hidden lg:block'>
                                            <Link to='/login' className='text-dark-09 py-3 px-7 rounded-md border border-dark-03 hover:bg-dark-09 hover:text-white hover:border-dark-09 duration-300 cursor-pointer'>Login</Link>
                                            <Link to='/register' className='bg-theme-primary text-white py-3 px-7 rounded-md border hover:shadow-btn-inner hover:text-white duration-300 cursor-pointer'>Sign Up</Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default BottomHeader;