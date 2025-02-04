interface Book {
    id: string; 
    title: string;
    author: string;
    genre: string;
    rating: number;
    totalCopies: number; 
    availableCopies: number; 
    description: string; 
    coverColor: string; 
    coverUrl: string;
    videoUrl: string; 
    summary: string;
    isLoanedBook?:boolean;
    createdAt: Date | null;
  }
  
interface BookB {
    id: string; 
    userId: string;
    bookId: string;
    borrowDate: Date | null;
    dueDate: Date | null;
    returnDate: Date | null;
    status: string;
    createdAt: Date | null;
  }
  
// interface Book {
//     id: string; 
//     title: string;
//     author: string;
//     genre: string;
//     rating: number;
//     totalCopies: number;
//     // total_copies: number;
//     availableCopies: number;
//     // available_copies: number;
//     description: string;
//     // coverColor: string;
//     coverColor: string;
//     // cover: string;
//     coverUrl: string;
//     videoUrl: string;
//     // video: string;
//     summary: string;
//     isLoanedBook?:boolean;
//     createdAt: Date | null;
//   }
  
  interface AuthCredentials {
    fullName: string;
    email: string;
    password: string;
    universityId: number;
    universityCard: string;
  }
  
  interface BookParams {
    title: string;
    author: string;
    genre: string;
    rating: number;
    coverUrl: string;
    coverColor: string;
    description: string;
    totalCopies: number;
    videoUrl: string;
    summary: string;
  }
  
  interface BorrowBookParams {
    bookId: string;
    userId: string;
  }