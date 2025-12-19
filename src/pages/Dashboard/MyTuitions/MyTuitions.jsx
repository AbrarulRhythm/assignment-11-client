import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import moment from 'moment';
import { LuEye } from 'react-icons/lu';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { IoCheckmark } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { MdInfoOutline } from "react-icons/md";

const MyTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: responseData = { result: [] }, } = useQuery({
        queryKey: ['approvedTuitions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions?email=${user.email}&status=approved`);
            return res.data;
        }
    });
    const tuitions = responseData.result;

    return (
        <div className='dashboard'>
            <title>My Tuitions</title>

            <DashboardTitle
                title='My Tuitions'
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
                                                    <span className={`${tuition.status === 'approved' ? 'status-approved' : 'status-reject'}`}>
                                                        {tuition.status === 'approved' ? <IoCheckmark className='text-[15px]' /> : <CgClose className='text-[15px]' />}
                                                        {tuition.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className='w-[100px] lg:w-auto'>{moment(tuition.createdAt).format('ll')}</p>
                                                    <p className='w-[100px] lg:w-auto'>{moment(tuition.createdAt).format('LTS')}</p>
                                                </td>
                                                <td>
                                                    <div className='flex items-center gap-2'>
                                                        <button data-tip="Details" className='tooltip view-btn'><LuEye /></button>
                                                        <button data-tip="Edit" className='tooltip edit-btn'><FiEdit /></button>
                                                        <button data-tip="Delete" className='tooltip delete-btn'><FaRegTrashAlt /></button>
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
        </div>
    );
};

export default MyTuitions;