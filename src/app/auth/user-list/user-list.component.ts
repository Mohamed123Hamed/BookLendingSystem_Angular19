import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
 users: any[] = [];
  isAdminUser: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
    if (this.isAdminUser) {
      this.getUsers();
    }
  }

  getUsers(): void {
    this.authService.getUsers().subscribe(
      (res) => {
        if (res.succeeded) {
          this.users = res.data;
        } else {
          this.toastr.error('Failed to fetch users.');
        }
      },
      () => this.toastr.error('Error fetching users.')
    );
  }

  toggleAdmin(user: any): void {
    this.authService.toggleAdminRole(user.email).subscribe(
      (res) => {
        if (res.succeeded) {
          this.toastr.success(res.data);
          this.getUsers(); // refresh after change
        } else {
          this.toastr.error('Could not update user role.');
        }
      },
      () => this.toastr.error('Error updating user role.')
    );
  }
}
