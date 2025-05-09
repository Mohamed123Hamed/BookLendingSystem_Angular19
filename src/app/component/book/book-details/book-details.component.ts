import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';
import { BookList } from '..';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink,NgIf],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  bookId!: any;
  userId: string;
  book: any | null = null;
  isAdminUser: boolean = false;
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
    private route: ActivatedRoute,
    private bookService: BookService,
    private toastr: ToastrService,
    public authService: AuthService,
    private router: Router
  ) {
      this.userId = this.authService.getUserId();
  }


  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
    this.bookId = this.route.snapshot.paramMap.get('id');
    
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe(
        (res: any) => {
          if (res) {
            this.book = {
              ...res,
              image: this.images[res.id] || 'images/6.jpg' 
            };
          }
        },
        (error) => {
          this.toastr.error('Error fetching book details!');
        }
      );
    }
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
    
      if (this.book.borrowedByUserId === userId) {
    this.toastr.error('You have already borrowed this book.');
    return;
  }

    const borrowData = { bookId, userId };
    this.bookService.borrowBook(borrowData).subscribe(
      (response) => {
        if (response.succeeded) {
          this.toastr.success(response.data || 'Book Borrow successfully!');
          this.ngOnInit();
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
          this.ngOnInit();
        } else {
          this.toastr.error(response.messages[0] || 'Could not return book.');
        }
      },
      () => this.toastr.error('Failed to return the book.')
    );
  }
  
}
