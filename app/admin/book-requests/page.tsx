import BookList from "@/components/BookList";

import { db } from "@/database/drizzle";

import { count, eq } from "drizzle-orm";
import { books, borrowRecords } from "@/database/schema";
import { desc } from "drizzle-orm";

const page = async () => {
  const latestBook = await db
    .select({ book: books, borrowCount: count(borrowRecords.id) })
    .from(books)
    .innerJoin(borrowRecords, eq(books.id, borrowRecords.bookId))
    .where(eq(borrowRecords.status, "BORROWED"))
    .groupBy(books.id)
    .orderBy(desc(count(borrowRecords.id)))
    .limit(10);

  const booksWithBorrowCount = latestBook.map((item) => ({
    ...item.book,
    borrowCount: Number(item.borrowCount),
  })) as (Book & { borrowCount: number })[];

  console.log("imprumutate", booksWithBorrowCount);

  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Cărți frecvent împrumutate
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {booksWithBorrowCount.map((book) => (
            <div
              key={book.id}
              className="flex items-center p-3 bg-white shadow-sm rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200 "
            >
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                <span className="font-bold text-amber-800">
                  {book.borrowCount}
                </span>
              </div>
              <div>
                <p className="font-light text-gray-800 max-md:hidden">
                  {book.author}
                </p>
                <p className="font-semibold text-gray-800">{book.title}</p>
                <p className="text-xs text-gray-500">
                  {book.borrowCount}/{book.availableCopies} exemplare
                  împrumutate
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookList title="Most Borrowed Books" books={booksWithBorrowCount} />
    </section>
  );
};
export default page;
