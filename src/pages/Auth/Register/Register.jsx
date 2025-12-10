import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const { user, createUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    // Handle Register
    const handleRegister = async (data) => {
        try {
            // 1. Create User
            await createUser(data.email, data.password);

            // 2. Create user in DataBase
            const userInfo = {
                displayName: data.name,
                email: data.email,
                phone: data.phone,
                photoURL: '/default-user.png',
                role: data.role
            }

            await axiosSecure.post('/users', userInfo);

            // 3. Update to the Firebase Profile
            await updateUserProfile({ displayName: data.name });

            // 4. Finish
            reset(); // form reset
            navigate(location?.state || '/');
            toast.success(`Dear ${data.name}, your account has been successfully created 🎉`);

        }
        catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";

            toast.error(message);
        }
    }

    if (user) {
        navigate(location?.state || '/');
    }

    return (
        <>
            <title>Sign up for eTuitionBd</title>

            <div className='form-wrap'>
                <div className='text-start mb-8'>
                    <h2 className='text-dark-09 font-bold text-[32px] lg:text-4xl mb-1'>Create an Account</h2>
                    <p className='text-lg text-dark-07'>Register with eTuitionBd</p>
                </div>

                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className='flex flex-wrap -mx-2'>
                        {/* Name */}
                        <div className='w-full md:w-6/12 px-2 mb-3'>
                            <label className='form-label'>Name</label>
                            <input {...register('name', {
                                required: 'Name is required',
                            })} type="text" className={`${errors.name ? 'form-field-error form-field' : 'form-field'}`} placeholder='Name' />
                            <span className={`${errors.name ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.name && errors.name.message}</span>
                        </div>
                        {/* Email */}
                        <div className='w-full md:w-6/12 px-2 mb-3'>
                            <label className='form-label'>Email</label>
                            <input {...register('email', {
                                required: 'Email is required',
                            })} type="email" className={`${errors.email ? 'form-field-error form-field' : 'form-field'}`} placeholder='Email' />
                            <span className={`${errors.email ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.email && errors.email.message}</span>
                        </div>
                        {/* Password */}
                        <div className='w-full md:w-6/12 px-2 mb-3'>
                            <label className='form-label'>Password</label>
                            <div className='relative'>
                                <input {...register('password', {
                                    required: 'Password is required',
                                    validate: {
                                        minLength: (value) =>
                                            value.length >= 6 || "Must be at least 6 characters",
                                        hasUppercase: (value) =>
                                            /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                                        hasLowercase: (value) =>
                                            /[a-z]/.test(value) || "Must contain at least one lowercase letter",
                                        hasSpecialChar: (value) =>
                                            /[^A-Za-z0-9]/.test(value) || "Must contain at least one special character",
                                    }
                                })} type={showPassword ? 'text' : 'password'} className={`${errors.password ? 'form-field-error form-field' : 'form-field'}`} placeholder='Password' />
                                <span onClick={() => setShowPassword(!showPassword)} className='absolute right-5 top-[50%] -translate-y-[50%] text-xl cursor-pointer text-dark-06 hover:text-dark-07 duration-150'>
                                    {showPassword ? <FaEye /> : <IoEyeOff />}
                                </span>
                            </div>
                            <span className={`${errors.password ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.password && errors.password.message}</span>
                        </div>
                        {/* Phone */}
                        <div className='w-full md:w-6/12 px-2 mb-3'>
                            <label className='form-label'>Phone</label>
                            <input {...register('phone', {
                                required: 'Phone number is required',
                            })} type="number" className={`${errors.phone ? 'form-field-error form-field' : 'form-field'}`} placeholder='Phone' />
                            <span className={`${errors.phone ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.phone && errors.phone.message}</span>
                        </div>
                        {/* Select Role */}
                        <div className='w-full md:w-12/12 px-3 mb-3'>
                            <label className='form-label'>Select Role</label>
                            <select {...register('role', {
                                required: 'Please select your role'
                            })} defaultValue="" className={`${errors.role ? 'form-field-error form-field' : 'form-field'} select h-auto outline-0`}>
                                <option value='' disabled>Select Role</option>
                                <option value='student'>Student</option>
                                <option value='tutor'>Tutor</option>
                            </select>
                            <span className={`${errors.role ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.role && errors.role.message}</span>
                        </div>
                    </div>
                    <button type='submit' className='w-full rounded-md py-3.5 px-4 button-fill duration-300 cursor-pointer mt-3' disabled={isSubmitting}>{isSubmitting ? <span className='loading loading-spinner loading-sm'></span> : 'Register'}</button>
                </form>
                <div className='mb-6'>
                    <SocialLogin
                        text='sign up with'
                    ></SocialLogin>
                </div>
                <div className='text-center'>
                    <p>Already have an account? <Link to='/login' state={location.state} className='text-theme-primary underline hover:text-primary-theme/80 duration-100 underline-offset-2'>Sign in</Link></p>
                </div>
            </div>
        </>
    );
};

export default Register;