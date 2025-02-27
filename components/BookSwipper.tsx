
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import BookCard from './BookCard';

import { useEffect, useState } from 'react';  

interface Props {    
    books: Book[];
  }
  

export default function BookSwiper({ books}: Props) {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
      setDomLoaded(true);
    }, []);
  
    if (!domLoaded) {
      return null; // sau un loader
    }


    return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      observer={true}
      observeParents={true}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 25,
        },
        1310: {
          slidesPerView: 4.5,
          spaceBetween: 30,
        },
      }}
      modules={[Pagination]}
      className="w-full h-[400px]"
    >
      {books.map((book, index) => (
        <SwiperSlide key={book.id || index} className="select-none transition-all duration-300" >
         <div className="h-full w-full flex items-center justify-center " >
            <BookCard {...book} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}