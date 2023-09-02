import React from 'react'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import './Slider666.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Slider666 = () => {

    const data = [
        { id: '1' , image: 'https://zanella.com.ar/wp-content/uploads/2021/11/Ceccato-X250-Lateral-Roja.png'},
        { id: '2' , image: 'https://zanella.com.ar/wp-content/uploads/2023/07/gforce-250-450x330-1.png'},
        { id: '3' , image: 'https://zanella.com.ar/wp-content/uploads/2021/03/RZ-650_thumb.png'},
        { id: '4' , image: 'https://zanella.com.ar/wp-content/uploads/2021/03/patagonianeagle250_menu.png'},
        { id: '5' , image: 'https://zanella.com.ar/wp-content/uploads/2021/03/patagonianeagle250_menu.png'},
        { id: '6' , image: 'https://zanella.com.ar/wp-content/uploads/2021/03/patagonianeagle250_menu.png'},
        { id: '7' , image: 'https://zanella.com.ar/wp-content/uploads/2021/03/patagonianeagle250_menu.png'},
        { id: '8' , image: 'https://zanella.com.ar/wp-content/uploads/2021/03/patagonianeagle250_menu.png'},
    ]

  return (
    <Swiper className='Swiper-container'
    // install Swiper modules
    modules={[Navigation, Pagination, A11y, Autoplay]}
    autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    spaceBetween={50}
    slidesPerView={3}
    loop={true}
    navigation
    pagination={{ clickable: true }}
  >{
    data.map((element)=>(<SwiperSlide key={element.id}>
        <img className="transform scale-x-[-1]"
            src={element.image} 
            alt="Slider"
            />
    </SwiperSlide>))
  }
    
  </Swiper>
  )
}

export default Slider666