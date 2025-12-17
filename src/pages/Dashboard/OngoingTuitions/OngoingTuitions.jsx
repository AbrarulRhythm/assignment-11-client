import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import { MdInfoOutline } from 'react-icons/md';
import moment from 'moment';
import { IoCheckmarkSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const OngoingTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: ongoingTuitions, refetch } = useQuery({
        queryKey: ['tutorApplicationStatus'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor-application?email=${user.email}&tutorApplicationStatus=approved`);
            return res.data;
        }
    });

    const handleCompleateTuition = (tuition, status) => {
        const statusInfo = { status };

        Swal.fire({
            title: "Are you sure?",
            text: 'You want to compleate this Tuition!',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: 'Yes, compleate'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/tutor-application/${tuition._id}/status/update`, statusInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh the data in the ui
                            refetch();

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${tuition.subject} tuition has been completed.`,
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='deshboard'>
            <title>Ongoing Tuitions</title>

            <DashboardTitle
                title='Ongoing Tuitions'
            ></DashboardTitle>

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
                                {(!ongoingTuitions || ongoingTuitions.length === 0) ? (
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
                                    ongoingTuitions.map((tuition, index) => {
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
                                                    <p className='w-[100px]'>{moment(tuition.createdAt).format('ll')}</p>
                                                    <p className='w-[100px]'>{moment(tuition.createdAt).format('LTS')}</p>
                                                </td>
                                                <td>
                                                    {tuition.tutorApplicationStatus !== 'Completed' ? (
                                                        <button
                                                            onClick={() => handleCompleateTuition(tuition, 'completed')}
                                                            data-tip="Make Completed" className='tooltip approve-btn'> <IoCheckmarkSharp /></button>
                                                    ) : (
                                                        <div>---</div>
                                                    )}
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
        </div>
    );
};

export default OngoingTuitions;