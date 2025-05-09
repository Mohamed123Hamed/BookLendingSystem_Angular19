export interface Book {
    title: string;
    author: string;
  }

export interface UpdateBook {
    id: number; 
    title: string;
    author: string;
  }

export interface BookList {
    id: any; 
    title: string;
    author: string;
    isAvailable: boolean;
    image: string;
    borrowedByUserId?: string | null;
  }

export interface Borrow {
    userId: string;
    bookId: number;
  }