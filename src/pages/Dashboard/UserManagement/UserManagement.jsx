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

    // Update User Role
    const updateUserRole = (user, role) => {
        const roleInfo = { role };

        // Conditional confirmation messages
        const actionText =
            role === "admin"
                ? "You want to approve this rider and make them an Admin!"
                : "You want to remove Admin access from this user!";

        const confirmButtonText =
            role === "admin"
                ? "Yes, approve!"
                : "Yes, remove!";

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
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh the data in the ui
                            refetch();

                            const titleMessage = role === 'admin'
                                ? `${user.displayName} marked as an Admin`
                                : `${user.displayName} is no longer an Admin`;

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

    // Handle Make Admin
    const handleMakeAdmin = (user) => {
        updateUserRole(user, 'admin');
    }

    // Handle Remove Admin
    const handleRemoveAdmin = (user) => {
        updateUserRole(user, 'student');
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
                            <th>Admin Actions</th>
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
                                                    {user.role === 'admin' ?
                                                        <button
                                                            onClick={() => handleRemoveAdmin(user)}
                                                            data-tip="Remove Admin" className='tooltip text-sm font-medium py-2 px-2 rounded-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white duration-300 cursor-pointer'><LuShieldOff className='text-lg' /></button>
                                                        : <button
                                                            onClick={() => handleMakeAdmin(user)}
                                                            data-tip="Make Admin" className='tooltip text-sm font-medium py-2 px-2 rounded-sm border border-green-600 text-green-600 hover:bg-green-600 hover:text-white duration-300 cursor-pointer'><FaUserShield className='text-lg' /></button>}
                                                </td>
                                                <td>
                                                    <div className='flex items-center gap-2'>
                                                        <button
                                                            data-tip="Details" className='tooltip view-btn'><LuEye /></button>
                                                        <button
                                                            data-tip="Edit" className='tooltip edit-btn'><FiEdit /></button>
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