import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDish } from '../models/dish.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private baseUrl: string = environment.baseUrl + '/dishes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllDishes(): Observable<IDish[]> {
    return this.http.get<IDish[]>(this.baseUrl);
  }

  addDish(dishData: IDish): Observable<IDish> {
    return this.http.post<IDish>(this.baseUrl, dishData, {
      headers: this.getHeaders(),
    });
  }

  updateDish(id: string, dishData: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${this.baseUrl}/${id}`, dishData, {
      headers: this.getHeaders(),
    });
  }

  deleteDish(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
