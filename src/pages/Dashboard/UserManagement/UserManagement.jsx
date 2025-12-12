import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdInfoOutline } from 'react-icons/md';
import moment from 'moment';
import Swal from 'sweetalert2';
import { FaRegTrashAlt, FaUserShield } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { LuEye, LuShieldOff } from 'react-icons/lu';
import { Link } from 'react-router';

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Handle Delete User
    const handleDeleteUser = (userID) => {
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

                axiosSecure.delete(`/users/${userID}/delete`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }

    return (
        <div className='dashboard'>
            <title>User Management</title>

            <DashboardTitle
                title='User Management'
            ></DashboardTitle>

            <div className="overflow-x-auto bg-white border border-dark-03 rounded-xl">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Other Actions</th>
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
                                {(!users || users.length === 0) ? (
                                    <tr>
                                        <td colSpan='8' className='py-8 px-14'>
                                            <div className='text-center'>
                                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                                <span className='text-base'>No users available at the moment.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    // Data Row
                                    users.map((user, index) => {
                                        return (
                                            <tr key={user._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <p className='w-[150px]'>{user.displayName}</p>
                                                </td>
                                                <td>
                                                    <div className='w-12 h-12'>
                                                        <img src={user?.photoURL} alt="Profile Pic" className='w-12 h-12 rounded-full object-cover bg-gray-300' />
                                                    </div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{
                                                    user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''
                                                }</td>
                                                <td>
                                                    <p className='w-[100px]'>{moment(user.createdAt).format('ll')}</p>
                                                    <p className='w-[100px]'>{moment(user.createdAt).format('LTS')}</p>
                                                </td>
                                                <td>
                                                    <div className='flex items-center gap-2'>
                                                        <Link to={`/dashboard/user-profile/${user._id}`}
                                                            data-tip="Details" className='tooltip view-btn'><LuEye /></Link>
                                                        <Link to={`/dashboard/profile-settings/${user._id}`}
                                                            data-tip="Edit" className='tooltip edit-btn'><FiEdit /></Link>
                                                        <button
                                                            onClick={() => handleDeleteUser(user._id)}
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
        </div>
    );
};

export default UserManagement;