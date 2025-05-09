import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl;


  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/Login`, credentials);
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/User/Register`, userData);
  }
  

  saveToken(data: string): void {
    localStorage.setItem('data', data);
  }
  


  logout(): void {
    localStorage.removeItem('data');
  }


  getDecodedToken() {
    const token = localStorage.getItem('data');
    if (!token) return null;
  
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
  
    return decoded;
  }
  

  isAdmin(): boolean {
    const decoded = this.getDecodedToken();
    if (decoded && decoded.IsAdmin) {
      return decoded.IsAdmin === 'True';
    }
    return false;
  }
  


  getToken(): string | null {
    return localStorage.getItem('data'); 
  }

  // getUserId(): string {
  //   const decodedToken = this.getDecodedToken();
  //   return decodedToken ? decodedToken.Id : '';
  // }
  getUserId(): string {
  const decodedToken = this.getDecodedToken();
  return decodedToken 
    ? decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] 
    : '';
}


  getUserRole(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.role : '';
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('data'); 
  }

  getCurrentUser(): any {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      return {
        userId: decodedToken.userId,
        username: decodedToken.username,
        email: decodedToken.email,
        role: decodedToken.role
      };
    }
    return null;
  }
  
}
