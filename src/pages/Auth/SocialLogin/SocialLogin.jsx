import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const SocialLogin = ({ text }) => {
    const { googleSignIn } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    // Handle google sign in
    const handleGoogleSignIn = async () => {
        try {
            // 1. Google Sign in
            const result = await googleSignIn();

            // 2. Create user in database
            const userInfo = {
                displayName: result.user?.displayName,
                email: result.user?.email,
                phone: result.user?.phone,
                photoURL: result.user?.photoURL,
                role: 'student'
            }

            const res = await axiosSecure.post('/users', userInfo);

            // 3. If user created successfully
            if (res.data.insertedId) {
                toast.success(`Welcome aboard, ${result.user?.displayName}! 🎉 You've successfully signed up`);
            }
            else {
                toast(res.data.message);
            }

            // 4. Redirect user
            navigate(location?.state || '/');
        }
        catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";

            toast.error(message);
        }
    }

    return (
        <>
            <div className='my-8 overflow-hidden'>
                <div className='relative text-center or-social'>OR {text}</div>
            </div>
            {/* Google Sign In Button */}
            <div className='flex justify-center items-center gap-3'>
                <button
                    onClick={handleGoogleSignIn}
                    className='font-semibold flex items-center justify-center w-16 h-16 gap-2.5 border border-dark-03 hover:border-theme-primary duration-200 cursor-pointer rounded-full'>
                    <FcGoogle className='text-[26px]' />
                </button>
            </div>
        </>
    );
};

export default SocialLogin;