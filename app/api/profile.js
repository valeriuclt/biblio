// import {db } from '@/database/drizzle';  // presupun că ai o conexiune DB aici
// import { users, books, borrowRecords } from '@//database/schema'; // importăm tabelele definite

// export default async function handler(req, res) {
 
//     if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   // Simulăm un user autenticat (în mod normal, ai obține acest ID din sesiune)
//   const userId = req.query.userId;

//   try {
//     // const user = await db.select().from(users).where(eq(users.email, email)).single();
//     const user = await db.select().from(users).where(users.id.eq(userId)).single()
//     const borrowedBooks = await db
//       .select({
//         borrowDate: borrowRecords.borrowDate,
//         dueDate: borrowRecords.dueDate,
//         status: borrowRecords.status,
//         book: books,
//       })
//       .from(borrowRecords)
//       .innerJoin(books, borrowRecords.bookId.eq(books.id))
//       .where(borrowRecords.userId.eq(userId));

//     res.status(200).json({ user, borrowedBooks });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching profile data', error });
//   }
// }
