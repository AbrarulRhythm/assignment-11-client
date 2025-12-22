import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Link } from 'react-router';
import blogImage1 from '../../../assets/blog-01.png';
import blogImage2 from '../../../assets/blog-02.png';
import blogImage3 from '../../../assets/blog-03.png';
import { motion } from 'framer-motion';

const blogData = [
    {
        id: 1,
        image: blogImage1,
        category: 'Student Success',
        title: 'Write Better Briefs, Get Better Bids Description',
        desc: 'Learn how to describe your project to attract the highest-rated tutors on our platform.',
        publish_date: '27 August',
        read: '12 Mins Read',
        views: '23K Views'
    },
    {
        id: 2,
        image: blogImage2,
        category: 'Tutor Hub',
        title: 'How to Win Every Bid Description',
        desc: "Stand out from the crowd with these professional tips for crafting winning proposals to students.",
        publish_date: '26 August',
        read: '12 Mins Read',
        views: '23K Views'
    },
    {
        id: 3,
        image: blogImage3,
        category: 'Subject Spotlights',
        title: 'Safe Learning in Our Marketplace Description',
        desc: 'Essential tips for students and tutors to ensure every academic collaboration is secure and successful.',
        publish_date: '18 August',
        read: '12 Mins Read',
        views: '23K Views'
    }
];

const LatestBlog = () => {
    return (
        <div className='container'>
            <motion.div
                initial={{ opacity: 0, y: 140 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <SectionTitle
                    title='Latest News'
                    subTitle='Our Recent Posts'
                ></SectionTitle>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 140 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className='flex flex-wrap -mx-3'>
                {
                    blogData.map((data) => {
                        return (
                            <div key={data.id} className='w-full md:w-6/12 lg:w-4/12 px-3 mb-6'>
                                <div className='blog-card-wrapper h-full bg-white border border-dark-03 rounded-md group'>
                                    <div className='blog-image rounded-t-md overflow-hidden'>
                                        <img src={data.image} className='w-full rounded-t-md group-hover:scale-110 duration-300' alt='Blog Image' />
                                    </div>
                                    <div className='p-6'>
                                        <Link to='/' className='text-ps-primary hover:underline font-medium text-sm inline-block mb-3'>{data.category}</Link>
                                        <h4 className='text-xl font-semibold text-dark-09 hover:text-ps-primary duration-300 mb-4'>
                                            <Link to=''>{data.title}</Link>
                                        </h4>
                                        <p>{data.desc}</p>
                                        <div className='blog-meta mt-6'>
                                            <ul className='text-sm'>
                                                <li>{data.publish_date}</li>
                                                <li>{data.read}</li>
                                                <li>{data.views}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 140 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                data-aos="fade-up" data-aos-duration="1000" className='mt-6 text-center'>
                <Link to='/' className='button button-fill'>Read More Blogs</Link>
            </motion.div>
        </div>
    );
};

export default LatestBlog;