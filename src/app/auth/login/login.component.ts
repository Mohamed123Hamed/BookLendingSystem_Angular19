import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 
  loginForm!: FormGroup;
  loading: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService); 

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    const savedEmail = localStorage.getItem('email');
  const savedPassword = localStorage.getItem('password');

  if (savedEmail && savedPassword) {
    this.loginForm.patchValue({
      email: savedEmail,
      password: savedPassword
    });
  }
  }

  onSubmit(): void {
    this.loginForm.markAsTouched();
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.authService.saveToken(response.data);
            this.toastr.success('تم تسجيل الدخول بنجاح ✨');
            this.router.navigate(['/home']);
          } 
          else 
          {
          //  this.toastr.error(response.messages); // display one error
          this.toastr.error(response.messages.join('<br>'), 'خطأ', { enableHtml: true }); // dislay list of errors

          }
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error(error.error.message || 'حدث خطأ غير متوقع', 'خطأ');

          this.loading = false;
        }
      });
    }
  }
}
