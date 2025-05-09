import { DeleteBookComponent } from './component/book/delete-book/delete-book.component';
import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
    {
        path: 'user-list',
        loadComponent: () =>
          import('./auth/user-list/user-list.component').then((m) => m.UserListComponent),
      },
    {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
      },
    {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register.component').then((m) => m.RegisterComponent),
      },
    {
        path: 'books',
        loadComponent: () =>
          import('./component/book/book-list/book-list.component').then((m) => m.BookListComponent),
      },
    {

        path: 'book/:id',
        loadComponent: () =>
          import('./component/book/book-details/book-details.component').then((m) => m.BookDetailsComponent),
      },
    {
        path: 'add-book',
        loadComponent: () =>
          import('./component/book/add-book/add-book.component').then((m) => m.AddBookComponent),
      },
    {
        path: 'edite-book/:id',
        loadComponent: () =>
          import('./component/book/update-book/update-book.component').then((m) => m.UpdateBookComponent),
      },
    {
        path: 'delete-book/:id',
        loadComponent: () =>
          import('./component/book/delete-book/delete-book.component').then((m) => m.DeleteBookComponent),
      },
    {
        path: '**',
        loadComponent: () =>
          import('./component/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },

];
