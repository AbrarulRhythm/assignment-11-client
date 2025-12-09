import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = ({ text }) => {
    return (
        <>
            <div className='my-8 overflow-hidden'>
                <div className='relative text-center or-social'>OR {text}</div>
            </div>
            {/* Google Sign In Button */}
            <div className='flex justify-center items-center gap-3'>
                <button className='font-semibold flex items-center justify-center w-16 h-16 gap-2.5 border border-dark-03 hover:border-theme-primary duration-200 cursor-pointer rounded-full'>
                    <FcGoogle className='text-[26px]' />
                </button>
            </div>
        </>
    );
};

export default SocialLogin;