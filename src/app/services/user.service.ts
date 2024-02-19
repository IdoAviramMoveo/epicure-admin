import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.baseUrl + '/admin/users';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
