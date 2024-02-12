import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChef } from '../models/chef.model';

@Injectable({
  providedIn: 'root',
})
export class ChefService {
  private baseUrl: string = 'http://localhost:3000/chefs';

  constructor(private http: HttpClient) {}

  getAllChefs(): Observable<IChef[]> {
    return this.http.get<IChef[]>(this.baseUrl);
  }

  addChef(chefData: IChef): Observable<IChef> {
    return this.http.post<IChef>(this.baseUrl, chefData);
  }

  updateChef(id: string, chefData: IChef): Observable<IChef> {
    return this.http.put<IChef>(`${this.baseUrl}/${id}`, chefData);
  }

  deleteChef(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  setChefOfTheWeek(chefId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/set-chef-of-the-week/${chefId}`, {});
  }
}
