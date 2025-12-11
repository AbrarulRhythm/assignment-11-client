import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdInfoOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SweetAlert from '../../../components/SweetAlert/SweetAlert';
import useAuth from '../../../hooks/useAuth';

const ProfileSettings = () => {
    const { id } = useParams();
    const { updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: user = [], refetch: userDataRefetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${id}`);
            return res.data;
        }
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    // Handle Update Profile
    const handleUpdateProfile = async (data) => {
        try {
            // Update Profile in Database
            await axiosSecure.patch(`/users/${id}/update`, data);

            // Update to the Firebase Profile
            await updateUserProfile({ displayName: data.displayName });

            SweetAlert({
                type: 'success',
                message: 'Profile updated successfully.',
            });
            reset();
            userDataRefetch();
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <title>Profile Settings | eTuitionBd - Admin</title>

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

                                    </div>
                                </div>

                                <div className='-mt-[100px]'>
                                    <div className='flex flex-wrap -mx-3'>
                                        <div className='w-full md:w-5/12 lg:w-4/12 px-3 mb-4 mb-lg-0'>
                                            <div className='bg-white rounded-md p-6'>
                                                <div className='rounded-full border-4 border-theme-primary w-[130px] h-[130px] overflow-hidden mx-auto relative'>
                                                    <img src={user?.photoURL} className='w-[130px] h-[130px] object-cover rounded-full' alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full md:w-7/12 lg:w-8/12 px-3'>
                                            <div className='bg-white rounded-md p-6 relative z-30'>
                                                <form onSubmit={handleSubmit(handleUpdateProfile)}>
                                                    <div className='flex flex-wrap -mx-3'>
                                                        {/* Name */}
                                                        <div className='w-full md:w-6/12 px-2 mb-3'>
                                                            <label className='form-label'>Name</label>
                                                            <input {...register('displayName', {
                                                                required: 'Name is required',
                                                            })} defaultValue={user.displayName} type="text" className={`${errors.displayName ? 'form-field-error form-field' : 'form-field'}`} placeholder='Name' />
                                                            <span className={`${errors.displayName ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.displayName && errors.displayName.message}</span>
                                                        </div>
                                                        {/* Email */}
                                                        <div className='w-full md:w-6/12 px-2 mb-3'>
                                                            <label className='form-label'>Email</label>
                                                            <input defaultValue={user.email} type="email" className={`${errors.email ? 'form-field-error form-field' : 'form-field'}`} placeholder='Email' readOnly />
                                                            <span className={`${errors.email ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.email && errors.email.message}</span>
                                                        </div>
                                                        {/* Phone */}
                                                        <div className='w-full md:w-6/12 px-2 mb-3'>
                                                            <label className='form-label'>Phone</label>
                                                            <input {...register('phone', {
                                                                required: 'Phone number is required',
                                                            })} defaultValue={user.phone} type="number" className={`${errors.phone ? 'form-field-error form-field' : 'form-field'}`} placeholder='Phone' />
                                                            <span className={`${errors.phone ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.phone && errors.phone.message}</span>
                                                        </div>
                                                        {/* Company */}
                                                        <div className='w-full md:w-6/12 px-2 mb-3'>
                                                            <label className='form-label'>Company</label>
                                                            <input {...register('company')} defaultValue={user.company} type="text" className='form-field' placeholder='Company' />
                                                        </div>
                                                        {/* Location */}
                                                        <div className='w-full md:w-12/12 px-2 mb-3'>
                                                            <label className='form-label'>Location</label>
                                                            <input {...register('location')} defaultValue={user.location} type="text" className='form-field' placeholder='Location' />
                                                        </div>
                                                        {/* About */}
                                                        <div className='w-full md:w-12/12 px-2 mb-3'>
                                                            <label className='form-label'>About</label>
                                                            <textarea {...register('about')} defaultValue={user.about} rows='4' className='form-field' placeholder='About'></textarea>
                                                        </div>
                                                    </div>
                                                    <button type='submit' className='rounded-md py-3.5 px-8 button-fill duration-300 cursor-pointer' disabled={isSubmitting}>
                                                        {isSubmitting ? <><span className='loading loading-spinner loading-sm mr-1.5'></span> Update Profile</> : 'Update Profile'}
                                                    </button>
                                                </form>
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

export default ProfileSettings;