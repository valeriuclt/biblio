import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BooksTable from "@/components/TableBook"
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
 

const Page = async() => {

  const carte = await db.select().from(books).orderBy(desc(books.createdAt));
  
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
   
      <BooksTable books={carte} />;
      </div>
    </section>
  );
};

export default Page;