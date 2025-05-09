import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookList, UpdateBook } from '.';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly _httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/Book';
  
  constructor(private authService: AuthService) { }

  addBook(book: Book): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._httpClient.post(this.apiUrl, book, { headers });
  }



  updateBook(bookId: number, bookData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._httpClient.put<any>(`${this.apiUrl}/${bookId}`, bookData, { headers });
  }
  
  
  
  
  
  deleteBook(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this._httpClient.delete(`${this.apiUrl}/${id}`, { headers });
  }
  

  getBooks(): Observable<BookList[]> {  
    return this._httpClient.get<BookList[]>(this.apiUrl + '/GetAllBooks');
  }


  getBookById(id: any) {
    return this._httpClient.get(this.apiUrl + `/${id}`);
  }

  borrowBook(borrowData: { bookId: number, userId: string }): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/borrow`, borrowData);
  }

  returnBook(returnData: { bookId: number, userId: string }): Observable<any> {
  return this._httpClient.post(`${this.apiUrl}/return`, returnData);
}

  

  
  
  
}
