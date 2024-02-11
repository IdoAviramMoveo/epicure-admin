import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDish } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private baseUrl: string = 'http://localhost:3000/dishes';

  constructor(private http: HttpClient) {}
}
