"use client";
import React from "react";
import "swiper/css"; // Importă stilurile de bază Swiper
import "swiper/css/pagination"; // Importă stilurile pentru paginare

import BookSwiper from "./BookSwipper";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookSection = ({ title, books, containerClassName }: Props) => {
  return (
    <section className={`container mx-auto px-4 ${containerClassName}`}>
      <div className="mb-12 text-center">
        <h3
          className="pretitle"
          style={{
            color: "black",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", // Adaugă o umbră subtilă pentru contrast
            fontWeight: "bold", // Ajustează grosimea fontului
          }}
        >
          {title}
        </h3>
      </div>
      <BookSwiper books={books} />
    </section>
  );
};

export default BookSection;
