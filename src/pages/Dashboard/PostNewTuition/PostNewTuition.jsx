import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';;
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import SweetAlert from '../../../components/SweetAlert/SweetAlert';

const PostNewTuition = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    // Handle Post Tuition
    const handlePostTuition = async (data) => {
        try {
            const res = await axiosSecure.post('/tuitions', data);

            if (res.data.insertedId) {
                reset(); // form reset
                SweetAlert({
                    type: 'success',
                    message: 'Tuition post created successfully!',
                });
            }
            else {
                toast.error(res.data.error);
            }

            navigate('/dashboard/pending-tuitions');
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='dashboard'>
            <title>Post New Tuition</title>

            <DashboardTitle
                title='Post New Tuition'
            ></DashboardTitle>

            <hr className='border-dark-03 mb-6' />
            <h4 className='text-xl text-dark-07 font-medium mb-4'>Enter your tuition details</h4>

            <div className='new-post'>
                <form onSubmit={handleSubmit(handlePostTuition)}>
                    <div className='flex flex-wrap -mx-3'>
                        {/* SubJect Name */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Subject Name <span className='text-red-500'>*</span></label>
                            <input {...register('subject', {
                                required: 'Subject Name is required',
                            })} type="text" className={`${errors.subject ? 'form-field-error form-field' : 'form-field'}`} placeholder='Subject Name' />
                            <span className={`${errors.subject ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.subject && errors.subject.message}</span>
                        </div>
                        {/* Class/Grade */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Class/Grade <span className='text-red-500'>*</span></label>
                            <input {...register('class', {
                                required: 'Class/Grade is required',
                            })} type="text" className={`${errors.class ? 'form-field-error form-field' : 'form-field'}`} placeholder='Class/Grade' />
                            <span className={`${errors.class ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.class && errors.class.message}</span>
                        </div>
                        {/* Location */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Location <span className='text-red-500'>*</span></label>
                            <input {...register('location', {
                                required: 'Location is required',
                            })} type="text" className={`${errors.location ? 'form-field-error form-field' : 'form-field'}`} placeholder='Location' />
                            <span className={`${errors.location ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.location && errors.location.message}</span>
                        </div>
                        {/* Budget */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Budget <span className='text-red-500'>*</span></label>
                            <input {...register('budget', {
                                required: 'Budget is required',
                            })} type="number" className={`${errors.budget ? 'form-field-error form-field' : 'form-field'}`} placeholder='Budget' />
                            <span className={`${errors.budget ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.budget && errors.budget.message}</span>
                        </div>
                        {/* Preferred Tutor Gender */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Preferred Tutor Gender</label>
                            <select {...register('tutorGender')} defaultValue="" className={`form-field select h-auto outline-0`}>
                                <option value='' disabled>Select Tutor Gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>
                        {/* Schedule */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Schedule <span className='text-red-500'>*</span></label>
                            <input {...register('schedule', {
                                required: 'Schedule is required',
                            })} type="text" className={`${errors.schedule ? 'form-field-error form-field' : 'form-field'}`} placeholder='Mon-Wed-Fri, 5 PM – 7 PM' />
                            <span className={`${errors.schedule ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.schedule && errors.schedule.message}</span>
                        </div>
                        {/* Select Background */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Select background <span className='text-red-500'>*</span></label>
                            <select {...register('bg', {
                                required: 'Please background your role'
                            })} defaultValue="" className={`${errors.bg ? 'form-field-error form-field' : 'form-field'} select h-auto outline-0`}>
                                <option value='' disabled>Select background</option>
                                <option value='orange'>
                                    Orange
                                </option>
                                <option value='blue'>
                                    Blue
                                </option>
                                <option value='green'>
                                    Green
                                </option>
                                <option value='yellow'>
                                    Yellow
                                </option>
                                <option value='pink'>
                                    Pink
                                </option>
                                <option value='red'>
                                    Red
                                </option>
                                <option value='violet'>
                                    Violet
                                </option>
                                <option value='cyan'>
                                    Cyan
                                </option>
                            </select>
                            <span className={`${errors.bg ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.bg && errors.bg.message}</span>
                        </div>
                        {/* Your Name */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Your Name <span className='text-red-500'>*</span></label>
                            <input {...register('name', {
                                required: 'Name is required',
                            })} defaultValue={user?.displayName} type="text" className={`${errors.name ? 'form-field-error form-field' : 'form-field'}`} placeholder='Name' readOnly />
                            <span className={`${errors.name ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.name && errors.name.message}</span>
                        </div>
                        {/* Your Email */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Your Email <span className='text-red-500'>*</span></label>
                            <input {...register('email', {
                                required: 'Email is required',
                            })} defaultValue={user?.email} type="email" className={`${errors.email ? 'form-field-error form-field' : 'form-field'}`} placeholder='Email' readOnly />
                            <span className={`${errors.email ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.email && errors.email.message}</span>
                        </div>
                        {/* Your Phone */}
                        <div className='w-full md:w-6/12 px-3 mb-3'>
                            <label className='form-label'>Your Phone <span className='text-red-500'>*</span></label>
                            <input {...register('phone', {
                                required: 'Phone is required',
                            })} defaultValue={user?.phoneNumber} type="number" className={`${errors.phone ? 'form-field-error form-field' : 'form-field'}`} placeholder='Phone' readOnly={user?.phoneNumber} />
                            <span className={`${errors.phone ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.phone && errors.phone.message}</span>
                        </div>
                        {/* Additional Notes */}
                        <div className='w-full md:w-12/12 px-3 mb-3'>
                            <label className='form-label'>Additional Notes</label>
                            <textarea {...register('notes')} rows='4' className='form-field' placeholder='Additional Notes'></textarea>
                        </div>
                    </div>
                    <button type='submit' className='rounded-md py-3.5 px-8 button-fill duration-300 cursor-pointer mt-3' disabled={isSubmitting}>
                        {isSubmitting ? <><span className='loading loading-spinner loading-sm mr-1.5'></span> Post Tuition</> : 'Post Tuition'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostNewTuition;