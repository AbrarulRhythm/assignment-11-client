import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user, isTokenSet } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: role = 'student' } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email && isTokenSet,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data?.role || 'student';
        }
    });

    return { isLoading, role };
};

export default useRole;