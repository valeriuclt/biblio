"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

export async function getBorrows() {
  try {
    const borrows = await db
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
          genre: books.genre,
          rating: books.rating,
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
      .orderBy(desc(borrowRecords.borrowDate));

    return borrows.map((borrow) => ({
      ...borrow,
      dueDate: new Date(borrow.dueDate),
      returnDate: borrow.returnDate ? new Date(borrow.returnDate) : undefined,
    }));
  } catch (error) {
    console.error("Error fetching borrows:", error);
    return [];
  }
}