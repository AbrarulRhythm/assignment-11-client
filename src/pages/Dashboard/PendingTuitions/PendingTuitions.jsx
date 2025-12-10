import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';

const PendingTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: tuitions = [] } = useQuery({
        queryKey: ['pendingTuitions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions?email=${user.email}&status=pending`);
            return res.data;
        }
    });

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
                                            <div className='text-start md:text-center'>
                                                No More Tituins
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
                                                <td>{tuition.Status}</td>
                                                <td>
                                                    <p className='w-[100px] lg:w-auto'>{moment(tuition.createdAt).format('ll')}</p>
                                                    <p className='w-[100px] lg:w-auto'>{moment(tuition.createdAt).format('LTS')}</p>
                                                </td>
                                                <td>---</td>
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

export default PendingTuitions;