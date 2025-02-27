"use client";

import { BiLayer, BiRightArrowAlt, BiSearch, BiStar } from "react-icons/bi";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import BookCard from "./BookCard";

interface Props {
  books: Book[];
}

const Hero = ({ books }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  // Filtrare cărți în funcție de searchTerm și selectedType
  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSelectedType =
      selectedType === "all" || book.genre === selectedType;

    const matchesSelectedRating =
      selectedRating === null ||
      selectedRating === "all" ||
      parseFloat(book.rating.toString()) === parseFloat(selectedRating);

    return matchesSearchTerm && matchesSelectedType && matchesSelectedRating;
  });

  const uniqueTypes = ["All type", ...new Set(books.map((book) => book.genre))];
  const uniqueRatings = [
    "All ratings",
    ...new Set(books.map((book) => book.rating.toString())),
  ].sort();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aici poți adăuga logica pentru a procesa căutarea
    console.log("Search Term:", searchTerm);
    console.log("Selected Type:", selectedType);
    console.log("Selected Type:", selectedRating);
  };

  return (
    <section className="pt-4 mb-12  relative">
      <div className="container mx-auto h-full flex flex-col justify-center items-center  xl:pt-0">
        <div className="w-full max-w-[684px] text-center mx-auto flex flex-col gap-2">
          <div className="pretitle">uncover New Moments</div>
          <h1 className=" text-primary text-4xl xl:text-[70px] font-bold xl:leading-[78px] uppercase">
            Discover Stories <br /> & Experiences
          </h1>
          <p className="text-sm xl:text-lg font-light text-white/80 mb-4 xl:mb-12 max-w-[480px] xl:max-w-none mx-auto">
            Join a vibrant community where you can explore global happenings and
            share memorable books with friends and family
          </p>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="bg-white/40 w-[98vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] p-8 xl:pl-8 xl:pr-2 h-auto xl:h-[70px] rounded-3xl xl:rounded-full backdrop-blur-[20px] flex flex-col md:flex-row items-center gap-6 mx-auto text-sm text-white z-50">
            <div className="flex flex-grow items-center gap-[10px] w-full xl:w-[190px] ">
              <div className="text-lg">
                <BiSearch />
              </div>
              <Input
                value={searchTerm}
                type="text"
                placeholder="Book name or writer"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-0 bg-transparent border-0 focus-visible:right-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="border h-[20px] border-white/10 hidden xl:flex"></div>
            <div className="flex items-center gap-[10px] w-full xl:w-[190px] select-none">
              <div className="text-lg text-accent">
                <BiLayer />
              </div>
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
              >
                <SelectTrigger className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 text-left p-0 capitalize">
                  <SelectValue placeholder="Book type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    {uniqueTypes.map((genre, index) => (
                      <SelectItem
                        key={index}
                        value={genre === "All type" ? "all" : genre}
                        className="capitalize"
                      >
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="border h-[20px] border-white/10 hidden xl:flex"></div>
            <div className="flex items-center gap-[10px] w-full xl:w-[190px] select-none">
              <div className="text-lg text-accent">
                <BiStar />
              </div>
              <Select
                value={selectedRating === null ? "all" : selectedRating}
                onValueChange={(value) =>
                  setSelectedRating(value === "all" ? null : value)
                }
              >
                <SelectTrigger className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 text-left p-0 capitalize">
                  <SelectValue placeholder="Book rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rating</SelectLabel>
                    {uniqueRatings.map((rating, index) => (
                      <SelectItem
                        key={index}
                        value={rating === "All ratings" ? "all" : rating}
                        className="capitalize"
                      >
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="border h-[20px] border-white/10 hidden xl:flex"></div>
            <button
              type="submit"
              className="w-full pl-1 md:w-auto xl:w-[54px] rounded-[40px] xl:rounded-full bg-primary hover:bg-primary-hover transition-all flex items-center justify-center"
            >
              <BiRightArrowAlt className="text-3xl text-black " />
            </button>
          </div>
          <div className="w-full mt-3 relative flex flex-col justify-center">
            <p className="text-sm italic font-light text-white/70 text-center mb-3 xl:mb-0">
              Please select at least one field or leave them empty to see all
              events
            </p>
            <button
              type="button"
              className="text-primary text-sm xl:absolute right-0"
              onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedRating("all");
              }}
            >
              clear search
            </button>
          </div>
        </form>
        <div className="book-list">
          {filteredBooks.map((book) => (
            <div key={book.id} className=" p-4 rounded-lg shadow-md">
              <BookCard key={book.title} {...book} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bg-primary top-0 left-0 w-[50vw] h-full bg-hero_bg1 bg-blend-color-dodge bg-no-repeat bg-cover -z-10 opacity-50"></div>
      <div className="absolute bg-primary top-0 right-0 w-[50vw] h-full bg-hero_bg2 bg-blend-color-lighten bg-no-repeat bg-cover -z-10 opacity-50"></div>
    </section>
  );
};
export default Hero;
