import React, { useRef, useState } from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import { FiClock, FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { MdInfoOutline } from 'react-icons/md';
import DetailsModalTuition from '../../Shared/TuitionModals/DetailsModalTuition';
import EditModalTuition from '../../Shared/TuitionModals/EditModalTuition';
import Swal from 'sweetalert2';

const PendingTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const detailsModalRef = useRef();
    const editModalRef = useRef();
    const [selectTuition, setSelectTuition] = useState([]);

    const { isLoading, data: tuitions = [], refetch } = useQuery({
        queryKey: ['pendingTuitions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions?email=${user.email}&status=pending`);
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

    return (
        <div className='dashboard'>
            <title>Pending Tuitions</title>

            <DashboardTitle
                title='Pending Tuitions'
            ></DashboardTitle>


            <div className="overflow-x-auto bg-white border border-dark-03 rounded-xl">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
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
                                                    <p className='w-[200px] lg:w-auto'>{tuition.subject}</p>
                                                </td>
                                                <td>
                                                    <p className='w-[170px] lg:w-auto'>Class/Grade: {tuition.class}</p>
                                                </td>
                                                <td>${tuition.budget}</td>
                                                <td>
                                                    <p className='w-[200px] lg:w-auto'>{tuition.schedule}</p>
                                                </td>
                                                <td>
                                                    <span className='status-pending'>
                                                        <FiClock className='text-sm' />
                                                        {tuition.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className='w-[100px]'>{moment(tuition.createdAt).format('ll')}</p>
                                                    <p className='w-[100px]'>{moment(tuition.createdAt).format('LTS')}</p>
                                                </td>
                                                <td>
                                                    <div className='flex items-center gap-2'>
                                                        <button
                                                            onClick={() => handleDetailsTuition(tuition)}
                                                            data-tip="Details" className='tooltip view-btn'><LuEye /></button>
                                                        <button
                                                            onClick={() => handleEditTuition(tuition)}
                                                            data-tip="Edit" className='tooltip edit-btn'><FiEdit /></button>
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

export default PendingTuitions;