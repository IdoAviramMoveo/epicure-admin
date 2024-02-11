import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRestaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseUrl: string = 'http://localhost:3000/restaurants';

  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(this.baseUrl);
  }

  getAllRestaurantsWithDishes(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(`${this.baseUrl}/with-dishes`);
  }

  addRestaurant(restaurantData: IRestaurant): Observable<IRestaurant> {
    return this.http.post<IRestaurant>(this.baseUrl, restaurantData);
  }

  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
