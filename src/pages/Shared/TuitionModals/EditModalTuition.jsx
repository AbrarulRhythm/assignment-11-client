import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SweetAlert from '../../../components/SweetAlert/SweetAlert';

const EditModalTuition = ({ editModalRef, selectTuition, refetchTuitions }) => {
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm()

    useEffect(() => {
        if (selectTuition) {
            reset({
                bg: selectTuition.bg,
                tutorGender: selectTuition.tutorGender
            })
        }
    }, [selectTuition, reset]);

    // Handle Update Tuition Post
    const handleUpdateTuition = async (data) => {
        try {
            const res = await axiosSecure.patch(`/tuitions/${selectTuition._id}/update`, data);

            if (res.data.modifiedCount) {
                SweetAlert({
                    type: 'success',
                    message: 'Tuition information has been updated.',
                });

                editModalRef.current.close();
                reset(); // reset form

                if (refetchTuitions) {
                    refetchTuitions();
                }
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-semibold text-lg text-dark-08 mb-4">Update Tuition</h3>

                <div className='update-post'>
                    <form onSubmit={(e) => handleSubmit(handleUpdateTuition)(e)}>
                        <div className='flex flex-wrap -mx-2'>
                            {/* SubJect Name */}
                            <div className='w-full md:w-6/12 px-2 mb-3'>
                                <label className='form-label'>Subject Name <span className='text-red-500'>*</span></label>
                                <input {...register('subject', {
                                    required: 'Subject Name is required',
                                })} type="text" defaultValue={selectTuition.subject} className={`${errors.subject ? 'form-field-error form-field' : 'form-field'}`} placeholder='Subject Name' />
                                <span className={`${errors.subject ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.subject && errors.subject.message}</span>
                            </div>
                            {/* Class/Grade */}
                            <div className='w-full md:w-6/12 px-2 mb-3'>
                                <label className='form-label'>Class/Grade <span className='text-red-500'>*</span></label>
                                <input {...register('class', {
                                    required: 'Class/Grade is required',
                                })} type="text" defaultValue={selectTuition.class} className={`${errors.class ? 'form-field-error form-field' : 'form-field'}`} placeholder='Class/Grade' />
                                <span className={`${errors.class ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.class && errors.class.message}</span>
                            </div>
                            {/* Location */}
                            <div className='w-full md:w-6/12 px-2 mb-3'>
                                <label className='form-label'>Location <span className='text-red-500'>*</span></label>
                                <input {...register('location', {
                                    required: 'Location is required',
                                })} type="text" defaultValue={selectTuition.location} className={`${errors.location ? 'form-field-error form-field' : 'form-field'}`} placeholder='Location' />
                                <span className={`${errors.location ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.location && errors.location.message}</span>
                            </div>
                            {/* Budget */}
                            <div className='w-full md:w-6/12 px-2 mb-3'>
                                <label className='form-label'>Budget <span className='text-red-500'>*</span></label>
                                <input {...register('budget', {
                                    required: 'Budget is required',
                                })} type="number" defaultValue={selectTuition.budget} className={`${errors.budget ? 'form-field-error form-field' : 'form-field'}`} placeholder='Budget' />
                                <span className={`${errors.budget ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.budget && errors.budget.message}</span>
                            </div>
                            {/* Preferred Tutor Gender */}
                            <div className='w-full md:w-6/12 px-2 mb-3'>
                                <label className='form-label'>Preferred Tutor Gender</label>
                                <select {...register('tutorGender')} defaultValue="" className={`form-field select h-auto outline-0`}>
                                    <option value='' disabled>Select Tutor Gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                            {/* Schedule */}
                            <div className='w-full md:w-6/12 px-2 mb-3'>
                                <label className='form-label'>Schedule <span className='text-red-500'>*</span></label>
                                <input {...register('schedule', {
                                    required: 'Schedule is required',
                                })} type="text" defaultValue={selectTuition.schedule} className={`${errors.schedule ? 'form-field-error form-field' : 'form-field'}`} placeholder='Mon-Wed-Fri, 5 PM – 7 PM' />
                                <span className={`${errors.schedule ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.schedule && errors.schedule.message}</span>
                            </div>
                            {/* Select Background */}
                            <div className='w-full md:w-6/12 px-2 mb-3'>
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
                            {/* Your Phone */}
                            <div className='w-full md:w-6/12 px-2 mb-3'>
                                <label className='form-label'>Your Phone <span className='text-red-500'>*</span></label>
                                <input {...register('phone', {
                                    required: 'Phone is required',
                                })} defaultValue={selectTuition.phone} type="number" className={`${errors.phone ? 'form-field-error form-field' : 'form-field'}`} placeholder='Phone' />
                                <span className={`${errors.phone ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.phone && errors.phone.message}</span>
                            </div>
                            {/* Additional Notes */}
                            <div className='w-full md:w-12/12 px-2 mb-3'>
                                <label className='form-label'>Additional Notes</label>
                                <textarea {...register('notes')} rows='4' className='form-field' placeholder='Additional Notes' defaultValue={selectTuition.notes}></textarea>
                            </div>
                        </div>
                        <button type='submit' className='rounded-md py-3.5 px-8 button-fill duration-300 cursor-pointer' disabled={isSubmitting}>
                            {isSubmitting ? <><span className='loading loading-spinner loading-sm mr-1.5'></span> Update Tuition</> : 'Update Tuition'}
                        </button>
                    </form>
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default EditModalTuition;