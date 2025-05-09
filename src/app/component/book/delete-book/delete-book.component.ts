import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-delete-book',
  imports: [],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.css'
})
export class DeleteBookComponent {
  bookId!: number;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.isAdmin = this.authService.isAdmin();

    if (!this.isAdmin) {
      this.toastr.error('You are not authorized!');
      this.router.navigate(['/books']);
    }
  }

  confirmDelete(): void {
    this.bookService.deleteBook(this.bookId).subscribe(
      (response: any) => {
        if (response.succeeded) {
          this.toastr.success('Book deleted successfully!');
          this.router.navigate(['/books']);
        } else {
          this.toastr.error('Failed to delete the book.');
        }
      },
      (error) => {
        this.toastr.error('Error deleting the book.');
      }
    );
  }

  cancelDelete(): void {
    this.router.navigate(['/book', this.bookId]);
  }
}
