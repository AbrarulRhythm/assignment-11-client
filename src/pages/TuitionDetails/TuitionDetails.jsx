import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { MdInfoOutline } from 'react-icons/md';
import SectionBanner from '../../components/SectionBanner/SectionBanner';
import orange from '../../assets/bg/orange.png';
import blue from '../../assets/bg/blue.png';
import green from '../../assets/bg/green.png';
import yellow from '../../assets/bg/yellow.png';
import pink from '../../assets/bg/pink.png';
import red from '../../assets/bg/red.png';
import violet from '../../assets/bg/violet.png';
import cyan from '../../assets/bg/cyan.png'
import openBook from '../../assets/open-book-big.png';
import moment from 'moment/moment';
import bgImage from '../../assets/image01.png';
import { FaPlay } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useRole from '../../hooks/useRole';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useUserID from '../../hooks/useUserID';
import SweetAlert from '../../components/SweetAlert/SweetAlert';

const TuitionDetails = () => {
    const { id: tuitionId } = useParams();
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const tutorApplyModalRef = useRef();
    const role = useRole();
    const currentUserId = useUserID();

    const { isLoading, data: tutionDetails = null, refetch } = useQuery({
        queryKey: ['tuitionDetails', tuitionId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/tuitions/${tuitionId}?status=approved`);
            return res.data;
        }
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    useEffect(() => {
        if (user) {
            reset({
                tutorEmail: user?.email || ''
            })
        }
    }, [user, reset]);

    // Handle Apply Tuition
    const handleApplyTution = async (tutorApply) => {
        const tutorApplyInfo = {
            ...tutorApply,
            tutorId: currentUserId.id,
            tuitionId: tuitionId,
            subjectName: tutionDetails.subject
        }

        try {
            const res = await axiosSecure.post(`/tutor-request`, tutorApplyInfo);

            if (res.data.insertedId) {
                refetch();

                reset(); // Form reset
                tutorApplyModalRef.current.close();

                SweetAlert({
                    type: 'success',
                    message: 'Tuition request sent successfully!',
                });
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    // Tutor Apply Modal
    const appliModal = () => {
        tutorApplyModalRef.current.showModal();
    }

    return (
        <>
            <SectionBanner
                title='Tuition Details'
                currentLink='Tuition Details'
            ></SectionBanner>

            <div className='py-10 lg:py-20'>
                {/* Loading State */}
                {isLoading ? (
                    <div className='text-center mx-auto'>
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                ) : (
                    <>
                        {/* Empty State */}
                        {!tutionDetails ? (
                            <div className='text-center'>
                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                <span className='text-base'>No tuition details available at the moment.</span>
                            </div>
                        ) : (
                            // Data Row
                            <div className='container'>
                                <div className='flex flex-wrap -mx-3'>
                                    <div className='w-full md:w-6/12 lg:w-8/12 px-3 mb-4 lg:mb-0'>
                                        <div className='relative mb-5'>
                                            <div className='relative'>
                                                <img src={
                                                    tutionDetails.bg === 'orange'
                                                        ? `${orange}`
                                                        : tutionDetails.bg === 'blue'
                                                            ? `${blue}`
                                                            : tutionDetails.bg === 'green'
                                                                ? `${green}`
                                                                : tutionDetails.bg === 'yellow'
                                                                    ? `${yellow}`
                                                                    : tutionDetails.bg === 'pink'
                                                                        ? `${pink}`
                                                                        : tutionDetails.bg === 'red'
                                                                            ? `${red}`
                                                                            : tutionDetails.bg === 'violet'
                                                                                ? `${violet}`
                                                                                : `${cyan}`
                                                } className='rounded-md w-full' alt="bg-color" />
                                            </div>
                                            <img src={openBook} className='absolute top-[50%] left-[50%] -translate-[50%] group-hover:scale-110 duration-300 w-20 lg:w-auto' alt="open book icon" />
                                        </div>
                                        <h1 className='text-dark-09 text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-5'>{tutionDetails.subject}</h1>
                                        <div>
                                            <h3 className='text-xl md:text-2xl font-semibold text-theme-primary'>৳{tutionDetails.budget}</h3>
                                            <p>Location : <span className='text-dark-09 font-medium'>{tutionDetails.location}</span></p>
                                        </div>
                                        {tutionDetails.notes && (
                                            <p className='mt-3'>{tutionDetails.notes}</p>
                                        )}
                                        <h4 className='text-xl font-semibold text-dark-09 border-l-2 border-theme-primary pl-3 leading-[1.1] my-6'>Tution Details</h4>
                                        <div className='bg-content-bg rounded-md flex flex-col lg:flex-row items-start'>
                                            <ul className='p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-dark-03 w-full lg:w-[50%] space-y-3.5'>
                                                <li className='flex justify-between items-center'>Subject : <span className='text-dark-09 font-medium'>{tutionDetails.subject}</span></li>
                                                <li className='flex justify-between items-center'>Class/Grade : <span className='text-dark-09 font-medium'>{tutionDetails.class}</span></li>
                                                <li className='flex justify-between items-center'>Budget : <span className='text-dark-09 font-medium'>৳{tutionDetails.budget}</span></li>
                                                {tutionDetails.tutorGender && (
                                                    <li className='flex justify-between items-center'>Tutor Gender : <span className='text-dark-09 font-medium'>{tutionDetails.tutorGender}</span></li>
                                                )}
                                            </ul>
                                            <ul className='p-6 lg:p-10 w-full lg:w-[50%] space-y-3.5'>
                                                <li className='flex justify-between items-center'>Contact : <span className='text-dark-09 font-medium'>{tutionDetails.phone}</span></li>
                                                <li className='flex justify-between items-center'>Posted at : <span className='text-dark-09 font-medium'>{moment(tutionDetails.createdAt).format('ll')}</span></li>
                                                {tutionDetails.updatedAt && (
                                                    <li className='flex justify-between items-center'>Updated at : <span className='text-dark-09 font-medium'>{moment(tutionDetails.updatedAt).format('ll')}</span></li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='w-full md:w-6/12 lg:w-4/12 px-3'>
                                        <div className='p-6 rounded-md bg-content-bg sticky top-[124px]'>
                                            <div className='relative'>
                                                <div className='relative'>
                                                    <img src={bgImage} className='rounded-md w-full' alt="bg-color" />
                                                </div>
                                                <div className='bg-white w-[70px] h-[70px] text-[21px] absolute top-[50%] left-[50%] -translate-[50%] rounded-full flex justify-center items-center hover:bg-theme-primary hover:text-white duration-300 cursor-pointer'>
                                                    <FaPlay />
                                                </div>
                                            </div>
                                            <div className='flex justify-between items-center mt-4'>
                                                <h3 className='text-xl font-semibold text-theme-primary'>৳{tutionDetails.budget}</h3>
                                                <span className='text-[12px] bg-white py-1.5 px-2.5 rounded-sm'>Class<span className='text-[9px]'>/</span>Grade: {tutionDetails.class}</span>
                                            </div>
                                            {role.role === 'tutor' && (
                                                <div className='mt-5'>
                                                    <button
                                                        onClick={appliModal}
                                                        className='text-white font-medium rounded-md bg-theme-primary hover:shadow-btn-inner duration-300 cursor-pointer py-3 px-4 w-full mb-3'>Apply Now</button>
                                                    {/* <span className='block text-center pt-2 mb-4'>Already applied.</span> */}
                                                    <button className='text-white font-medium rounded-md bg-pink-500 hover:shadow-btn-inner duration-300 cursor-pointer py-3 px-4 w-full mb-3'>Book Mark</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Tutor Apply Modal */}
            <dialog ref={tutorApplyModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg mb-4">Apply this tuition.</h3>
                    <form onSubmit={(e) => handleSubmit(handleApplyTution)(e)}>
                        {/* Name */}
                        <div className='mb-3'>
                            <label className='form-label'>Name</label>
                            <input {...register('tutorName', {
                                required: 'Name is required',
                            })} defaultValue={user?.displayName} type="text" className={`${errors.tutorName ? 'form-field-error form-field' : 'form-field'}`} placeholder='Name' readOnly />
                            <span className={`${errors.tutorName ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorName && errors.tutorName.message}</span>
                        </div>
                        {/* Email */}
                        <div className='mb-3'>
                            <label className='form-label'>Email</label>
                            <input {...register('tutorEmail', {
                                required: 'Email is required',
                            })} type="text" className={`${errors.tutorEmail ? 'form-field-error form-field' : 'form-field'}`} placeholder='Email' readOnly />
                            <span className={`${errors.tutorEmail ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorEmail && errors.tutorEmail.message}</span>
                        </div>
                        {/* Qualifications */}
                        <div className='mb-3'>
                            <label className='form-label'>Qualifications</label>
                            <input {...register('tutorQualifications', {
                                required: 'Qualifications is required',
                            })} type="text" className={`${errors.tutorQualifications ? 'form-field-error form-field' : 'form-field'}`} placeholder='Qualifications' />
                            <span className={`${errors.tutorQualifications ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorQualifications && errors.tutorQualifications.message}</span>
                        </div>
                        {/* Experience */}
                        <div className='mb-3'>
                            <label className='form-label'>Experience</label>
                            <input {...register('tutorExperience', {
                                required: 'Experience is required',
                            })} type="text" className={`${errors.tutorExperience ? 'form-field-error form-field' : 'form-field'}`} placeholder='Experience' />
                            <span className={`${errors.tutorExperience ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorExperience && errors.tutorExperience.message}</span>
                        </div>
                        {/* Expected Salary */}
                        <div className='mb-3'>
                            <label className='form-label'>Expected Salary</label>
                            <input {...register('tutorSalary', {
                                required: 'Expected Salary is required',
                            })} type="number" className={`${errors.tutorSalary ? 'form-field-error form-field' : 'form-field'}`} placeholder='Expected Salary' />
                            <span className={`${errors.tutorSalary ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorSalary && errors.tutorSalary.message}</span>
                        </div>
                        <button type='submit' className='rounded-md py-3.5 px-8 button-fill duration-300 cursor-pointer mt-3' disabled={isSubmitting}>
                            {isSubmitting ? <><span className='loading loading-spinner loading-sm mr-1.5'></span> Submit</> : 'Submit'}
                        </button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default TuitionDetails;