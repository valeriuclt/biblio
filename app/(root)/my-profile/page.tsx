// 'use client'
import { redirect } from "next/navigation";

import { db } from "@/database/drizzle";
import { borrowRecords, books } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { auth } from "@/auth";
import BookCover from "@/components/BookCover";
import { handleSignOut } from "@/lib/actions/auth";
import { getUserProfile } from "@/lib/actions/user";
import Link from "next/link";

async function getUserBorrows(userId: string) {
  return await db
    .select({
      bookId: borrowRecords.bookId,
      borrowCount: sql<number>`count(*)`,
      title: books.title,
      author: books.author,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(books.id, borrowRecords.bookId))
    .where(eq(borrowRecords.userId, userId))
    .groupBy(
      borrowRecords.bookId,
      books.title,
      books.author,
      books.coverUrl,
      books.coverColor
    )
    .orderBy(books.title);
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  const { user, error } = await getUserProfile(session.user.email);

  if (!user) {
    redirect("/auth/signin");
  }

  const borrows = await getUserBorrows(user.id);

  console.log(borrows, "imprumt");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <div className="relative">
        {/* Gradient Border Container */}
        <div className="h-auto rounded-xl shadow-lg p-1 bg-transparent border-2 border-primary ">
          {/* Transparent Inner Content */}
          <div className="bg-transparent rounded-xl flex flex-col md:flex-row items-center md:items-center justify-between p-6 md:p-8">
            <div className="">
              {/* Avatar - Stânga */}
              <div className="flex-shrink-0">
                <Avatar className="h-36 w-36 border-4 border-transparent bg-gradient-to-r from-indigo-400 to-purple-400 p-1 rounded-full shadow-md">
                  <AvatarFallback className="text-4xl bg-white text-indigo-800 rounded-full">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div>
              {/* User Info și Buton - Dreapta */}
              <div className="flex-1 mt-6 md:mt-0 md:ml-12 text-center md:text-left flex flex-col items-center md:items-start">
                <h1 className="text-3xl font-bold text-white">
                  {user.fullName}
                </h1>
                <p className="text-indigo-200 mb-4">
                  University ID: {user.universityId}
                </p>

                {/* Buton Logout */}
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-primary hover:bg-red-600 text-black font-semibold rounded-lg shadow-md transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      /* Main Content */
      <div className="mt-20 container mx-auto px-4 gap-2 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Left Column - User Details */}
          <Card className="lg:col-span-1 shadow-md rounded-xl ">
            <CardHeader>
              <CardTitle className="text-xl">Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm ">Member Since</label>

                <p className="font-medium">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "inca nu a fost returnata"}
                </p>
                <p className="font-medium">data inscrierii</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Status</label>
                <p
                  className={`font-medium capitalize ${
                    user.status === "APPROVED"
                      ? "text-black-500 italic shadow-sm"
                      : "text-red-500 shadow-sm"
                  }`}
                >
                  {user.status
                    ? user.status.toLowerCase()
                    : "statut neconfirmat inca"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Borrowing History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Borrows */}
            <Card className="shadow-md rounded-xl  overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl">
                  Currently Borrowed Books
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">
                  {borrows.length > 0 ? (
                    borrows.map((borrow) => (
                      <div
                        key={borrow.bookId}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                      >
                        <div className="flex p-4 gap-2">
                          {/* Cover și Badge cu numărul de împrumuturi */}
                          <div className="relative">
                            <div className="absolute -top-2 -left-2 bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold shadow-sm z-50">
                              {borrow.borrowCount}
                            </div>
                            <div className="w-24 h-36">
                              <BookCover
                                coverColor={borrow.coverColor}
                                coverImage={borrow.coverUrl}
                                className="w-full h-full rounded-lg shadow-sm"
                              />
                            </div>
                          </div>

                          {/* Informații carte */}
                          <div className="flex-1 flex flex-col">
                            <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-1">
                              {borrow.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {borrow.author}
                            </p>
                            <div className="mt-auto text-xs text-gray-500 pl-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  Împrumutată de
                                </span>
                                <span className="text-amber-600 font-semibold">
                                  {borrow.borrowCount}{" "}
                                  {borrow.borrowCount === 1 ? "dată" : "ori"}
                                </span>
                              </div>
                              <div className="flex justify-end space-x-2 mt-2 pt-2 border-t border-gray-100">
                                <Link
                                  href={`/books/${borrow.bookId}`}
                                  className="w-full flex flex-col items-center"
                                >
                                  Vezi detalii
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full md:col-span-1 lg:col-span-1 rounded-xl overflow-hidden shadow-lg border border-gray-100 flex items-center justify-center p-4 h-[16rem] ">
                      <p className="text-gray-800 text-center">
                        Nu există cărți împrumutate în acest moment.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
