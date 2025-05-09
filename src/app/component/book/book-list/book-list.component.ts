import { Component, signal } from '@angular/core';
import { BookList } from '..';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [NgIf, RouterLink, NgClass],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books = signal<BookList[]>([]);
  isAdminUser = false;
  userId: string;
  bookId!: any;

  images: { [key: number]: string } = {
    1: '/images/1.jpg ',
    2: 'images/2.jpg ',
    3: 'images/6.jpg ',
    4: 'images/4.jpg ',
    5: 'images/5.jpg ',
    6: 'images/6.jpg ',
    7: 'images/1.jpg ',
    8: 'images/2.jpg ',
    9: 'images/6.jpg ',
    10: 'images/4.jpg ',
    11: 'images/5.jpg ',
    12: 'images/6.jpg ',
    13: 'images/1.jpg ',
    14: 'images/2.jpg ',
    15: 'images/6.jpg ',
    16: 'images/1.jpg ',
    17: 'images/2.jpg ',
  };

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        const booksWithImages = data.map((book) => ({
          ...book,
          image: this.images[book.id] || '/assets/images/default.jpg',
        }));
        this.books.set(booksWithImages);
      },
      () => this.toastr.error('Failed to load books')
    );
  }
  deleteBook(): void {
    this.bookService.deleteBook(this.bookId).subscribe(
      (response: any) => {
        if (response.succeeded) {
          this.toastr.success('Book deleted successfully!');
          window.location.href = '/books';
        } else {
          this.toastr.error('Failed to delete the book.');
        }
      },
      (error) => {
        this.toastr.error('Error deleting the book.');
      }
    );
  }

  borrowBook(bookId: number): void {
    const userId = this.authService.getUserId();

    if (!this.authService.isLoggedIn()) {
      this.toastr.error('You need to log in first.');
      return;
    }

    const borrowedBook = this.books().find(
      (book) => book.borrowedByUserId === userId
    );
    const borrowData = { bookId, userId };
    this.bookService.borrowBook(borrowData).subscribe(
      (response) => {
        if (response.succeeded) {
          this.toastr.success(response.data || 'Book Borrow successfully!');
          this.loadBooks();
        } else {
          this.toastr.error(response.messages[0] || 'Could not borrow book.');
        }
      },
      () => this.toastr.error('Failed to borrow the book.')
    );
  }

  returnBook(bookId: number): void {
    const userId = this.authService.getUserId();
    if (!this.authService.isLoggedIn()) {
      this.toastr.error('You need to log in first.');
      return;
    }

    const returnData = { bookId, userId };
    this.bookService.returnBook(returnData).subscribe(
      (response) => {
        if (response.succeeded) {
          this.toastr.success(response.data || 'Book returned successfully!');
          this.loadBooks();
        } else {
          this.toastr.error(response.messages[0] || 'Could not return book.');
        }
      },
      () => this.toastr.error('Failed to return the book.')
    );
  }
}
