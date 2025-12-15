import React, { useRef, useState } from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import { IoCheckmarkSharp, IoSearchSharp, IoTimeOutline } from 'react-icons/io5';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { MdInfoOutline } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { FiClock } from 'react-icons/fi';
import { LuEye } from 'react-icons/lu';
import Swal from 'sweetalert2';

const AppliedTutors = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const applicationDetailsModalRef = useRef();
    const [selectedApplication, setSelectedApplication] = useState([]);

    const { isLoading, data: tutorApplications = [], refetch } = useQuery({
        queryKey: ['applications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor-request?email=${user.email}`);
            return res.data;
        }
    });


    const openApplicationModal = (application) => {
        applicationDetailsModalRef.current.showModal();
        setSelectedApplication(application);
    }

    // Update Application Status
    const updateApplicationStatus = (application, status) => {
        const statusInfo = { status };

        // Conditional confirmation messages
        const actionText =
            status === "rejected"
                ? "You want to reject this Application!"
                : "You want to mark this application as Pending!";

        const confirmButtonText =
            status === "rejected"
                ? "Yes, reject!"
                : "Yes, pending!";

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
                axiosSecure.patch(`/tutor-request/${application._id}/status/update`, statusInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh the data in the ui
                            refetch();

                            const titleMessage = status === 'rejected'
                                ? `Application has been rejected.`
                                : `Application has been marked as pending.`;

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

    // Handle Reject Application
    const handleRejectApplication = (application) => {
        updateApplicationStatus(application, 'rejected');
    }

    // Handle Pending Application
    const handlePendingApplication = (application) => {
        updateApplicationStatus(application, 'pending');
    }

    return (
        <div className='dashboard'>
            <title>Applied Tutors</title>

            <DashboardTitle
                title='Applied Tutors'
            ></DashboardTitle>

            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6'>
                <h3 className='text-xl font-semibold text-dark-07'>Total Applications: {tutorApplications.length}</h3>
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
                            <th>Tutor Name</th>
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
                                {(!tutorApplications || tutorApplications.length === 0) ? (
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
                                    tutorApplications.map((application, index) => {
                                        return (
                                            <tr key={application._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <p className='w-[150px]'>{application.tutorName}</p>
                                                </td>
                                                <td>
                                                    <p className='w-[200px] lg:w-auto'>{application.subjectName}</p>
                                                </td>
                                                <td>৳{application.tutorSalary}</td>
                                                <td>
                                                    <span className={application.status === 'approved' ? 'status-approved' : application.status === 'rejected' ? 'status-reject' : 'status-pending'}>
                                                        {application.status === 'approved'
                                                            ? <><IoCheckmarkSharp className='text-sm' /> {application.status}</>
                                                            : application.status === 'rejected'
                                                                ? <><IoMdClose className='text-sm' /> {application.status} </>
                                                                : <><FiClock className='text-sm' /> {application.status}</>}
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className='w-[100px]'>{moment(application.appliedAt).format('ll')}</p>
                                                    <p className='w-[100px]'>{moment(application.appliedAt).format('LTS')}</p>
                                                </td>
                                                <td>
                                                    <div className='flex items-center gap-2'>
                                                        <button
                                                            onClick={() => openApplicationModal(application)}
                                                            data-tip="Details" className='tooltip view-btn'><LuEye /></button>

                                                        <button
                                                            // onClick={() => handleApproveTuition(tuition)}
                                                            data-tip="Make Approve" className='tooltip approve-btn'> <IoCheckmarkSharp /></button>

                                                        {application.status === 'rejected' ? (
                                                            <button
                                                                onClick={() => handlePendingApplication(application)}
                                                                data-tip="Make Pending" className='tooltip edit-btn'><IoTimeOutline /> </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleRejectApplication(application)}
                                                                data-tip="Make Reject" className='tooltip reject-btn'> <IoMdClose /></button>
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

            <dialog ref={applicationDetailsModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg mb-4">Application Details</h3>
                    <div>
                        <ul className='space-y-4'>
                            <li>Subject : <span className='text-dark-08 font-medium'>{selectedApplication.subjectName}</span></li>
                            <li>Tutor Name : <span className='text-dark-08 font-medium'>{selectedApplication.tutorName}</span></li>
                            <li>Tutor Email : <span className='text-dark-08 font-medium'>{selectedApplication.tutorEmail}</span></li>
                            <li>Experience : <span className='text-dark-08 font-medium'>{selectedApplication.tutorExperience}</span></li>
                            <li>Qualifications : <span className='text-dark-08 font-medium'>{selectedApplication.tutorQualifications}</span></li>
                            <li>Expected Salary : <span className='text-dark-08 font-medium'>{selectedApplication.tutorSalary}</span></li>
                            <li>Status: <span className={`
                    ${selectedApplication.status === 'approved' ? 'text-green-500' : selectedApplication.status === 'pending' ? 'text-amber-500' : 'text-red-500'}`}>{(selectedApplication?.status || 'unknown').toUpperCase()}</span></li>
                            <li>Applied At : <span className='text-dark-08 font-medium'>{moment(selectedApplication.updatedAt).format('ll')} | {moment(selectedApplication.updatedAt).format('LTS')}</span></li>
                        </ul>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AppliedTutors;