
import Imprumutat from "@/components/Imprumut"; 
import { db } from "@/database/drizzle";
import { borrowRecords, books, users } from "@/database/schema"; 
import { eq, desc } from "drizzle-orm";
 
const  page = async() => {
 
  const borrows = (await db
  .select({
    id: borrowRecords.id,
    status: borrowRecords.status,
    borrowDate: borrowRecords.borrowDate,
    dueDate: borrowRecords.dueDate,
    returnDate: borrowRecords.returnDate,
    book: {
      id: books.id,
      title: books.title,
      author: books.author,
      genre:books.genre,
      rating:books.rating,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
    },
    user: {
      id: users.id,
      fullName: users.fullName,
      email: users.email,
    },
  })
  .from(borrowRecords)
  .innerJoin(books, eq(books.id, borrowRecords.bookId))
  .innerJoin(users, eq(users.id, borrowRecords.userId))
  .orderBy(desc(borrowRecords.borrowDate))) as Imprumut[];

  return (
  
<> 
<Imprumutat borrow={borrows}  />
 
</>

 
  )
}
export default page

