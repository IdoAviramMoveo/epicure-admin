import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRestaurant } from '../models/restaurant.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseUrl: string = environment.baseUrl + '/restaurants';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllRestaurants(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(this.baseUrl);
  }

  getAllRestaurantsWithDishes(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(`${this.baseUrl}/with-dishes`);
  }

  addRestaurant(restaurantData: IRestaurant): Observable<IRestaurant> {
    return this.http.post<IRestaurant>(this.baseUrl, restaurantData, {
      headers: this.getHeaders(),
    });
  }

  updateRestaurant(
    id: string,
    restaurantData: IRestaurant
  ): Observable<IRestaurant> {
    return this.http.put<IRestaurant>(`${this.baseUrl}/${id}`, restaurantData, {
      headers: this.getHeaders(),
    });
  }

  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
