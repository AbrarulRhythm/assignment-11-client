import React, { useRef, useState } from 'react';
import { TbArrowBarToLeft } from "react-icons/tb";
import useAuth from '../../../hooks/useAuth';
import ProfileMenu from '../../../components/ProfileMenu/ProfileMenu';
import defaultUser from '../../../assets/default-user.png';

const DashboardTopNav = ({ sideMenuOpen, setSideMenuOpen }) => {
    const { user } = useAuth();
    const menuRef = useRef(null);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);

    return (
        <div className='py-4 px-4 lg:px-10'>
            <div className='flex items-center justify-between'>
                <div
                    onClick={() => setSideMenuOpen(!sideMenuOpen)}
                    className={`${sideMenuOpen ? 'rotate-180 text-theme-primary' : 'rotate-180 lg:rotate-0'} w-8 h-8 flex justify-center items-center text-[22px] hover:text-theme-primary cursor-pointer duration-200`}>
                    <TbArrowBarToLeft />
                </div>

                {/* Right Side */}
                <div>
                    <div ref={menuRef} className='relative'>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenProfileMenu(!openProfileMenu);
                            }}
                            className='cursor-pointer w-12 h-12'>
                            <img src={user?.photoURL || defaultUser} className='w-12 h-12 rounded-full object-cover bg-gray-300' alt="Profile Image" />
                        </div>
                        <ProfileMenu
                            menuRef={menuRef}
                            openProfileMenu={openProfileMenu}
                            setOpenProfileMenu={setOpenProfileMenu}
                        ></ProfileMenu>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTopNav;