import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUserID = () => {
    const { user, isTokenSet } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: id = null } = useQuery({
        queryKey: ['user-id', user?.email],
        enabled: !!user?.email && isTokenSet,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/id`);
            return res.data?.id || null;
        }
    });

    return { isLoading, id };
};

export default useUserID;