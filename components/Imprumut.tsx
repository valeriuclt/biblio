"use client";

import {
  BiLayer,
  BiRightArrowAlt,
  BiSearch,
  BiStar,
  BiAlarm,
} from "react-icons/bi";
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
import { ReturnButton } from "./admin/ReturnButton";

const Imprumutat = ({ borrow }: { borrow: Imprumut[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("all"); // Nou filtru pentru status

  // Filtrare cărți în funcție de searchTerm, selectedType, selectedRating și selectedStatus
  const filteredBooks = borrow.filter((book) => {
    const matchesSearchTerm =
      book.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSelectedType =
      selectedType === "all" || book.book.genre === selectedType;

    // const matchesSelectedRating =
    //   selectedRating === null || parseFloat(book.book.rating.toString()) === parseFloat(selectedRating);

    const matchesSelectedRating =
      selectedRating === null ||
      selectedRating === "all" ||
      parseFloat(book.book.rating.toString()) === parseFloat(selectedRating);

    const matchesSelectedStatus =
      selectedStatus === "all" || book.status === selectedStatus; // Comparăm statusul cărții

    return (
      matchesSearchTerm &&
      matchesSelectedType &&
      matchesSelectedRating &&
      matchesSelectedStatus
    );
  });

  // Obținem tipurile unice și ratingurile unice pentru dropdown-uri
  const uniqueTypes = [
    "All type",
    ...new Set(borrow.map((book) => book.book.genre)),
  ];
  const uniqueRatings = [
    "All ratings",
    ...new Set(borrow.map((book) => book.book.rating.toString())),
  ].sort();
  const uniqueStatuses = ["all", "BORROWED", "RETURNED"]; // Statusuri posibile

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search Term:", searchTerm);
    console.log("Selected Type:", selectedType);
    console.log("Selected Rating:", selectedRating);
    console.log("Selected Status:", selectedStatus);
  };

  return (
    <section className="pt-4 mb-16  relative">
      <div className="container mx-auto h-full flex flex-col justify-center items-center xl:pt-0">
        <div className="w-full  text-center mx-auto flex flex-col gap-2"></div>
        <form onSubmit={handleSubmit} className="">
          <div className="bg-black/40 w-[80vw] xs:max-w-[300px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[900px] p-8 xl:pl-8 xl:pr-2 h-auto xl:h-[70px] rounded-3xl xl:rounded-full backdrop-blur-[20px] flex flex-col md:flex-row items-center gap-6 mx-auto text-sm text-white z-50">
            <div className="flex flex-grow items-center gap-[10px] w-full xl:w-[190px] text-white ">
              <div className="text-lg">
                <BiSearch />
              </div>
              <Input
                value={searchTerm}
                type="text"
                placeholder="Book name or writer"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-1 bg-transparent/20 border-0 focus-visible:right-0 focus-visible:ring-offset-0 "
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
                <BiAlarm />
              </div>
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value)}
              >
                <SelectTrigger className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 text-left p-0 capitalize">
                  <SelectValue placeholder="Book status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {uniqueStatuses.map((status, index) => (
                      <SelectItem
                        key={index}
                        value={status === "All type" ? "all" : status}
                        className="capitalize"
                      >
                        {status}
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
          </div>
          <div className="w-full mt-3 relative flex flex-col justify-center">
            <p className="text-sm italic font-light text-black/70 text-center mb-3 xl:mb-0">
              Please select at least one field or leave them empty to see all
              books
            </p>
            <button
              type="button"
              className="text-red text-sm xl:absolute right-0"
              onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedRating("all");
                setSelectedStatus("all");
              }}
            >
              clear search
            </button>
          </div>
        </form>
        <div className="container mx-auto p-6 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Împrumuturi
          </h1>
          <div className="space-y-4">
            {filteredBooks.map((borrow) => {
              const isOverdue =
                borrow.status === "BORROWED" &&
                borrow.dueDate &&
                new Date(borrow.dueDate) < new Date();
              return (
                <div
                  key={borrow.id}
                  className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row  justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900">
                        {borrow.book.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Împrumutat de:{" "}
                        <span className="font-medium text-gray-700">
                          {borrow.user.fullName}
                        </span>
                      </p>
                      <div className=" flex flex-col sm:flex-row mt-3 text-sm text-gray-700 gap-1">
                        <p>
                          <strong>Data împrumut:</strong>{" "}
                          {borrow.borrowDate
                            ? new Date(borrow.borrowDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                        {borrow.status === "RETURNED" ? (
                          <p>
                            <strong>Data returnare:</strong>{" "}
                            {borrow.returnDate
                              ? new Date(borrow.returnDate).toLocaleDateString()
                              : "N/A"}
                          </p>
                        ) : (
                          <p
                            className={
                              isOverdue ? "text-red-600 font-semibold" : ""
                            }
                          >
                            <strong>Termen returnare:</strong>{" "}
                            {borrow.dueDate
                              ? new Date(borrow.dueDate).toLocaleDateString()
                              : "N/A"}{" "}
                            {isOverdue && "(Depășit!)"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-start gap-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-200 ${
                          borrow.status === "BORROWED"
                            ? "italic text-blue-800 border border-blue-300"
                            : "bg-green-100 text-green-800 border border-green-300"
                        }`}
                      >
                        {borrow.status === "BORROWED"
                          ? "Împrumutat"
                          : "Returnat"}
                      </span>
                      {borrow.status === "BORROWED" && (
                        <ReturnButton borrowId={borrow.id} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bg-primary top-0 left-0 w-[50vw] h-full bg-hero_bg1 bg-blend-color-dodge bg-no-repeat bg-cover -z-10 opacity-50"></div>
      <div className="absolute bg-primary top-0 right-0 w-[50vw] h-full bg-hero_bg2 bg-blend-color-lighten bg-no-repeat bg-cover -z-10 opacity-50"></div>
    </section>
  );
};
export default Imprumutat;
