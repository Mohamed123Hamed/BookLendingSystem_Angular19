import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';
import { NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UpdateBook } from '..';

@Component({
  selector: 'app-update-book',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent {
  bookForm!: FormGroup;
  bookId!: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private AuthService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });

    this.loadBookData();
  }

  loadBookData(): void {
    this.bookService.getBookById(this.bookId).subscribe(
      (book) => {
        if (book) {
  
        }
      },
      (error) => {
        this.toastr.error('Failed to load book data');
      }
    );
  }
  
  
  

  onSubmit(): void {
    if (this.bookForm.valid) {
      if (!this.AuthService.isAdmin()) {
        this.toastr.error('You are not authorized to update books.');
        return;
      }

      const updatedBook = { ...this.bookForm.value, id: this.bookId };

      this.bookService.updateBook(this.bookId, updatedBook).subscribe(
        (response) => {
          this.toastr.success('Book updated successfully!');
          this.router.navigate(['/books']); 
        },
        (error) => {
          this.toastr.error('Failed to update book!');
        }
      );
    }
  }
}
