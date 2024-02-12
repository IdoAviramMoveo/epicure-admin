import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDish } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private baseUrl: string = 'http://localhost:3000/dishes';

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<IDish[]> {
    return this.http.get<IDish[]>(this.baseUrl);
  }

  addDish(dishData: IDish): Observable<IDish> {
    return this.http.post<IDish>(this.baseUrl, dishData);
  }

  updateDish(id: string, dishData: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${this.baseUrl}/${id}`, dishData);
  }

  deleteDish(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
