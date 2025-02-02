import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
// import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";

import { desc } from "drizzle-orm";
// import Image from "next/image";

 const Home = async () =>  {

  const session = await auth()

// const result = await db.select().from(users);

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

// console.log(JSON.stringify(result));
return(
  <>
   {/* <BookOverview {...sampleBooks[0] } />  */}
   <BookOverview {...latestBooks[0] } userId={session?.user?.id as string} /> 
   <BookList 
   title="Latest Books"
   books={latestBooks.slice(1)} 
   containerClassName="mt-28"
   />
   <h1>aici</h1>
   </>
  )
}


export default Home;
