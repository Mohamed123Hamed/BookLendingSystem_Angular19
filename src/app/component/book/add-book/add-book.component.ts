import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-book',
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private AuthService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSubmit() {
    
    if (this.bookForm.valid) {
      if (!this.AuthService.isAdmin()) {
        this.toastr.error("You are not authorized to add books.");
        return;
      }

      this.bookService.addBook(this.bookForm.value).subscribe(
        () => {
          this.toastr.success('Book added successfully!');
          this.router.navigate(['/books']);
        },
        (error) => {
          this.toastr.error('Failed to add book!');
        }
      );
    }
  }
}
