import React, { useEffect, useState } from 'react';
import SectionBanner from '../../components/SectionBanner/SectionBanner';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { MdInfoOutline } from 'react-icons/md';
import TuitionCard from '../Shared/TuitionCard/TuitionCard';
import { IoSearchSharp } from 'react-icons/io5';
import { useForm, useWatch } from 'react-hook-form';

const AllTuitions = () => {
    const axiosInstance = useAxios();
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [filterClasses, setFilterClasses] = useState('');
    const [filterSubject, setFilterSubject] = useState('');
    const [filterTutorGender, setFilterTutorGender] = useState('');
    const [sort, setSort] = useState('');
    const [order, setOrder] = useState('');
    const limit = 12;

    const { isLoading, data: responseData = { result: [], count: 0 } } = useQuery({
        queryKey: ['tuitions', searchText, currentPage, order, filterClasses, filterSubject, filterTutorGender],
        queryFn: async () => {
            const res = await axiosInstance.get(`/tuitions?searchText=${searchText}&skip=${currentPage * limit}&limit=${limit}&sort=${sort}&order=${order}&classes=${filterClasses}&subjects=${filterSubject}&tutorGender=${filterTutorGender}&status=approved`);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });
    const tuitions = responseData.result;
    const totalCount = responseData.count;

    // Total Page Count
    const numberOfPages = Math.ceil(totalCount / limit);
    const pages = [...Array(numberOfPages).keys()];

    // Pagination button handle
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    // Handle Sort
    const handleSelect = (e) => {
        const sortText = e.target.value;
        setSort(sortText.split('-')[0]);
        setOrder(sortText.split('-')[1]);
    }

    // Filter By Class
    const {
        register: classRegister,
        control
    } = useForm({
        defaultValues: {
            classes: []
        }
    });

    const watchedClasses = useWatch({
        control,
        name: "classes",
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (watchedClasses) {
                const classString = watchedClasses.join(',');
                setFilterClasses(classString);
            }
        }, 10);

        return () => clearTimeout(timeoutId);
    }, [watchedClasses, setFilterClasses]);

    // Filter By Subjects
    const {
        register: subjectRegister,
        control: subjectControl
    } = useForm({
        defaultValues: {
            subjects: []
        }
    });

    const watchedSubjects = useWatch({
        control: subjectControl,
        name: "subjects",
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (watchedSubjects) {
                const classString = watchedSubjects.join(',');
                setFilterSubject(classString);
            }
        }, 10);

        return () => clearTimeout(timeoutId);
    }, [watchedSubjects, setFilterSubject]);

    // Filter By Tutgor Gender
    const {
        register: tutorGenderRegister,
        control: tutorGenderControl
    } = useForm({
        defaultValues: {
            tutorGender: []
        }
    });

    const watchedTutorGender = useWatch({
        control: tutorGenderControl,
        name: "tutorGender",
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (watchedTutorGender) {
                const tutorGenderString = watchedTutorGender.join(',');
                setFilterTutorGender(tutorGenderString);
            }
        }, 10);

        return () => clearTimeout(timeoutId);
    }, [watchedTutorGender, setFilterSubject]);

    const classList = ["HSC", "SSC", "9", "8", "7", "6", "5"];
    const subjectList = ["Math", "Bangla", "English", "ICT", "Higher Math", "Accounting", "Finance", "Social Work", "Management"];

    return (
        <>
            <title>All Tuitions - eTuitionBd</title>

            <SectionBanner
                title='All Tuitions'
                currentLink='All Tuitions'
            ></SectionBanner>

            <section className='pt-10 pb-4 lg:pt-20 lg:pb-14'>
                <div className='container'>
                    <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12'>
                        <h3 className='text-xl font-semibold text-dark-07'>Total Tuitions: {totalCount}</h3>
                        <div className='relative w-full md:w-auto'>
                            <div className='flex flex-col md:flex-row items-start mditems-center gap-3'>
                                <select onChange={handleSelect} defaultValue="" className="select h-[50px] outline-0 focus:border-theme-primary">
                                    <option value=''>Sort by  budget </option>
                                    <option value={"budget-desc"}>Budget : High - Low</option>
                                    <option value={"budget-asc"}>Budget : Low - High</option>
                                </select>

                                <div className='flex'>
                                    <div className='h-[50px] w-[50px] bg-white text-lg flex border-l border-t border-b border-dark-03 rounded-l-md items-center justify-center'>
                                        <IoSearchSharp />
                                    </div>
                                    <input
                                        onChange={(e) => {
                                            setSearchText(e.target.value);
                                            setCurrentPage(0);
                                        }}
                                        type="text" className='w-full md:w-auto bg-white border border-dark-03 rounded-r-md py-3 pl-4 pr-5 focus:outline-0 focus:border-theme-primary h-[50px]' placeholder='Search...' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-wrap -mx-3'>
                        <div className='w-auto md:w-3/12 px-3'>
                            <div className='border border-dark-03 rounded-md mb-6'>
                                <h4 className='p-4 border-b border-dark-03'>Class</h4>
                                <form className='px-4 py-5'>
                                    {classList.map(cls => (
                                        <label key={cls} className='flex gap-2 w-full cursor-pointer hover:bg-dark-02 px-2 py-2 rounded-md text-sm'>
                                            <input
                                                value={cls}
                                                {...classRegister("classes")}
                                                type="checkbox" className="checkbox checkbox-sm" />
                                            {cls}
                                        </label>
                                    ))}
                                </form>
                            </div>
                            <div className='border border-dark-03 rounded-md mb-6'>
                                <h4 className='p-4 border-b border-dark-03'>Tutor Gender</h4>
                                <form className='px-4 py-5'>
                                    <label className='flex gap-2 w-full cursor-pointer hover:bg-dark-02 px-2 py-2 rounded-md text-sm'>
                                        <input
                                            value='Male'
                                            {...tutorGenderRegister("tutorGender")}
                                            type="checkbox" className="checkbox checkbox-sm" />
                                        Male
                                    </label>
                                    <label className='flex gap-2 w-full cursor-pointer hover:bg-dark-02 px-2 py-2 rounded-md text-sm'>
                                        <input
                                            value='Female'
                                            {...tutorGenderRegister("tutorGender")}
                                            type="checkbox" className="checkbox checkbox-sm" />
                                        Female
                                    </label>
                                </form>
                            </div>
                            <div className='border border-dark-03 rounded-md'>
                                <h4 className='p-4 border-b border-dark-03'>Subject</h4>
                                <form className='px-4 py-5'>
                                    {
                                        subjectList.map((subject, index) => {
                                            return (
                                                <label key={index} className='flex gap-2 w-full cursor-pointer hover:bg-dark-02 px-2 py-2 rounded-md text-sm'>
                                                    <input
                                                        value={subject}
                                                        {...subjectRegister("subjects")}
                                                        type="checkbox" className="checkbox checkbox-sm" />
                                                    {subject}
                                                </label>
                                            )
                                        })
                                    }
                                </form>
                            </div>
                        </div>
                        <div className='w-auto md:w-9/12 px-3'>
                            <div className='flex flex-wrap -mx-3'>
                                {/* Loading State */}
                                {isLoading ? (
                                    <div className='text-center mx-auto'>
                                        <span className="loading loading-bars loading-xl"></span>
                                    </div>
                                ) : (
                                    <>
                                        {/* Empty Satte */}
                                        {(!tuitions || tuitions.length === 0) ? (
                                            <div className='text-center mx-auto'>
                                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                                <span className='text-base'>No tuitions available at the moment.</span>
                                            </div>
                                        ) : (
                                            // Data Row
                                            tuitions.map(tuition => {
                                                return (
                                                    <TuitionCard
                                                        key={tuition._id}
                                                        tuition={tuition}
                                                        flexClasses='md:w-6/12 lg:w-4/12'
                                                    ></TuitionCard>
                                                )
                                            })
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {!(!tuitions || tuitions.length === 0) && (
                    <div className='text-center'>
                        <div className="join mt-6">
                            {/* Prev Button */}
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 0}
                                className="join-item btn">Prev</button>

                            {
                                pages.map(pageNumber => {
                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => setCurrentPage(pageNumber)}
                                            className={`join-item btn ${currentPage === pageNumber ? 'bg-theme-primary text-white' : ''}`}>
                                            {pageNumber + 1}
                                        </button>
                                    )
                                })
                            }

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                disabled={currentPage === numberOfPages - 1}
                                className="join-item btn">Next</button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default AllTuitions;