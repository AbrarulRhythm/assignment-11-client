import React, { useRef, useState } from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import moment from 'moment';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiClock, FiEdit } from 'react-icons/fi';
import { LuEye } from 'react-icons/lu';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import DetailsModalTuition from '../../Shared/TuitionModals/DetailsModalTuition';
import EditModalTuition from '../../Shared/TuitionModals/EditModalTuition';
import Swal from 'sweetalert2';
import { IoCheckmarkSharp, IoSearchSharp } from "react-icons/io5";
import { IoIosLock, IoMdClose } from "react-icons/io";

const TuitionManagement = () => {
    const axiosSecure = useAxiosSecure();
    const detailsModalRef = useRef();
    const editModalRef = useRef();
    const [selectTuition, setSelectTuition] = useState([]);
    const [searchText, setSearchText] = useState('');
    const limit = 0;

    const { isLoading, data: tuitions = [], refetch } = useQuery({
        queryKey: ['tuitions', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions?searchText=${searchText}&limit=${limit}`);
            return res.data;
        }
    });

    // Handle Details Tuition
    const handleDetailsTuition = (tuition) => {
        setSelectTuition(tuition);
        detailsModalRef.current.showModal();
    }

    // Hnadle Edit Tuition
    const handleEditTuition = (tuition) => {
        setSelectTuition(tuition);
        editModalRef.current.showModal();
    }

    // Handle Delete Tuition
    const handleDeleteTuition = (tuitionID) => {
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

                axiosSecure.delete(`/tuitions/${tuitionID}/delete`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your tuition has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }

    // Update Tuition Status
    const updateTuitionStatus = (tuition, status) => {
        const statusInfo = { status };

        // Conditional confirmation messages
        const actionText =
            status === "rejected" || status === 'pending'
                ? "You want to reject this Tuition!"
                : "You want to approve this Tuition!";

        const confirmButtonText =
            status === "rejected" || status === 'pending'
                ? "Yes, reject!"
                : "Yes, approve!";

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
                axiosSecure.patch(`/tuitions/${tuition._id}/status/update`, statusInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh the data in the ui
                            refetch();

                            const titleMessage = status === 'approved'
                                ? `${tuition.subject} tuition has been approved.`
                                : `${tuition.subject} tuition request has been rejected.`;

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

    // Handle Approve Tuition
    const handleApproveTuition = (tuition) => {
        updateTuitionStatus(tuition, 'approved');
    }

    // Handle Reject Tuition
    const handleRejectTuition = (tuition) => {
        updateTuitionStatus(tuition, 'rejected');
    }

    return (
        <div className='dashboard'>
            <title>Tuition Management</title>

            <DashboardTitle
                title='Tuition Management'
            ></DashboardTitle>

            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6'>
                <h3 className='text-xl font-semibold text-dark-07'>Total Tuitions: {tuitions.length}</h3>
                <div className='relative w-full md:w-auto'>
                    <div className='flex'>
                        <div className='h-[50px] w-[50px] bg-white text-lg flex border-l border-t border-b border-dark-03 rounded-l-md items-center justify-center'>
                            <IoSearchSharp />
                        </div>
                        <input
                            onChange={(e) => setSearchText(e.target.value)}
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
                            <th>Class/Grade</th>
                            <th>Budget</th>
                            <th>Schedule</th>
                            <th>Status</th>
                            <th>Created At</th>
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
                                {(!tuitions || tuitions.length === 0) ? (
                                    <tr>
                                        <td colSpan='8' className='py-8 px-14'>
                                            <div className='text-center'>
                                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                                <span className='text-base'>No tuitions available at the moment.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    // Data Row
                                    tuitions.map((tuition, index) => {
                                        return (
                                            <tr key={tuition._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <p className='w-[150px]'>{tuition.name}</p>
                                                </td>
                                                <td>
                                                    <p className='w-[200px] lg:w-auto'>{tuition.subject}</p>
                                                </td>
                                                <td>
                                                    <p className='w-[170px] lg:w-auto'>Class/Grade: {tuition.class}</p>
                                                </td>
                                                <td>${tuition.budget}</td>
                                                <td>
                                                    <p className='w-[200px] lg:w-[230px]'>{tuition.schedule}</p>
                                                </td>
                                                <td>
                                                    <span className={tuition.status === 'approved' ? 'status-approved' : tuition.status === 'rejected' ? 'status-reject' : tuition.status === 'closed' ? 'status-closed' : 'status-pending'}>
                                                        {tuition.status === 'approved'
                                                            ? <><IoCheckmarkSharp className='text-sm' /> {tuition.status}</>
                                                            : tuition.status === 'rejected'
                                                                ? <><IoMdClose className='text-sm' /> {tuition.status} </>
                                                                : tuition.status === 'closed'
                                                                    ? <><IoIosLock className='text-sm' /> {tuition.status}</>
                                                                    : <><FiClock className='text-sm' /> {tuition.status}</>}
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className='w-[100px]'>{moment(tuition.createdAt).format('ll')}</p>
                                                    <p className='w-[100px]'>{moment(tuition.createdAt).format('LTS')}</p>
                                                </td>
                                                <td>
                                                    <div className='flex items-center justify-end gap-2'>
                                                        <button
                                                            onClick={() => handleDetailsTuition(tuition)}
                                                            data-tip="Details" className='tooltip view-btn'><LuEye /></button>
                                                        {tuition.status !== 'closed' && (
                                                            <>


                                                                {tuition.status === 'rejected' || tuition.status === 'pending' ?
                                                                    <button
                                                                        onClick={() => handleApproveTuition(tuition)}
                                                                        data-tip="Make Approve" className='tooltip approve-btn'> <IoCheckmarkSharp /></button>
                                                                    : <button
                                                                        onClick={() => handleRejectTuition(tuition)}
                                                                        data-tip="Make Reject" className='tooltip reject-btn'> <IoMdClose /></button>}
                                                                <button
                                                                    onClick={() => handleEditTuition(tuition)}
                                                                    data-tip="Edit" className='tooltip edit-btn'><FiEdit /></button>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteTuition(tuition._id)}
                                                            data-tip="Delete" className='tooltip delete-btn'><FaRegTrashAlt /></button>
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

            {/* Tuition Details Modal */}
            <DetailsModalTuition
                selectTuition={selectTuition}
                detailsModalRef={detailsModalRef}
            ></DetailsModalTuition>

            {/* Tuition Update Modal */}
            <EditModalTuition
                selectTuition={selectTuition}
                editModalRef={editModalRef}
                refetchTuitions={refetch}
            ></EditModalTuition>
        </div>
    );
};

export default TuitionManagement;