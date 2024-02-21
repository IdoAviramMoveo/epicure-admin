import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private adminUrl: string = environment.baseUrl + '/admin/users';
  private apiUrl: string = environment.baseUrl + '/api/users';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.adminUrl, {
      headers: this.getHeaders(),
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createAdmin(adminData: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.adminUrl}/create-admin`, adminData, {
      headers: this.getHeaders(),
    });
  }

  createUser(userData: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/create-user`, userData, {
      headers: this.getHeaders(),
    });
  }

  saveUser(user: IUser): Observable<IUser> {
    if (user.role === 'ADMIN') {
      return this.createAdmin(user);
    } else {
      return this.createUser(user);
    }
  }
}
