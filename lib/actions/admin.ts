"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";

import { and, sql, eq } from "drizzle-orm";
import { startOfWeek } from "date-fns";
import { revalidatePath } from "next/cache";

export async function getOverviewStats() {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const firstDayOfWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Setează luni ca prima zi a săptămânii

  const [
    [totalUsers],
    [monthlyUsers],
    [totalBooks],
    [newBook],
    [activeLoans],
    [weekLoans],
    [pendingUsers],
  ] = await Promise.all([
    // Total users
    db.select({ count: sql<number>`count(*)` }).from(users),

    // New users this month
    db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(sql`created_at >= ${firstDayOfMonth}`),

    // Total books
    db.select({ count: sql<number>`count(*)` }).from(books),

    // New Book adition
    db
      .select({ count: sql<number>`count(*)` })
      .from(books)
      .where(sql`created_at >= ${firstDayOfMonth}`),
    // Active borrows
    db
      .select({ count: sql<number>`count(*)` })
      .from(borrowRecords)
      .where(sql`status = 'BORROWED'`),
    // this week borrows
    db
      .select({ count: sql<number>`count(*)` })
      .from(borrowRecords)
      .where(
        and(sql`status = 'BORROWED'`, sql`created_at >= ${firstDayOfWeek}`)
      ),

    // Pending approvals
    db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(sql`status = 'PENDING'`),
  ]);

  return {
    totalUsers: totalUsers.count,
    newUsersThisMonth: monthlyUsers.count,
    totalBooks: totalBooks.count,
    newBook: newBook.count,
    activeLoans: activeLoans.count,
    weekLoans: weekLoans.count,
    pendingUsers: pendingUsers.count,
  };
}

export async function getMonthlyBorrowStats() {
  const stats = await db
    .select({
      month: sql`to_char(borrow_date, 'Mon')::text`, // Explicit cast to text
      count: sql<number>`count(*)`,
      totalBooks: sql<number>`count(distinct book_id)`,
      uniqueUsers: sql<number>`count(distinct user_id)`,
    })
    .from(borrowRecords)
    .where(sql`borrow_date >= NOW() - INTERVAL '6 months'`)
    .groupBy(sql`to_char(borrow_date, 'Mon')`)
    .orderBy(sql`min(borrow_date)`);

  return stats as {
    month: string;
    count: number;
    totalBooks: number;
    uniqueUsers: number;
  }[];
}

export async function updateBorrowStatus(borrowId: string) {
  try {
  
    // Mai întâi obținem înregistrarea împrumutului pentru a avea bookId
    const borrowRecord = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.id, borrowId))
      .limit(1);

    if (!borrowRecord[0]) {
      return { error: "Împrumutul nu a fost găsit" };
    }

  
    // Actualizăm statusul împrumutului
    await db
      .update(borrowRecords)
      .set({
        status: "RETURNED",
        returnDate: sql`CURRENT_DATE`,
      })
      .where(eq(borrowRecords.id, borrowId));

    // Actualizăm numărul de copii disponibile
    await db
      .update(books)
      .set({
        availableCopies: sql`available_copies + 1`,
      })
      .where(eq(books.id, borrowRecord[0].bookId));

    revalidatePath("/admin/borrows");
    return { success: true };
  } catch (error) {
    console.error("Error updating borrow status:", error);
    return { error: "Eroare la actualizarea statusului" };
  }
}

// Actualizare rol utilizator
export async function updateUserRole(
  userId: string,
  newRole: "ADMIN" | "USER"
) {
  try {
    await db
      .update(users)
      .set({
        role: newRole,
      })
      .where(eq(users.id, userId));

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Eroare la actualizarea rolului" };
  }
}

// Aprobare cerere înscriere
export async function approveUserRegistration(userId: string) {
  try {
    await db
      .update(users)
      .set({
        status: "APPROVED",
      })
      .where(eq(users.id, userId));

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Eroare la aprobarea utilizatorului" };
  }
}
