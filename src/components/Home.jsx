import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination,Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { axiosCommon } from '../hooks/useAxiosCommon';
import LoadingSpinner from './LoadingSpinner';
import { FaArrowRight } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import './text.css'
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
    console.log(firstFourPosts)
    return (
        <div>
            <div className="bg-black h-[650px] mt-0">
            {/* banner */}
            <div className='pt-20'>
               <div>
                  <h1 className="text-white  font-semibold text-8xl text-center">Find Best <span className="text-red-800 ">Travel BLOG</span></h1>
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
        modules={[EffectFade, Navigation, Pagination,Autoplay]}
        className="mySwiper h-[400px] w-full mt-10"
      >
        <SwiperSlide>
          <img className='w-full h-[400px] object-cover' src="image/swithzerland.avif" />
        </SwiperSlide>
        <SwiperSlide>
        <img  className='w-full h-[400px] object-cover' src="image/2.avif" />
        </SwiperSlide>
        <SwiperSlide>
        <img  className='w-full h-[400px] object-cover' src="image/3.avif" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='w-full h-[400px] object-cover' src="image/4.avif" />
        </SwiperSlide>
      </Swiper></div>
               </div>
            </div>
        </div>
        {/* review */}
        <div className='mt-10 flex justify-center items-center gap-8'>
           <div className='grid grid-cols-2 gap-2'>
            {
                firstFourPosts.map(post=> <div className="card z-0 bg-base-100 image-full w-72 shadow-xl " key={post._id}>
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
                        <button className="btn bg-transparent border-none font-bold text-2xl text-white"><FaArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>)
            }
           </div>
           <div id='main' className='text-8xl font-bold'>Find <br /> Your <br /> Favourite <br /> Destination</div>
        </div>
        <div className='mt-8'>
            <h1 className='text-4xl m-4 text-center'>Our Collaborated Agency</h1>
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