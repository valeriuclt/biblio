
export interface Borrow {
    id: string;
    status: "BORROWED" | "RETURNED";
    borrowDate: Date;
    dueDate: Date;
    returnDate?: Date;
    book: Book;
    user: User;
  }
  
  export interface User {
    id: string;
    fullName: string;
    email: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | null;
    role: "USER" | "ADMIN" | null;
    universityId: number;
  } 