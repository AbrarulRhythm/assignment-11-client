import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import SectionBanner from '../../components/SectionBanner/SectionBanner';
import { IoLocationOutline } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';
import { FiPhone } from 'react-icons/fi';
import moment from 'moment';

const TutorDetails = () => {
    const { id: tutorId } = useParams();
    const axiosInstance = useAxios();

    const { isLoading, data: tutorDetails = null } = useQuery({
        queryKey: ['tutor_details', tutorId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/tutors/${tutorId}`);
            return res.data;
        }
    });

    return (
        <div>
            <title>{tutorDetails ? tutorDetails.displayName : 'Tutor Details'}</title>

            <SectionBanner
                title='Tutor Details'
                currentLink='Tutor Details'
            ></SectionBanner>

            <div className='py-10 lg:py-20'>
                <div className='container'>
                    {/* Loading State */}
                    {isLoading ? (
                        <div className='text-center mx-auto'>
                            <span className="loading loading-bars loading-xl"></span>
                        </div>
                    ) : (
                        <>
                            {/* Error State */}
                            {!tutorDetails ? (
                                <div className='text-center'>
                                    <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                    <span className='text-base'>No tuition details available at the moment.</span>
                                </div>
                            ) : (
                                <div className='flex flex-wrap -mx-3'>
                                    <div className='w-full md:w-5/12 lg:w-4/12 px-3 mb-6 lg:mb-0'>
                                        <div className='p-6 rounded-md bg-content-bg'>
                                            <img src={tutorDetails.photoURL} alt="Tutor Image" className='w-full h-[250px] md:h-[200px] lg:h-[235px] 2xl:h-[300px] object-cover rounded-md mb-4' />
                                            <h2 className='text-2xl text-dark-09 font-semibold text-center mb-4'>{tutorDetails.displayName}</h2>
                                            <ul className='space-y-3 flex flex-col justify-center items-center'>
                                                {tutorDetails.location && <li className='flex items-center gap-2'><IoLocationOutline /> {tutorDetails.location}</li>}
                                                {tutorDetails.email && <li className='flex items-center gap-2'><TfiEmail /> {tutorDetails.email}</li>}
                                                {tutorDetails.phone && <li className='flex items-center gap-2'><FiPhone /> {tutorDetails.phone}</li>}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='w-full md:w-7/12 lg:w-8/12 px-3'>
                                        <div className='bg-content-bg rounded-md'>
                                            <h3 className='text-dark-09 font-semibold text-[20px] pt-6 md:pt-7 pl-6 md:pl-7'>Tutor Info</h3>
                                            {tutorDetails.about && <p className='mb-6'>{tutorDetails.about}</p>}
                                            <div className=' flex flex-col lg:flex-row items-start md:items-center justify-between'>
                                                <ul className='space-y-4 w-full lg:w-[50%] p-6 md:p-7'>
                                                    <li className='flex items-center justify-between'>Company: <span className='text-dark-09 font-medium'>{tutorDetails.company ? tutorDetails.company : '---'}</span></li>
                                                    <li className='flex items-center justify-between'>Experience: <span className='text-dark-09 font-medium'>{tutorDetails.experience ? tutorDetails.experience : '---'}</span></li>
                                                    <li className='flex items-center justify-between'>Rate: <span className='text-dark-09 font-medium'>{tutorDetails.rate ? `${tutorDetails.rate}/Month` : '---'}</span></li>
                                                </ul>
                                                <ul className='space-y-4 w-full lg:w-[50%] px-6 pb-6 lg:p-6 md:p-7 md:pt-0'>
                                                    <li className='flex items-center justify-between'>Subjects: <span className='text-dark-09 font-medium'>{tutorDetails.subjects ? tutorDetails.subjects : '---'}</span></li>
                                                    <li className='flex items-center justify-between'>Class: <span className='text-dark-09 font-medium'>{tutorDetails.class ? tutorDetails.class : '---'}</span></li>
                                                    <li className='flex items-center justify-between'>Joining Date: <span className='text-dark-09 font-medium'>{moment(tutorDetails.createdAt).format('ll')}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorDetails;