import React from 'react';
import { Link, Outlet } from 'react-router';
import logo from '../assets/logo-full-white.png';

const AuthLayout = () => {
    return (
        // Main Wrapper
        <div className='main-wrapper'>
            <div className='flex flex-wrap min-h-screen'>
                <div className='w-full md:w-6/12'>
                    <div className='relative overflow-hidden flex items-center h-full'>
                        <div className='absolute top-0 left-0 h-full w-full z-10 bg-theme-primary/70'></div>
                        <div className='absolute top-0 left-0 w-full h-full bg-cover bg-center auth-bg bg-[url(https://harnishdesign.net/demo/html/oxyy/images/login-bg.jpg)]'></div>

                        <div className='w-full min-h-screen flex flex-col'>
                            <div className='flex flex-wrap'>
                                <div className='w-11/12 md:w-10/12 lg:w-9/12 mx-auto'>
                                    <div className='relative z-10 pt-8'>
                                        <Link to='/' title='eTuitionBd'>
                                            <img src={logo} className='hover:opacity-65 duration-300' alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-wrap my-auto'>
                                <div className='w-11/12 md:w-10/12 lg:w-9/12 mx-auto'>
                                    <div className='relative z-10'>
                                        <h1 className='text-white text-3xl md:text-[32px] lg:text-[44px] leading-[1.3] font-semibold mb-4'>Looks like you're new here!</h1>
                                        <div className='text-base md:text-lg leading-[1.8] lg:leading-normal text-white'>Join our group in few minutes! Sign up with your details to get started</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-6/12 flex'>
                    <div className='container my-auto py-12'>
                        <div className='flex flex-wrap'>
                            <div className='w-11/12 md:w-10/12 lg:w-9/12 mx-auto'>
                                <Outlet></Outlet>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // Mian Wrapper End
    );
};

export default AuthLayout;