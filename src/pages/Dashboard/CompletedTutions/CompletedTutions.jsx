import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { MdInfoOutline } from 'react-icons/md';

const CompletedTutions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: completedTuitions } = useQuery({
        queryKey: ['tutorApplicationStatus'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor-application?email=${user.email}&tutorApplicationStatus=completed`);
            return res.data;
        }
    });

    console.log(completedTuitions);

    return (
        <div className='dashboard'>
            <title>Completed Tutions</title>

            <DashboardTitle
                title='Completed Tutions'
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
                                {(!completedTuitions || completedTuitions.length === 0) ? (
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
                                    completedTuitions.map((tuition, index) => {
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

export default CompletedTutions;