import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { Link } from 'react-router';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi2';
import blogImage1 from '../../../assets/blog-01.png';
import blogImage2 from '../../../assets/blog-02.png';
import blogImage3 from '../../../assets/blog-03.png';
import Logo from '../../../components/Logo/Logo';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaVimeoV, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const blogData = [
    {
        id: 1,
        image: blogImage1,
        title: 'Best Your Business',
        metaData: '02 Apr 2025'
    },
    {
        id: 2,
        image: blogImage2,
        title: 'Keep Your Business',
        metaData: '14 Oct 2025'
    },
    {
        id: 3,
        image: blogImage3,
        title: 'Nice Your Business',
        metaData: '09 Nov 2025'
    }
]

const Footer = () => {
    return (
        <>
            <div className='container'>
                <div className='footer-top py-10 md:py-12 lg:py-16 border-b border-dark-07/24'>
                    <div className='flex flex-wrap -mx-3 items-center'>
                        <div className='w-full lg:w-6/12 px-3 mb-6 lg:mb-0'>
                            <h1 className='text-white text-2xl md:text-4xl lg:text-[38px] font-semibold mb-2'>Still You Need Our <span className='text-theme-primary'>Support</span> ?</h1>
                            <p>Don’t wait make a smart & logical quote here. Its pretty easy.</p>
                        </div>
                        <div className='w-full lg:w-6/12 px-3'>
                            <form className='relative pl-0 lg:pl-10'>
                                <input type="email" className='w-full bg-dark-07/10 h-[65px] md:h-[70px] border border-transparent py-3 px-6 rounded-md focus:outline-0 focus:border-theme-primary' placeholder='Enter your email here' required />
                                <button type='submit' className='h-[60px] md:h-[70px] bg-theme-primary text-white rounded-md px-6 sticky mt-4 md:mt-0 w-full md:w-auto md:absolute right-0'>Subscribe Now</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='footer-middle'>
                    <div className='flex flex-wrap -mx-3'>
                        <div className='w-full md:w-6/12 lg:w-4/12 px-3'>
                            <div className='py-4 lg:py-11'>
                                <h3 className='text-xl font-semibold mb-3 text-white'>About us</h3>
                                <p>orporate clients and leisure travelers has been relying on Groundlink for dependable safe, and professional chauffeured car end service in major cities across World.</p>
                                <ul className='space-y-2 mt-4 text-sm'>
                                    <li className='flex items-center gap-2'><IoLocationOutline className='text-xl' /> Level-4, 34, Awal Centre, Banani, Dhaka</li>
                                    <li className='flex items-center gap-2'><TfiEmail /> support@etuitionbd.com</li>
                                    <li className='flex items-center gap-2'><FiPhone /> +880 1425-860275</li>
                                    <li>(Available : 10:00am to 07:00pm)</li>
                                </ul>
                            </div>
                        </div>
                        <div className='w-full md:w-6/12 lg:w-2/12 px-3'>
                            <div className='py-4 lg:py-11 lg:ml-7'>
                                <h3 className='text-xl font-semibold mb-3 text-white'>Quick Links</h3>
                                <ul>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> Tutors</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> Partner</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> Room-Details</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> Gallery</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='w-full md:w-6/12 lg:w-3/12 px-3'>
                            <div className='py-4 lg:py-11 lg:ml-14'>
                                <h3 className='text-xl font-semibold mb-3 text-white'>Company</h3>
                                <ul>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> About Us</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> Our Mission</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> Meet the Team</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> Join with Us</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className='hover:text-theme-primary duration-300 inline-flex items-center gap-2 py-2' ><HiOutlineChevronDoubleRight className='text-lg' /> Blog & News</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='w-full md:w-6/12 lg:w-3/12 px-3'>
                            <div className='py-4 lg:py-11'>
                                <h3 className='text-xl font-semibold mb-3 text-white'>Recent Post</h3>
                                <ul className='space-y-4'>
                                    {
                                        blogData.map(blog => {
                                            return (
                                                <li key={blog.id}>
                                                    <div className='flex items-center gap-3'>
                                                        <img src={blog.image} className='w-14 h-[50px] object-cover rounded-sm' alt="blog image" />
                                                        <div>
                                                            <span className='text-[12px] block mb-px'>{blog.metaData}</span>
                                                            <h5 className='text-white text-sm font-medium hover:text-theme-primary duration-300'><Link to='/'>{blog.title}</Link></h5>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='footer-bottom pt-10 pb-4'>
                    <div className='flex flex-wrap -mx-3 items-center'>
                        <div className='w-full lg:w-3/12 px-3 mb-6'>
                            <Logo
                                color='text-white'
                            ></Logo>
                        </div>
                        <div className='w-full lg:w-5/12 px-3 text-start lg:text-center mb-6'>
                            <p>Copyright © 2024 by <Link to='/' className='font-semibold hover:text-theme-primary duration-200'>eTuitionBd</Link>. All Rights Reserved.</p>
                        </div>
                        <div className='w-full lg:w-4/12 px-3 mb-6'>
                            <div className='flex items-center justify-start lg:justify-end'>
                                <ul className='flex items-center gap-2'>
                                    <li>
                                        <a href='#' className='w-10 h-10 bg-dark-07/10 flex items-center justify-center rounded-sm hover:text-white hover:bg-theme-primary duration-300'>
                                            <FaFacebookF />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#' className='w-10 h-10 bg-dark-07/10 flex items-center justify-center rounded-sm hover:text-white hover:bg-theme-primary duration-300'>
                                            <FaXTwitter />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#' className='w-10 h-10 bg-dark-07/10 flex items-center justify-center rounded-sm hover:text-white hover:bg-theme-primary duration-300'>
                                            <FaInstagram />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#' className='w-10 h-10 bg-dark-07/10 flex items-center justify-center rounded-sm hover:text-white hover:bg-theme-primary duration-300'>
                                            <FaYoutube />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#' className='w-10 h-10 bg-dark-07/10 flex items-center justify-center rounded-sm hover:text-white hover:bg-theme-primary duration-300'>
                                            <FaLinkedinIn />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#' className='w-10 h-10 bg-dark-07/10 flex items-center justify-center rounded-sm hover:text-white hover:bg-theme-primary duration-300'>
                                            <FaVimeoV />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;