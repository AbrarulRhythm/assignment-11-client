import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { user, userSignIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    // Handle Sign In
    const handleSignIn = async (data) => {
        try {
            const result = await userSignIn(data.email, data.password);

            reset(); // form reset
            toast.success(`Sign In successful. Welcome back, ${result.user.displayName}!`);
            navigate(location?.state || '/');
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    if (user) {
        navigate(location?.state || '/');
    }

    return (
        <>
            <title>eTuitionBd - log in or sign up</title>

            <div className='form-wrap'>
                <div className='text-start mb-8'>
                    <h2 className='text-dark-09 font-bold text-[32px] lg:text-4xl mb-1'>Log In</h2>
                </div>

                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className='flex flex-wrap -mx-2'>
                        {/* Email */}
                        <div className='w-full md:w-12/12 px-2 mb-3'>
                            <label className='form-label'>Email</label>
                            <input {...register('email', {
                                required: 'Email is required',
                            })} type="email" className={`${errors.email ? 'form-field-error form-field' : 'form-field'}`} placeholder='Email' />
                            <span className={`${errors.email ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.email && errors.email.message}</span>
                        </div>
                        {/* Password */}
                        <div className='w-full md:w-12/12 px-2 mb-3'>
                            <label className='form-label'>Password</label>
                            <div className='relative'>
                                <input {...register('password', {
                                    required: 'Password is required'
                                })} type={showPassword ? 'text' : 'password'} className={`${errors.password ? 'form-field-error form-field' : 'form-field'}`} placeholder='Password' />
                                <span onClick={() => setShowPassword(!showPassword)} className='absolute right-5 top-[50%] -translate-y-[50%] text-xl cursor-pointer text-dark-06 hover:text-dark-07 duration-150'>
                                    {showPassword ? <FaEye /> : <IoEyeOff />}
                                </span>
                            </div>
                            <span className={`${errors.password ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.password && errors.password.message}</span>
                        </div>
                    </div>
                    <button type='submit' className='w-full rounded-md py-3.5 px-4 button-fill duration-300 cursor-pointer mt-3' disabled={isSubmitting}>{isSubmitting ? <span className='loading loading-spinner loading-sm'></span> : 'Login'}</button>
                </form>
                <div className='mb-6'>
                    <SocialLogin
                        text='sign up with'
                    ></SocialLogin>
                </div>
                <div className='text-center'>
                    <p>Don't have an account? <Link to='/register' state={location.state} className='text-theme-primary underline hover:text-primary-theme/80 duration-100 underline-offset-2'>Sign up</Link></p>
                </div>
            </div>
        </>
    );
};

export default Login;