import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = `${environment.baseUrl}/admin/users`;

  constructor(private http: HttpClient) {}

  adminLogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  verifyToken(): Observable<boolean> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return of(false);
    }

    return this.http
      .get<any>(`${this.baseUrl}/verify-token`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map((response) => true),
        catchError(() => of(false))
      );
  }
}
