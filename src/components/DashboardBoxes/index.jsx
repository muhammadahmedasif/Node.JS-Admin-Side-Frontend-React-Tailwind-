import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { GoGift } from "react-icons/go";
import { IoStatsChart } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { SiProducthunt } from "react-icons/si";


function DashboardBoxes() {
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='text-white bg-blue-500 py-4 px-2 gap-4 flex rounded-md items-center box'>
                        <GoGift className='text-[30px]'/>
                        <div className='info w-[70%]'>
                            <h3 className='text-[15px] font-[600]'>
                                New Orders
                            </h3>
                            <p className='text-[19px] font-[700]'>
                                1,390
                            </p>
                        </div>
                        <IoStatsChart className='text-[40px]'/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-white bg-green-800 py-4 px-2 gap-4 flex rounded-md items-center box'>
                        <AiOutlinePieChart className='text-[30px]'/>
                        <div className='info w-[70%]'>
                            <h3 className='text-[15px] font-[600]'>
                                Sales
                            </h3>
                            <p className='text-[19px] font-[700]'>
                                57,890
                            </p>
                        </div>
                        <IoStatsChart className='text-[40px]'/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-white !bg-purple-700 py-4 px-2 gap-4 flex rounded-md items-center box'>
                        <BsBank className='text-[30px]'/>
                        <div className='info w-[70%]'>
                            <h3 className='text-[15px] font-[600]'>
                                Reveneu
                            </h3>
                            <p className='text-[19px] font-[700]'>
                                12,390
                            </p>
                        </div>
                        <IoStatsChart className='text-[40px]'/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-white !bg-blue-900 py-4 px-2 gap-4 flex rounded-md items-center box'>
                        <SiProducthunt className='text-[30px]'/>
                        <div className='info w-[70%]'>
                            <h3 className='text-[15px] font-[600]'>
                                Total Products
                            </h3>
                            <p className='text-[19px] font-[700]'>
                                1,390
                            </p>
                        </div>
                        <IoStatsChart className='text-[40px]'/>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}


export default DashboardBoxes;