// 'use client'
import { redirect } from "next/navigation";

import { db } from "@/database/drizzle";
import {  borrowRecords, books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 
import { auth } from "@/auth"; 
import BookCover from "@/components/BookCover";
import { BookOpen, History } from "lucide-react";
import { handleSignOut } from "@/lib/actions/auth";
import { getUserProfile } from "@/lib/actions/user";


async function getUserBorrows(userId: string) {
    return await db
      .select({
        id: borrowRecords.id,
        borrowDate: borrowRecords.borrowDate,
        dueDate: borrowRecords.dueDate,
        returnDate: borrowRecords.returnDate,
        status: borrowRecords.status,
        book: {
          title: books.title,
          author: books.author,
          coverUrl: books.coverUrl,
          coverColor:books.coverColor
        }
      })
      .from(borrowRecords)
      .innerJoin(books, eq(books.id, borrowRecords.bookId))
      .where(eq(borrowRecords.userId, userId))
      .orderBy(borrowRecords.borrowDate)
  }

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

    const {user, error} = await getUserProfile(session.user.email)



  if (!user) {
    redirect("/auth/signin");
  }

  const borrows = await getUserBorrows(user.id);
console.log(borrows,'imprumt')
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
        <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
        <p className="text-indigo-200 mb-4">University ID: {user.universityId}</p>
        
        {/* Buton Logout */}
        <button  
        onClick={ handleSignOut}
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
<div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Left Column - User Details */}
  <Card className="lg:col-span-1 shadow-md rounded-xl">
    <CardHeader>
      <CardTitle  className="text-xl">Profile Details</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <label className="text-sm text-muted-foreground">Email</label>
        <p className="font-medium">{user.email}</p>
      </div>
      <div>
        <label className="text-sm text-muted-foreground">Member Since</label>
   
        <p className="font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString():"inca nu a fost returnata"}</p>
        <p className="font-medium">data inscrieri</p>
      </div>
      <div>
        <label className="text-sm text-muted-foreground">Status</label>
        <p className={`font-medium capitalize ${
            user.status === 'APPROVED' ? 'text-green-500' : 'text-yellow-500'
          }`}>{user.status ? user.status.toLowerCase() : "statut neconfirmat inca"}</p> 
      </div>
    </CardContent>
  </Card>

  {/* Right Column - Borrowing History */}
  <div className="lg:col-span-2 space-y-6">
    {/* Current Borrows */}
    <Card className="shadow-md rounded-xl">
      <CardHeader >
        <CardTitle className="text-xl">Currently Borrowed Books</CardTitle>
      </CardHeader>
      <CardContent>
        {borrows.filter(borrow => borrow.status === 'BORROWED').length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No books currently borrowed</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {borrows
              .filter(borrow => borrow.status === 'BORROWED')
              .map(borrow => (
                  <div key={borrow.id} className="flex gap-4 p-4 rounded-lg border  hover:shadow-lg transition duration-200">
                   <div  className=" flex-shrink-0">
                
                      <BookCover coverColor={borrow.book.coverColor} coverImage={borrow.book.coverUrl}  />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{borrow.book.title}</h3>
                    <p className="text-sm text-muted-foreground">{borrow.book.author}</p>
                    <div className="mt-2 text-xs space-y-1">
                      <p>Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()}</p>
                      <p className="text-red-500">Due: {new Date(borrow.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>

    {/* Borrowing History */}
    <Card className="shadow-md rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Borrowing History</CardTitle>
        <div className="text-sm text-muted-foreground">
          Total Books: {borrows.filter(borrow => borrow.status === 'RETURNED').length}
        </div>
      </CardHeader>
      <CardContent>
        {borrows.filter(borrow => borrow.status === 'RETURNED').length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No borrowing history yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {borrows
              .filter(borrow => borrow.status === 'RETURNED')
              .map(borrow => (
                <div key={borrow.id} className="flex gap-4 p-4 rounded-lg border  hover:shadow-lg transition duration-200">
                   <div  className=" flex-shrink-0">
            
                    <BookCover coverColor={borrow.book.coverColor} coverImage={borrow.book.coverUrl} />
                  </div>
                  <div className="mt-2 text-xs space-y-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{borrow.book.title}</h3>
                    <p className="text-sm text-muted-foreground">{borrow.book.author}</p>
                  </div>
                  <div className="text-sm text-right text-muted-foreground">
                    <p>{new Date(borrow.borrowDate).toLocaleDateString()}</p>
                    <p>to</p>
                    <p>{borrow.returnDate && new Date(borrow.returnDate).toLocaleDateString()}</p>
                  </div></div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  </div>
</div>

</div>

);
}
