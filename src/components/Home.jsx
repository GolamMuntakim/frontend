import React, { useRef, useState } from 'react';
import {motion, transform} from "framer-motion" ;
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { axiosCommon } from '../hooks/useAxiosCommon';
import LoadingSpinner from './LoadingSpinner';
import { FaArrowRight } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import './text.css'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
const Home = () => {
    const { data: posts = [], isLoading } = useQuery({
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/get-post`)
            return data
        },
        enabled: true
    })

    if (isLoading) return <LoadingSpinner />
    const firstFourPosts = posts.slice(0, 4);
   const fadeIn = (direction, delay) =>{
    return {
        hidden:{
            y:direction === 'up' ? 80 : direction === 'down' ? -20 : 0,
            x:direction === 'left' ? 50 : direction === 'right' ? -40 : 0,
        },
        show:{
            y:0,
            x:0,
            opacity : 1,
            transition:{
                type:'tween',
                duration:1.2,
                delay:delay,
                ease : [0.25, 0.25, 0.25,0.75]
            }
        }
    }
   }
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className="bg-black h-[850px] lg:h-[650px] mt-0">
                {/* banner */}
                <div className='pt-20'>
                    <div >
                        <motion.h1 
                        variants={fadeIn("up" , 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once:false, amount:0.7}}
                        className="text-white z-30  font-semibold text-8xl text-center">Find Best <span className="text-red-800 ">Travel BLOG</span></motion.h1>

                        <div> <Swiper
                            spaceBetween={30}
                            effect={'fade'}
                            navigation={true}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            modules={[EffectFade, Navigation, Pagination, Autoplay]}
                            className="mySwiper h-[300px] lg:h-[400px] w-full mt-10 "
                        >
                            <SwiperSlide>
                                <img className='w-full h-[400px] object-cover' src="image/swithzerland.avif" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className='w-full h-[400px] object-cover' src="image/2.avif" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className='w-full h-[400px] object-cover' src="image/3.avif" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className='w-full h-[400px] object-cover' src="image/4.avif" />
                            </SwiperSlide>
                        </Swiper></div>
                    </div>
                </div>
            </div>
            {/* review */}
            <div className='mt-20 flex  justify-center items-center gap-8'>
                <div
                 className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                    {
                        firstFourPosts.map(post => 
                        <div className="card z-0 bg-base-100 image-full w-72 shadow-xl " key={post._id}>
                            <figure>
                                <img
                                    src={post?.image}
                                    alt="Shoes"

                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{post?.title}</h2>
                                <p>{post?.location}</p>
                                <div className="card-actions justify-end">
                                    <Link  to={`/postDetails/${post._id}`} className="btn bg-transparent border-none font-bold text-2xl text-white"><FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
                <motion.div
                 id='main'
                 variants={fadeIn("left" , 0.3)}
                 initial="hidden"
                 whileInView={"show"}
                 viewport={{once:false, amount:0.7}}
                  className='text-8xl font-bold hidden lg:flex '>Find <br /> Your <br /> Favourite <br /> Destination</motion.div>
            </div>
            <div className='mt-8'>
                <motion.h1
                   variants={fadeIn("up" , 0.1)}
                   initial="hidden"
                   whileInView={"show"}
                   viewport={{once:false, amount:0.7}}
                 className='text-4xl m-4 text-center'>Our Collaborated Agency</motion.h1>
                <Marquee>
                    <div className='bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>Bd Travelers</h1>
                    </div>
                    <div className='m-2 bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>Gontobbo</h1>
                    </div>
                    <div className='m-2 bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>Dubai Travel</h1>
                    </div>
                    <div className='m-2 bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>Asia Travel</h1>
                    </div>
                    <div className='m-2 bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>Safe Travel</h1>
                    </div>
                    <div className='m-2 bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>Family Tour</h1>
                    </div>
                    <div className='m-2 bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>Couple Travel</h1>
                    </div>
                    <div className='m-2 bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>ABY Limited</h1>
                    </div>
                    <div className='m-2 bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>South Asia Traveler's</h1>
                    </div>
                    <div className='m-2 bg-slate-700 p-2 rounded-lg text-white'>
                        <h1>Destination Bd Ltd</h1>
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default Home;