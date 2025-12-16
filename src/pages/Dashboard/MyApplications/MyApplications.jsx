import React, { useEffect, useRef, useState } from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { IoCheckmarkSharp, IoSearchSharp } from 'react-icons/io5';
import moment from 'moment';
import { IoIosLock, IoMdClose } from 'react-icons/io';
import { MdInfoOutline } from 'react-icons/md';
import { FiClock, FiEdit } from 'react-icons/fi';
import { LuEye } from 'react-icons/lu';
import { FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SweetAlert from '../../../components/SweetAlert/SweetAlert';

const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const applicationDetailsModalRef = useRef();
    const applicationUpdateModalRef = useRef();
    const [selectedApplication, setSelectedApplication] = useState([]);

    const { isLoading, data: myApplications = [], refetch } = useQuery({
        queryKey: ['applications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor-request?email=${user.email}`);
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
        reset({
            tutorName: selectedApplication.tutorName,
            tutorEmail: selectedApplication.tutorEmail,
            subjectName: selectedApplication.subjectName,
            tutorSalary: selectedApplication.tutorSalary,
            tutorQualifications: selectedApplication.tutorQualifications,
            tutorExperience: selectedApplication.tutorExperience
        })
    }, [reset, selectedApplication]);

    const openApplicationModal = (application) => {
        applicationDetailsModalRef.current.showModal();
        setSelectedApplication(application);
    }

    const openApplicationUpdateModal = (application) => {
        applicationUpdateModalRef.current.showModal();
        setSelectedApplication(application);
    }

    // Handle Delete Tuition
    const handleDeleteTuition = (applicationID) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/tutor-request/${applicationID}/delete`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your application has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }

    // Handle Update Application
    const handleUpdateApplication = async (data) => {
        try {
            const res = await axiosSecure.patch(`/tutor-request/${selectedApplication._id}/update`, data);

            if (res.data.modifiedCount) {
                refetch()

                reset(); // Form reset
                applicationUpdateModalRef.current.close();
                SweetAlert({
                    type: 'success',
                    message: 'Application request updated successfully!',
                });
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <title>My Applications</title>

            <DashboardTitle
                title='My Applications'
            ></DashboardTitle>

            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6'>
                <h3 className='text-xl font-semibold text-dark-07'>Total Applications: {myApplications.length}</h3>
                <div className='relative w-full md:w-auto'>
                    <div className='flex'>
                        <div className='h-[50px] w-[50px] bg-white text-lg flex border-l border-t border-b border-dark-03 rounded-l-md items-center justify-center'>
                            <IoSearchSharp />
                        </div>
                        <input
                            // onChange={(e) => setSearchText(e.target.value)}
                            type="text" className='w-full md:w-auto bg-white border border-dark-03 rounded-r-md py-3 pl-4 pr-5 focus:outline-0 focus:border-theme-primary h-[50px]' placeholder='Search...' />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto bg-white border border-dark-03 rounded-xl">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Student Name</th>
                            <th>Subject Name</th>
                            <th>Expected Salary</th>
                            <th>Status</th>
                            <th>Applied At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan='8' className='py-8 px-14'>
                                    <div className='text-start md:text-center'>
                                        <span className="loading loading-bars loading-lg"></span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {/* Empty State */}
                                {(!myApplications || myApplications.length === 0) ? (
                                    <tr>
                                        <td colSpan='8' className='py-8 px-14'>
                                            <div className='text-center'>
                                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                                <span className='text-base'>No applications available at the moment.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    // Data Row
                                    myApplications.map((application, index) => {
                                        return (
                                            <tr key={application._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <p className='w-[150px]'>{application.studentName}</p>
                                                </td>
                                                <td>
                                                    <p className='w-[200px] lg:w-auto'>{application.subjectName}</p>
                                                </td>
                                                <td>৳{application.tutorSalary}</td>
                                                <td>
                                                    <span className={application.status === 'approved' ? 'status-approved' : application.status === 'rejected' ? 'status-reject' : application.status === 'closed' ? 'status-closed' : 'status-pending'}>
                                                        {application.status === 'approved'
                                                            ? <><IoCheckmarkSharp className='text-sm' /> {application.status}</>
                                                            : application.status === 'rejected'
                                                                ? <><IoMdClose className='text-sm' /> {application.status} </>
                                                                : application.status === 'closed'
                                                                    ? <><IoIosLock className='text-sm' /> {application.status}</>
                                                                    : <><FiClock className='text-sm' /> {application.status}</>}
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className='w-[100px]'>{moment(application.appliedAt).format('ll')}</p>
                                                    <p className='w-[100px]'>{moment(application.appliedAt).format('LTS')}</p>
                                                </td>
                                                <td>
                                                    <div className='flex items-center justify-end gap-2'>
                                                        <button
                                                            onClick={() => openApplicationModal(application)}
                                                            data-tip="Details" className='tooltip view-btn'><LuEye /></button>

                                                        {(application.status !== 'rejected' && application.status !== 'approved' && application.status !== 'closed') && (
                                                            <>
                                                                <button
                                                                    onClick={() => openApplicationUpdateModal(application)}
                                                                    data-tip="Edit" className='tooltip edit-btn'><FiEdit /></button>

                                                                <button
                                                                    onClick={() => handleDeleteTuition(application._id)}
                                                                    data-tip="Delete" className='tooltip delete-btn'><FaRegTrashAlt /></button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            <dialog ref={applicationDetailsModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg mb-4">Application Details</h3>
                    <div>
                        <ul className='space-y-4'>
                            <li>Subject : <span className='text-dark-08 font-medium'>{selectedApplication.subjectName}</span></li>
                            <li>Student Name : <span className='text-dark-08 font-medium'>{selectedApplication.studentName}</span></li>
                            <li>Student Name : <span className='text-dark-08 font-medium'>{selectedApplication.studentEmail}</span></li>
                            <li>Experience : <span className='text-dark-08 font-medium'>{selectedApplication.tutorExperience}</span></li>
                            <li>Qualifications : <span className='text-dark-08 font-medium'>{selectedApplication.tutorQualifications}</span></li>
                            <li>Expected Salary : <span className='text-dark-08 font-medium'>{selectedApplication.tutorSalary}</span></li>
                            <li>Status: <span className={`
                    ${selectedApplication.status === 'approved' ? 'text-green-500' : selectedApplication.status === 'pending' ? 'text-amber-500' : selectedApplication.status === 'closed' ? 'text-violet-500' : 'text-red-500'}`}>{(selectedApplication?.status || 'unknown').toUpperCase()}</span></li>
                            <li>Applied At : <span className='text-dark-08 font-medium'>{moment(selectedApplication.updatedAt).format('ll')} | {moment(selectedApplication.updatedAt).format('LTS')}</span></li>
                        </ul>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Application Update Modal */}
            <dialog ref={applicationUpdateModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg text-dark-08 mb-4">Update Tuition</h3>

                    <div className='update-post'>
                        <form onSubmit={(e) => handleSubmit(handleUpdateApplication)(e)}>
                            <div className='flex flex-wrap -mx-2'>
                                {/* Name */}
                                <div className='w-full md:w-6/12 px-2 mb-3'>
                                    <label className='form-label'>Name</label>
                                    <input {...register('tutorName', {
                                        required: 'Name is required',
                                    })} type="text" className={`${errors.tutorName ? 'form-field-error form-field' : 'form-field'}`} placeholder='Name' readOnly />
                                    <span className={`${errors.tutorName ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorName && errors.tutorName.message}</span>
                                </div>
                                {/* Email */}
                                <div className='w-full md:w-6/12 px-2 mb-3'>
                                    <label className='form-label'>Email</label>
                                    <input {...register('tutorEmail', {
                                        required: 'Email is required',
                                    })} type="text" className={`${errors.tutorEmail ? 'form-field-error form-field' : 'form-field'}`} placeholder='Email' readOnly />
                                    <span className={`${errors.tutorEmail ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorEmail && errors.tutorEmail.message}</span>
                                </div>
                                {/* Subject */}
                                <div className='w-full md:w-6/12 px-2 mb-3'>
                                    <label className='form-label'>Subject Name</label>
                                    <input {...register('subjectName', {
                                        required: 'Subject Name is required',
                                    })} type="text" className={`${errors.subjectName ? 'form-field-error form-field' : 'form-field'}`} placeholder='Subject Name' readOnly />
                                    <span className={`${errors.subjectName ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.subjectName && errors.subjectName.message}</span>
                                </div>
                                {/* Expected Salary */}
                                <div className='w-full md:w-6/12 px-2 mb-3'>
                                    <label className='form-label'>Expected Salary</label>
                                    <input {...register('tutorSalary', {
                                        required: 'Subject Name is required',
                                    })} type="number" className={`${errors.tutorSalary ? 'form-field-error form-field' : 'form-field'}`} placeholder='Expected Salary' />
                                    <span className={`${errors.tutorSalary ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorSalary && errors.tutorSalary.message}</span>
                                </div>
                                {/* Qualifications */}
                                <div className='w-full md:w-6/12 px-2 mb-3'>
                                    <label className='form-label'>Qualifications</label>
                                    <input {...register('tutorQualifications', {
                                        required: 'Qualifications is required',
                                    })} type="text" className={`${errors.tutorQualifications ? 'form-field-error form-field' : 'form-field'}`} placeholder='Qualifications' />
                                    <span className={`${errors.tutorQualifications ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorQualifications && errors.tutorQualifications.message}</span>
                                </div>
                                {/* Experience */}
                                <div className='w-full md:w-6/12 px-2 mb-3'>
                                    <label className='form-label'>Experience</label>
                                    <input {...register('tutorExperience', {
                                        required: 'Qualifications is required',
                                    })} type="text" className={`${errors.tutorExperience ? 'form-field-error form-field' : 'form-field'}`} placeholder='Experience' />
                                    <span className={`${errors.tutorExperience ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tutorExperience && errors.tutorExperience.message}</span>
                                </div>
                            </div>
                            <button type='submit' className='rounded-md py-2.5 px-6 button-fill duration-300 cursor-pointer' disabled={isSubmitting}>
                                {isSubmitting ? <><span className='loading loading-spinner loading-sm mr-1.5'></span> Update</> : 'Update'}
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
        </div>
    );
};

export default MyApplications;