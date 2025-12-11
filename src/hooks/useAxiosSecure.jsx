import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {
    const { loading, isTokenSet, userSignOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading || !isTokenSet) {
            return;
        }

        // Request Interceptor
        const reqInterceprot = axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            return config;
        });

        // Response Interceptor
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {

            const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                userSignOut()
                    .then(() => {
                        navigate('/login');
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Access denied. Please sign in again.",
                        });
                    })
                    .catch(error => {
                        toast.error(error.message);
                    })
            }

            return Promise.reject(error);
        });

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceprot);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    }, [userSignOut, navigate, loading, isTokenSet]);

    return axiosSecure;
};

export default useAxiosSecure;