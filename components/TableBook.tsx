import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BooksTable = ({ books }:{books: Book[]} ) => {
  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Catalogul bibliotecii</h2>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Titlu</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Gen</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-center">Exemplare </TableHead>
              <TableHead className="text-center">Disponibil</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-12 rounded-sm" 
                      style={{ backgroundColor: book.coverColor || '#e2e8f0' }}
                    />
                    <span>{book.title}</span>
                  </div>
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {book.rating}/5
                  </span>
                </TableCell>
                <TableCell className="text-center">{book.totalCopies}</TableCell>
                <TableCell className="text-center">{book.availableCopies}</TableCell>
                <TableCell className="text-center">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      book.availableCopies > 0 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {book.availableCopies > 0 ? 'Disponibilă' : 'Indisponibilă'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BooksTable;