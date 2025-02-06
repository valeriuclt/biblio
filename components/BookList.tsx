import React from "react";
import BookCard from "@/components/BookCard"; 

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {

  if (books.length < 2) return;

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-3xl font-bold mb-8 text-gray-400">{title}</h2> 
      <ul className="book-list" key={title}>
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
        
      </ul>
    </section>
  );
};

export default BookList;