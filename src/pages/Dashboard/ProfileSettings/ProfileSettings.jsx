import React, { useRef } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdCameraAlt, MdInfoOutline, MdPhotoCamera } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SweetAlert from '../../../components/SweetAlert/SweetAlert';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import useRole from '../../../hooks/useRole';

const ProfileSettings = () => {
    const { id } = useParams();
    const { user: authUser, updateUserProfile, getNewCustomTokenFromServer, isTokenSet } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();
    const profilePicUpdateRef = useRef();

    const { isLoading, data: user = [], refetch: userDataRefetch } = useQuery({
        queryKey: ['user', id],
        enabled: isTokenSet,
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

    // useForm for update profile picture
    const {
        register: profile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: profilePicErrors, isSubmitting: profilePicSubmitting }
    } = useForm();

    // Handle Update Profile
    const handleUpdateProfile = async (data) => {
        try {
            // Update Profile in Database
            await axiosSecure.patch(`/users/${id}/update`, data);

            // Update to the Firebase Profile
            await updateUserProfile({ displayName: data.displayName });

            await getNewCustomTokenFromServer(authUser);

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

    // Handle Update Profile Pic
    const handleUpdateProfilePic = async (data) => {

        const profileImage = data.profilePic[0];

        try {
            // Store the image and get the photo url
            const formData = new FormData();
            formData.append('image', profileImage)
            const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

            const imageRes = await axios.post(imageAPI_URL, formData);
            const photoURL = imageRes.data.data.url; // Image live url

            // Update profile to database
            await axiosSecure.patch(`/users/${id}/update`, { photoURL });

            // Update profile to firebase
            await updateUserProfile({ photoURL: photoURL });

            await getNewCustomTokenFromServer(authUser);

            SweetAlert({
                type: 'success',
                message: 'Profile updated successfully.',
            });
            profilePicUpdateRef.current.close(); // Close profile pic Modal
            reset();
            userDataRefetch();
        }
        catch (error) {
            console.log(error.message);
        }
    }

    // Handle Open Profile Pic Modal
    const openProfilePicModal = () => {
        profilePicUpdateRef.current.showModal();
    }

    // =================================== :: Update User Role :: ===================================
    // Update user role
    const updateUserRole = (user, role) => {
        const roleInfo = { role };

        // Conditional confirmation messages
        const actionText =
            role === 'admin'
                ? 'Approve this user as Admin?'
                : role === 'tutor'
                    ? 'Approve this user as Tutor?'
                    : 'Approve this user as Student?'

        const confirmButtonText =
            role === "admin"
                ? "Yes, approve!"
                : "Yes, remove!";

        Swal.fire({
            title: "Are you sure?",
            text: actionText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${id}/update/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh the data in the ui
                            userDataRefetch();

                            const titleMessage = role === 'admin'
                                ? `${user.displayName} marked as an Admin`
                                : role === 'tutor'
                                    ? `${user.displayName} marked as an Tutor`
                                    : `${user.displayName} marked as an Student`;

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: titleMessage,
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            }
        });
    }

    // Handle Make Admin
    const handleMakeAdmin = (user) => {
        updateUserRole(user, 'admin');
    }

    // Handle Make Tutor
    const handleMakeTutor = (user) => {
        updateUserRole(user, 'tutor');
    }

    // Handle Make Student
    const handleMakeStudent = (user) => {
        updateUserRole(user, 'student');
    }

    // Display user role
    const displayUserRole = user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''

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
                                                <div className='rounded-full overflow-hidden relative w-fit mx-auto'>
                                                    <img src={user?.photoURL} className='w-[130px] h-[130px] object-cover rounded-full text-center border-4 m-auto border-theme-primary' alt="profile pic" />
                                                </div>
                                                <button onClick={openProfilePicModal} className='flex items-center text-sm gap-1.5 mt-4 bg-gray-100 w-full py-3 px-4 rounded-md cursor-pointer hover:bg-gray-200 duration-300'>
                                                    <MdPhotoCamera className='text-lg' /> Change Profile Picture
                                                </button>
                                                {role === 'admin' && (
                                                    <div className='mt-4'>
                                                        <span className='text-sm block mb-2'>Change user role</span>
                                                        <div className="dropdown">
                                                            <div tabIndex={0} role="button" className="btn m-1">{displayUserRole}</div>
                                                            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                                {user.role !== 'admin' && <li><button onClick={() => handleMakeAdmin(user)}>Admin</button></li>}
                                                                {user.role !== 'tutor' && <li><button onClick={() => handleMakeTutor(user)}>Tutor</button></li>}
                                                                {user.role !== 'student' && <li><button onClick={() => handleMakeStudent(user)}>Student</button></li>}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
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

            {/* Profile Picture update modal */}
            <dialog ref={profilePicUpdateRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg">Change Your Photo</h3>
                    <form onSubmit={(e) => handleSubmitProfile(handleUpdateProfilePic)(e)} className='mt-4'>
                        <input {...profile('profilePic', {
                            required: 'Please choose your photo',
                        })} type="file" className={`${profilePicErrors.profilePic ? 'form-field-error form-field' : 'form-field'} file-input w-full h-auto`} />
                        <span className={`${profilePicErrors.profilePic ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{profilePicErrors.profilePic && profilePicErrors.profilePic.message}</span>
                        <button className="btn btn-primary mt-3" disabled={profilePicSubmitting}>
                            {profilePicSubmitting ? <><span className='loading loading-spinner loading-sm mr-1.5'></span> Save</> : 'Save'}
                        </button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className='space-x-1.5'>
                                <button className="btn">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ProfileSettings;