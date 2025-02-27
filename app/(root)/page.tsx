import { auth } from "@/auth";
import BookList from "@/components/BookList";
import Hero from "@/components/Hero";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";

import { desc } from "drizzle-orm";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    // .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];
 
  const filterBook = latestBooks.filter((book) => book.rating === 5).slice(0, 7);
  // console.log(JSON.stringify(result));
  return (
    <>
      <Hero books={latestBooks.slice(1)} />
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title="you will like"
        books={filterBook.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
